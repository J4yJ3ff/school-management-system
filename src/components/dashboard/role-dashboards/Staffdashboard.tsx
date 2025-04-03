import Link from "next/link";
import {
  Users,
  Building2,
  DollarSign,
  ClipboardList,
  Bell,
  BarChart3,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
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
import { Badge } from "@/components/ui/badge";

interface StaffDashboardProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export default function StaffDashboard({ user }: StaffDashboardProps) {
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
      title: "Fee Collection",
      value: "₹ 12.4L",
      change: "+8.5%",
      trend: "up",
      icon: DollarSign,
      link: "/dashboard/finance/fees",
    },
    {
      title: "Hostel Occupancy",
      value: "87%",
      change: "+2.3%",
      trend: "up",
      icon: Building2,
      link: "/dashboard/hostel",
    },
    {
      title: "Pending Tasks",
      value: "12",
      change: "-3",
      trend: "down",
      icon: ClipboardList,
      link: "/dashboard/tasks",
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
      title: "Hostel maintenance request",
      description: "New maintenance request for Boys Hostel Block B",
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
      title: "Fee Collection",
      icon: DollarSign,
      link: "/dashboard/finance/fees",
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Hostel Management",
      icon: Building2,
      link: "/dashboard/hostel",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "View Reports",
      icon: BarChart3,
      link: "/dashboard/reports",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: "Process new student admissions",
      priority: "high",
      dueDate: "Today",
    },
    {
      id: 2,
      title: "Update fee payment records",
      priority: "medium",
      dueDate: "Tomorrow",
    },
    {
      id: 3,
      title: "Prepare monthly attendance report",
      priority: "medium",
      dueDate: "In 2 days",
    },
    {
      id: 4,
      title: "Hostel room allocation for new students",
      priority: "high",
      dueDate: "Today",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name?.split(" ")[0] || "Staff"}!
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
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {task.priority === "high" ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="text-sm font-medium">{task.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      task.priority === "high"
                        ? "bg-red-50 text-red-700 hover:bg-red-50"
                        : "bg-amber-50 text-amber-700 hover:bg-amber-50"
                    }
                  >
                    {task.dueDate}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/tasks" className="w-full">
              <Button variant="outline" className="w-full">
                View All Tasks
              </Button>
            </Link>
          </CardFooter>
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
        {/* Recent notifications */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-1">
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                You have {recentNotifications.length} new notifications
              </CardDescription>
            </div>
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
          <CardFooter>
            <Link href="/dashboard/notifications" className="w-full">
              <Button variant="outline" className="w-full">
                View All Notifications
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Hostel Occupancy */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Hostel Occupancy</CardTitle>
            <CardDescription>Current status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Boys Hostel A</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Boys Hostel B</span>
                <span>82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Girls Hostel A</span>
                <span>90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Girls Hostel B</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/hostel" className="w-full">
              <Button variant="outline" className="w-full">
                Manage Hostels
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Recent admissions */}
        <Card className="lg:col-span-1">
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
      </div>
    </div>
  );
}
