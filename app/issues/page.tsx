import { Issue, Status } from "@prisma/client";
import { Suspense } from "react";
import IssueActions from "./_components/IssueActions";
import IssuesTable from "./_components/IssuesTable";
import IssuesTableSkeleton from "./_components/IssuesTableSkeleton";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue };
}) => {
  const { status } = await searchParams;
  console.log(status);
  return (
    <>
      <IssueActions />
      <Suspense fallback={<IssuesTableSkeleton />}>
        <IssuesTable searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default IssuesPage;
