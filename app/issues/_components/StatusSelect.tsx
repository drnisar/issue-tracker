"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: Status | string }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "CLOSED" },
];

const StatusSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={(value) => {
        const query = value === "ALL" ? "" : "?status=" + value;
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Status" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value || ""}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
