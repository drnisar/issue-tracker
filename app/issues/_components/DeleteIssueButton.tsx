"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import delay from "delay";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const deleteIssue = async () => {
    try {
      await delay(2000);
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setErrorMessage("Unexpected Error Happened");
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" disabled={deleting}>
          Delete Issue{deleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue?</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex gap="2" mt="4">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" variant="soft" onClick={deleteIssue}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
