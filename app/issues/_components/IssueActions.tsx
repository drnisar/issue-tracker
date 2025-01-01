import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusSelect from "./StatusSelect";

const IssueActions = () => {
  return (
    <Flex mb="2" justify="between">
      <StatusSelect />
      <Button>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
