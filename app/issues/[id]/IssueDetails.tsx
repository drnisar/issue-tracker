import { IssuesStatusBadge } from "@/app/components";
import { Heading, Flex, Box, Card, Text } from "@radix-ui/themes";
import MarkDown from "react-markdown";
import React from "react";
import { Issue } from "@prisma/client";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="2">
        <IssuesStatusBadge issueStatus={issue.status!} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Box className="mt-5">
        <Card className="prose max-w-full">
          <MarkDown>{issue.description}</MarkDown>
        </Card>
      </Box>
    </>
  );
};

export default IssueDetails;
