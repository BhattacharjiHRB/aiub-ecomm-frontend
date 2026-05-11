"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { FilePenIcon } from "lucide-react";
import Status from "../shared/status";
import { Button } from "../ui/button";

export type Activity = {
  id: string;
  name: string;
  price: number;
  duration: string;
  availability: string;
  actions: string;
};

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: "Activity Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => {
      const status = row.original;

      return (
        <div>
          <Status status={status.availability} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const eventName = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <FilePenIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
