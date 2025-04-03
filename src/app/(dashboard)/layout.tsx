import type React from "react";
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
