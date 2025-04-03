"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import Link from "next/link";

// Define the Student type based on your database model
export type Student = {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: string;
  form: string;
  hostel?: string;
  enrollmentDate: Date;
  createdAt: Date;
  user?: {
    id: string;
    email?: string;
    name?: string;
  };
};

export const studentColumns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "admissionNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Admission No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("admissionNumber")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // Combine firstName and lastName for display
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      const fullName = `${firstName} ${lastName}`;

      return <div className="font-medium">{fullName}</div>;
    },
  },
  {
    accessorKey: "form",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Form/Class
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="font-medium">
        {row.getValue("form")}
      </Badge>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender") || "—"}</div>,
  },
  {
    accessorKey: "hostel",
    header: "Hostel",
    cell: ({ row }) => <div>{row.getValue("hostel") || "—"}</div>,
  },
  {
    accessorKey: "enrollmentDate",
    header: "Enrollment Date",
    cell: ({ row }) => {
      const date = row.getValue("enrollmentDate") as Date;
      // Format the date if it exists
      return date ? (
        <div>{format(new Date(date), "MMM d, yyyy")}</div>
      ) : (
        <div>—</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.user?.email || "—"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/students/${student.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                <span>View Details</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/students/${student.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => {
                // Handle delete action
                // You can implement a confirmation dialog here
                console.log(`Delete student ${student.id}`);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
