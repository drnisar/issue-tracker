import IssuesStatusBadge from "@/app/components/IssuesStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import MarkDown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const issueDetails = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issueDetails) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="2">
      <Box>
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
      </Box>
      <Box>
        <Button>
          <Pencil2Icon /> Edit Record
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
