"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { addStudent } from "@/lib/actions/student.actions";

type FormValues = z.infer<typeof StudentSchema>;

export default function NewStudentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      admissionNumber: "",
      form: "",
      gender: "",
      hostel: "",
      address: "",
      parentContact: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const result = await addStudent(data);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Student added successfully!");
      router.push("/dashboard/students");
      router.refresh();
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Student</h1>
        <p className="text-muted-foreground">
          Create a new student record in the system.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>
            Enter the student's personal and academic details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter student's address"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parentContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="+254 700 000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Academic Information</h3>

                  <FormField
                    control={form.control}
                    name="admissionNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admission Number</FormLabel>
                        <FormControl>
                          <Input placeholder="KBHS/2023/001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="form"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Form/Class</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select form" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Form 1">Form 1</SelectItem>
                            <SelectItem value="Form 2">Form 2</SelectItem>
                            <SelectItem value="Form 3">Form 3</SelectItem>
                            <SelectItem value="Form 4">Form 4</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hostel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hostel</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select hostel (optional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Boys Hostel A">
                              Boys Hostel A
                            </SelectItem>
                            <SelectItem value="Boys Hostel B">
                              Boys Hostel B
                            </SelectItem>
                            <SelectItem value="Girls Hostel A">
                              Girls Hostel A
                            </SelectItem>
                            <SelectItem value="Girls Hostel B">
                              Girls Hostel B
                            </SelectItem>
                            <SelectItem value="Day Scholar">
                              Day Scholar
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Leave empty for day scholars
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="student@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Will be used for login and communications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Minimum 6 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <CardFooter className="flex justify-between px-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Add Student"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
