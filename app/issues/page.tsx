import { IssuesStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table, Text } from "@radix-ui/themes";
import { Suspense } from "react";
import IssueActions from "./_components/IssueActions";
import IssuesTableSkeleton from "./_components/IssuesTableSkeleton";
import IssuesTable from "./_components/IssuesTable";

const IssuesPage = async () => {
  return (
    <>
      <IssueActions />
      <Suspense fallback={<IssuesTableSkeleton />}>
        <IssuesTable />
      </Suspense>
    </>
  );
};

export default IssuesPage;
