import Link from "next/link";
import {
  Users,
  BookOpen,
  FileText,
  Calendar,
  ArrowRight,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeacherDashboardProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export default function TeacherDashboard({ user }: TeacherDashboardProps) {
  // Mock data - in a real app, this would come from your database
  const classes = [
    {
      id: 1,
      name: "Form 3A",
      subject: "Mathematics",
      students: 42,
      time: "8:00 AM - 9:30 AM",
      day: "Monday",
      attendance: 92,
    },
    {
      id: 2,
      name: "Form 2B",
      subject: "Mathematics",
      students: 38,
      time: "10:00 AM - 11:30 AM",
      day: "Monday",
      attendance: 88,
    },
    {
      id: 3,
      name: "Form 4A",
      subject: "Mathematics",
      students: 35,
      time: "1:00 PM - 2:30 PM",
      day: "Tuesday",
      attendance: 95,
    },
    {
      id: 4,
      name: "Form 1C",
      subject: "Mathematics",
      students: 40,
      time: "9:00 AM - 10:30 AM",
      day: "Wednesday",
      attendance: 90,
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Algebra Equations",
      class: "Form 3A",
      dueDate: "Jun 25, 2023",
      status: "active",
      submissions: 28,
      totalStudents: 42,
    },
    {
      id: 2,
      title: "Geometry Problems",
      class: "Form 2B",
      dueDate: "Jun 28, 2023",
      status: "active",
      submissions: 15,
      totalStudents: 38,
    },
    {
      id: 3,
      title: "Calculus Basics",
      class: "Form 4A",
      dueDate: "Jun 30, 2023",
      status: "active",
      submissions: 5,
      totalStudents: 35,
    },
  ];

  const upcomingLessons = [
    {
      id: 1,
      class: "Form 3A",
      subject: "Mathematics",
      topic: "Quadratic Equations",
      time: "8:00 AM - 9:30 AM",
      day: "Tomorrow",
    },
    {
      id: 2,
      class: "Form 2B",
      subject: "Mathematics",
      topic: "Geometry: Circles",
      time: "10:00 AM - 11:30 AM",
      day: "Tomorrow",
    },
    {
      id: 3,
      class: "Form 4A",
      subject: "Mathematics",
      topic: "Calculus: Derivatives",
      time: "1:00 PM - 2:30 PM",
      day: "Day after tomorrow",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name?.split(" ")[0] || "Teacher"}!
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your classes and assignments.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">
              {classes.reduce((acc, cls) => acc + cls.students, 0)} students
              total
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/classes" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
              >
                View classes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Assignments
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">
              {assignments.reduce(
                (acc, assignment) => acc + assignment.submissions,
                0
              )}{" "}
              submissions received
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/assignments" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
              >
                View assignments
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                classes.reduce((acc, cls) => acc + cls.attendance, 0) /
                  classes.length
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/attendance" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
              >
                View attendance
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Lessons
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingLessons.length}</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/timetable" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
              >
                View timetable
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="classes">My Classes</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="timetable">Upcoming Lessons</TabsTrigger>
        </TabsList>

        {/* Classes Tab */}
        <TabsContent value="classes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => (
              <Card key={cls.id}>
                <CardHeader>
                  <CardTitle>{cls.name}</CardTitle>
                  <CardDescription>{cls.subject}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Students:</span>
                    <span>{cls.students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span>
                      {cls.day}, {cls.time}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attendance:</span>
                      <span>{cls.attendance}%</span>
                    </div>
                    <Progress value={cls.attendance} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/dashboard/classes/${cls.id}`}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      View Class
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/dashboard/classes">
              <Button variant="outline">View All Classes</Button>
            </Link>
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
              <div className="col-span-5">Assignment</div>
              <div className="col-span-2">Class</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-2">Submissions</div>
              <div className="col-span-1">Status</div>
            </div>
            <div className="divide-y">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="grid grid-cols-12 gap-2 p-4 text-sm"
                >
                  <div className="col-span-5 font-medium">
                    {assignment.title}
                  </div>
                  <div className="col-span-2">{assignment.class}</div>
                  <div className="col-span-2">{assignment.dueDate}</div>
                  <div className="col-span-2">
                    {assignment.submissions}/{assignment.totalStudents}
                    <Progress
                      value={
                        (assignment.submissions / assignment.totalStudents) *
                        100
                      }
                      className="h-1 mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 hover:bg-green-50"
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <Link href="/dashboard/assignments/new">
              <Button>Create Assignment</Button>
            </Link>
            <Link href="/dashboard/assignments">
              <Button variant="outline">View All Assignments</Button>
            </Link>
          </div>
        </TabsContent>

        {/* Timetable Tab */}
        <TabsContent value="timetable" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
              <div className="col-span-3">Class</div>
              <div className="col-span-3">Subject</div>
              <div className="col-span-3">Topic</div>
              <div className="col-span-2">Time</div>
              <div className="col-span-1">Day</div>
            </div>
            <div className="divide-y">
              {upcomingLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="grid grid-cols-12 gap-2 p-4 text-sm"
                >
                  <div className="col-span-3 font-medium">{lesson.class}</div>
                  <div className="col-span-3">{lesson.subject}</div>
                  <div className="col-span-3">{lesson.topic}</div>
                  <div className="col-span-2">{lesson.time}</div>
                  <div className="col-span-1">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                    >
                      {lesson.day}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/dashboard/timetable">
              <Button variant="outline">View Full Timetable</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* To-Do List */}
        <Card>
          <CardHeader>
            <CardTitle>To-Do List</CardTitle>
            <CardDescription>Tasks for this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">
                  Prepare Form 3A test papers
                </p>
                <p className="text-xs text-muted-foreground">
                  Completed yesterday
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm font-medium">Grade Form 4A assignments</p>
                <p className="text-xs text-muted-foreground">Due today</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">
                  Submit end of term reports
                </p>
                <p className="text-xs text-muted-foreground">Due in 2 days</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm font-medium">
                  Prepare lesson plans for next week
                </p>
                <p className="text-xs text-muted-foreground">Due in 3 days</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Manage Tasks
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Created new assignment</p>
              <p className="text-xs text-muted-foreground">
                You created "Geometry Problems" for Form 2B
              </p>
              <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Marked attendance</p>
              <p className="text-xs text-muted-foreground">
                You marked attendance for Form 3A
              </p>
              <p className="text-xs text-muted-foreground">Today, 9:15 AM</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Graded assignments</p>
              <p className="text-xs text-muted-foreground">
                You graded 15 assignments for Form 4A
              </p>
              <p className="text-xs text-muted-foreground">
                Yesterday, 4:45 PM
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
