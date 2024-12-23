import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issueDetails) notFound();
  return (
    <div>
      <h1>Issue Details</h1>
      <p>{issueDetails?.id}</p>
      <p>{issueDetails?.title}</p>
      <p>{issueDetails?.status}</p>
      <p>{issueDetails?.createdAt.toDateString()}</p>
      <p>{issueDetails?.description}</p>
    </div>
  );
};

export default IssueDetailsPage;
