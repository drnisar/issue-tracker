import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueEditButton from "./IssueEditButton";
import IssueDetails from "./IssueDetails";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issueDetails) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="2">
      <Box>
        <IssueDetails issue={issueDetails} />
      </Box>
      <Box>
        <IssueEditButton issueId={issueDetails.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
