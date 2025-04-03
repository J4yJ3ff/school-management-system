import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getStudents } from "@/lib/actions/student.actions";
import { StudentDataTable } from "@/components/student-data-table";
import { studentColumns } from "@/components/student-columns";

export default async function StudentsPage() {
  // Fetch students on the server
  const result = await getStudents();

  // Handle potential errors during data fetching
  if (result.error) {
    return (
      <p className="text-red-500">Error loading students: {result.error}</p>
    );
  }

  const students = result.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <Link href="/dashboard/students/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Student
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            View, add, edit, and manage student records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render the DataTable */}
          <StudentDataTable columns={studentColumns} data={students} />
        </CardContent>
      </Card>
    </div>
  );
}
