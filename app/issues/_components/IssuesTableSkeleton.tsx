import { Table } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const issues = [1, 2, 3, 4, 5];

const IssuesTableSkeleton = () => {
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
        {issues.map((issue) => (
          <Table.Row key={issue}>
            <Table.Cell>
              <Skeleton width={200} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton width={100} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton width={100} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTableSkeleton;
