"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { IssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueFormType {
  title: string;
  description: string;
}
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(IssueSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: IssueFormType) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setErrorMessage("Unexpected Error Happened");
    }
  };
  return (
    <div className="max-w-xl ">
      {errorMessage && (
        <Callout.Root>
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          size="2"
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={submitting} type="submit">
          {issue ? "Update Issue" : "Create New Issue"}
          {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
