"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import axios from "axios";
import {
  useForm,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
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
        <TextField.Root size="2" placeholder="Title" {...register("title")} />

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
