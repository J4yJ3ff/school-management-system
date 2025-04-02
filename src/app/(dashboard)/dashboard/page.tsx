// src/app/(dashboard)/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"; // Create this
import DashboardHeader from "@/components/dashboard/DashboardHeader"; // Create this

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    // This should technically be handled by middleware, but double-check
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <DashboardSidebar user={session.user} /> {/* Pass user data */}
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <DashboardHeader user={session.user} /> {/* Pass user data */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

// src/app/(dashboard)/dashboard/page.tsx
import { auth } from "@/lib/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import AdminDashboard from "@/components/dashboard/role-dashboards/AdminDashboard"; // Create specific dashboards
import TeacherDashboard from "@/components/dashboard/role-dashboards/TeacherDashboard";
import StudentDashboard from "@/components/dashboard/role-dashboards/StudentDashboard";
import StaffDashboard from "@/components/dashboard/role-dashboards/StaffDashboard";

export default async function DashboardPage() {
  const session = await auth();

  // Should always have a session here due to layout/middleware
  if (!session?.user) return <p>Loading or Unauthorized...</p>;

  const user = session.user;

  const renderDashboard = () => {
    switch (user.role) {
      case UserRole.ADMIN:
        return <AdminDashboard user={user} />;
      case UserRole.TEACHER:
        return <TeacherDashboard user={user} />;
      case UserRole.STUDENT:
        return <StudentDashboard user={user} />;
      case UserRole.STAFF:
        return <StaffDashboard user={user} />;
      // case UserRole.PARENT:
      //   return <ParentDashboard user={user} />;
      default:
        return <p>Your dashboard is under construction.</p>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.name || "User"}!</CardTitle>
          <CardDescription>Your role: {user.role}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render role-specific dashboard content */}
          {renderDashboard()}
        </CardContent>
      </Card>

      {/* Add more generic dashboard widgets or stats here */}
    </div>
  );
}
