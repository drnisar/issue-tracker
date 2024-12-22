"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";
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

  const onSubmit = async (data: IssueForm) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };
  return (
    <>
      <form className="max-w-xl space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root size="2" placeholder="Title" {...register("title")} />

        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />

        <Button>Submit New Issue</Button>
      </form>
    </>
  );
};

export default NewIssuePage;