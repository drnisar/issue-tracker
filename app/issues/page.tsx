import prisma from "@/prisma/client";
import { Button, Table, Text } from "@radix-ui/themes";
import React from "react";
import { Link, IssuesStatusBadge } from "@/app/components";
import delay from "delay";
import IssueActions from "./_components/IssueActions";

const IssuesPage = async () => {
  await delay(2000);
  const issues = await prisma.issue.findMany();
  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <Text as="p" className="block md:hidden">
                  {" "}
                  <IssuesStatusBadge status={issue.status} />
                </Text>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssuesStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
