import Link from "next/link";
import {
  BookOpen,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Award,
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

interface StudentDashboardProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  // Mock data - in a real app, this would come from your database
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      teacher: "Mr. Johnson",
      grade: "B+",
      progress: 78,
      nextClass: "Tomorrow, 10:00 AM",
    },
    {
      id: 2,
      name: "English",
      teacher: "Mrs. Smith",
      grade: "A-",
      progress: 85,
      nextClass: "Today, 2:00 PM",
    },
    {
      id: 3,
      name: "Physics",
      teacher: "Dr. Brown",
      grade: "B",
      progress: 72,
      nextClass: "Wednesday, 11:30 AM",
    },
    {
      id: 4,
      name: "Chemistry",
      teacher: "Ms. Davis",
      grade: "A",
      progress: 90,
      nextClass: "Thursday, 9:00 AM",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Algebra Equations",
      subject: "Mathematics",
      dueDate: "Jun 25, 2023",
      status: "pending",
      progress: 0,
    },
    {
      id: 2,
      title: "Essay on Shakespeare",
      subject: "English",
      dueDate: "Jun 28, 2023",
      status: "in-progress",
      progress: 60,
    },
    {
      id: 3,
      title: "Lab Report: Acids and Bases",
      subject: "Chemistry",
      dueDate: "Jun 30, 2023",
      status: "completed",
      progress: 100,
    },
  ];

  const timetable = [
    {
      id: 1,
      subject: "Mathematics",
      time: "8:00 AM - 9:30 AM",
      teacher: "Mr. Johnson",
      room: "Room 101",
      day: "Monday",
    },
    {
      id: 2,
      subject: "English",
      time: "10:00 AM - 11:30 AM",
      teacher: "Mrs. Smith",
      room: "Room 203",
      day: "Monday",
    },
    {
      id: 3,
      subject: "Physics",
      time: "1:00 PM - 2:30 PM",
      teacher: "Dr. Brown",
      room: "Lab 3",
      day: "Monday",
    },
  ];

  const examSchedule = [
    {
      id: 1,
      subject: "Mathematics",
      date: "Jul 15, 2023",
      time: "9:00 AM - 11:00 AM",
      room: "Exam Hall 1",
    },
    {
      id: 2,
      subject: "English",
      date: "Jul 17, 2023",
      time: "9:00 AM - 11:00 AM",
      room: "Exam Hall 1",
    },
    {
      id: 3,
      subject: "Physics",
      date: "Jul 19, 2023",
      time: "9:00 AM - 11:00 AM",
      room: "Exam Hall 2",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name?.split(" ")[0] || "Student"}!
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your academic progress and upcoming tasks.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/subjects" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
              >
                View subjects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter((a) => a.status !== "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending completion</p>
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
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/grades" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
              >
                View grades
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Exams
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examSchedule.length}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/exams" className="w-full">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
              >
                View exam schedule
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subjects">My Subjects</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
        </TabsList>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => (
              <Card key={subject.id}>
                <CardHeader>
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription>{subject.teacher}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Current Grade:
                    </span>
                    <span className="font-medium">{subject.grade}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-muted-foreground">Next Class:</span>
                    <span>{subject.nextClass}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/dashboard/subjects/${subject.id}`}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
              <div className="col-span-5">Assignment</div>
              <div className="col-span-2">Subject</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-2">Progress</div>
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
                  <div className="col-span-2">{assignment.subject}</div>
                  <div className="col-span-2">{assignment.dueDate}</div>
                  <div className="col-span-2">
                    {assignment.progress}%
                    <Progress
                      value={assignment.progress}
                      className="h-1 mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    {assignment.status === "completed" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 hover:bg-green-50"
                      >
                        Completed
                      </Badge>
                    ) : assignment.status === "in-progress" ? (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                      >
                        In Progress
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 hover:bg-amber-50"
                      >
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/dashboard/assignments">
              <Button variant="outline">View All Assignments</Button>
            </Link>
          </div>
        </TabsContent>

        {/* Timetable Tab */}
        <TabsContent value="timetable" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
              <div className="col-span-3">Subject</div>
              <div className="col-span-3">Teacher</div>
              <div className="col-span-2">Time</div>
              <div className="col-span-2">Room</div>
              <div className="col-span-2">Day</div>
            </div>
            <div className="divide-y">
              {timetable.map((lesson) => (
                <div
                  key={lesson.id}
                  className="grid grid-cols-12 gap-2 p-4 text-sm"
                >
                  <div className="col-span-3 font-medium">{lesson.subject}</div>
                  <div className="col-span-3">{lesson.teacher}</div>
                  <div className="col-span-2">{lesson.time}</div>
                  <div className="col-span-2">{lesson.room}</div>
                  <div className="col-span-2">
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
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks due soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Algebra Equations</p>
                <p className="text-xs text-muted-foreground">
                  Mathematics • Due in 2 days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm font-medium">Essay on Shakespeare</p>
                <p className="text-xs text-muted-foreground">
                  English • Due in 5 days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">
                  Lab Report: Acids and Bases
                </p>
                <p className="text-xs text-muted-foreground">
                  Chemistry • Completed
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Assignments
            </Button>
          </CardFooter>
        </Card>

        {/* Exam Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {examSchedule.map((exam) => (
              <div key={exam.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{exam.subject}</p>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                  >
                    {exam.date}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{exam.time}</span>
                  <span>{exam.room}</span>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Exam Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
