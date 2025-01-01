import { IssuesStatusBadge } from "@/app/components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { Flex, Table, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import IssuesTableSkeleton from "./IssuesTableSkeleton";
import prisma from "@/prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const IssuesTable = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue };
}) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden sm:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden sm:table-cell" },
  ];

  const { status } = await searchParams;
  const statuses = Object.values(Status);
  const issueStatus = statuses.includes(status) ? status : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: issueStatus,
    },
    orderBy: orderBy,
  });
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Flex gap="1">
                <NextLink
                  href={{
                    query: { status, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon />}
              </Flex>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues?.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <Text as="p" className="block sm:hidden">
                {" "}
                <IssuesStatusBadge issueStatus={issue.status!} />
              </Text>
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              <IssuesStatusBadge issueStatus={issue.status!} />
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              {new Date(issue.createdAt).toLocaleDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
