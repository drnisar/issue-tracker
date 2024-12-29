"use client";
import { IssuesStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";
import IssuesTableSkeleton from "./IssuesTableSkeleton";

const IssuesTable = () => {
  const {
    data: issues,
    isLoading,
    error,
  } = useQuery<Issue[]>({
    queryKey: ["issues"],
    queryFn: async () => await axios.get("/api/issues").then((res) => res.data),
  });
  if (isLoading) return <IssuesTableSkeleton />;
  if (error) return <div>Error: {error.message}</div>;
  return (
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
        {issues?.map((issue) => (
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
              {new Date(issue.createdAt).toLocaleDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
