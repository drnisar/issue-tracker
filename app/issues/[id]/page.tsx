import IssuesStatusBadge from "@/app/components/IssuesStatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issueDetails) notFound();
  return (
    <div>
      <Heading>{issueDetails?.title}</Heading>
      <IssuesStatusBadge status={issueDetails.status} />
      <Text className="ml-5">{issueDetails?.createdAt.toDateString()}</Text>
      <Box className="mt-5">
        <Card>
          <Text>{issueDetails.description}</Text>
        </Card>
      </Box>
    </div>
  );
};

export default IssueDetailsPage;
