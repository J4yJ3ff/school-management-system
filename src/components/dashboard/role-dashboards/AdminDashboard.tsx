import Link from "next/link";
import {
  Users,
  GraduationCap,
  DollarSign,
  BookOpen,
  Bell,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AdminDashboardProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  // Mock data - in a real app, this would come from your database
  const stats = [
    {
      title: "Total Students",
      value: "1,245",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      link: "/dashboard/students",
    },
    {
      title: "Total Teachers",
      value: "64",
      change: "+2.1%",
      trend: "up",
      icon: GraduationCap,
      link: "/dashboard/teachers",
    },
    {
      title: "Fee Collection",
      value: "₹ 12.4L",
      change: "+8.5%",
      trend: "up",
      icon: DollarSign,
      link: "/dashboard/finance/fees",
    },
    {
      title: "Attendance Rate",
      value: "94%",
      change: "-1.2%",
      trend: "down",
      icon: BookOpen,
      link: "/dashboard/attendance",
    },
  ];

  const recentNotifications = [
    {
      id: 1,
      title: "New student registration",
      description: "3 new students registered today",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "Fee payment reminder",
      description: "Send fee payment reminders to 25 students",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Staff meeting",
      description: "Staff meeting scheduled for tomorrow at 10:00 AM",
      time: "2 hours ago",
    },
  ];

  const quickActions = [
    {
      title: "Add New Student",
      icon: Users,
      link: "/dashboard/students/new",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Add New Teacher",
      icon: GraduationCap,
      link: "/dashboard/teachers/new",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Fee Collection",
      icon: DollarSign,
      link: "/dashboard/finance/fees",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "View Reports",
      icon: BarChart3,
      link: "/dashboard/reports",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name?.split(" ")[0] || "Admin"}!
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your school today.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center pt-1 text-xs">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-2">
              <Link href={stat.link} className="w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between"
                >
                  View details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Middle section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.link}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-dashed"
                >
                  <div className={`rounded-full p-1 ${action.color}`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span>{action.title}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent notifications */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                You have {recentNotifications.length} new notifications
              </CardDescription>
            </div>
            <Link href="/dashboard/notifications" className="ml-auto">
              <Button variant="ghost" size="sm" className="gap-1">
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Fee collection progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fee Collection</CardTitle>
            <CardDescription>Current academic year</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Term 1</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Term 2</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Term 3</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="pt-4">
              <Link href="/dashboard/finance/fees">
                <Button className="w-full">Manage Fee Collection</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <div className="flex flex-col items-center justify-center text-xs font-semibold">
                  <span>24</span>
                  <span>JUN</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Staff Meeting</p>
                <p className="text-xs text-muted-foreground">
                  10:00 AM - 11:30 AM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <div className="flex flex-col items-center justify-center text-xs font-semibold">
                  <span>26</span>
                  <span>JUN</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Parent-Teacher Meeting</p>
                <p className="text-xs text-muted-foreground">
                  2:00 PM - 5:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <div className="flex flex-col items-center justify-center text-xs font-semibold">
                  <span>28</span>
                  <span>JUN</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">School Assembly</p>
                <p className="text-xs text-muted-foreground">
                  8:30 AM - 9:30 AM
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/calendar" className="w-full">
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Recent admissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Admissions</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  Form 1 • Admitted today
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div>
                <p className="text-sm font-medium">Jane Smith</p>
                <p className="text-xs text-muted-foreground">
                  Form 2 • Admitted yesterday
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div>
                <p className="text-sm font-medium">Michael Johnson</p>
                <p className="text-xs text-muted-foreground">
                  Form 3 • Admitted 3 days ago
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/students" className="w-full">
              <Button variant="outline" className="w-full">
                View All Students
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* System status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>School management system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <span className="flex items-center text-xs font-medium text-green-600">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-600"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API</span>
              <span className="flex items-center text-xs font-medium text-green-600">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-600"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage</span>
              <span className="flex items-center text-xs font-medium text-green-600">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-600"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last backup</span>
              <span className="text-xs text-muted-foreground">
                Today, 03:00 AM
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">System version</span>
              <span className="text-xs text-muted-foreground">v1.2.4</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/settings" className="w-full">
              <Button variant="outline" className="w-full">
                System Settings
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
