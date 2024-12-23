import IssuesStatusBadge from "@/app/components/IssuesStatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import MarkDown from "react-markdown";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issueDetails) notFound();
  return (
    <div>
      <Heading>{issueDetails?.title}</Heading>
      <Flex gap="2">
        <IssuesStatusBadge status={issueDetails.status} />
        <Text className="ml-5">{issueDetails?.createdAt.toDateString()}</Text>
      </Flex>
      <Box className="mt-5">
        <Card className="prose">
          <MarkDown>{issueDetails.description}</MarkDown>
        </Card>
      </Box>
    </div>
  );
};

export default IssueDetailsPage;
