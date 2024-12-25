import prisma from "@/prisma/client";
import { Box, Container, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueEditButton from "./IssueEditButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "../_components/DeleteIssueButton";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issueDetails) notFound();
  return (
    <Container>
      <Grid columns={{ initial: "1", sm: "5" }} gap="4">
        <Box className="md:col-span-4">
          <IssueDetails issue={issueDetails} />
        </Box>
        <Box>
          <Flex direction="column" gap="2">
            <IssueEditButton issueId={issueDetails.id} />
            <DeleteIssueButton issueId={issueDetails.id} />
          </Flex>
        </Box>
      </Grid>
    </Container>
  );
};

export default IssueDetailsPage;