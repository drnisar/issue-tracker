import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "green" | "violet" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssuesStatusBadge = ({ issueStatus }: { issueStatus: Status }) => {
  return (
    <Badge color={statusMap[issueStatus].color}>
      {statusMap[issueStatus].label}
    </Badge>
  );
};

export default IssuesStatusBadge;
