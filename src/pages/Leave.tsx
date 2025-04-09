
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Plus, Calendar as CalendarIcon, MoreVertical, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";

const Leave = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const form = useForm({
    defaultValues: {
      leaveType: "",
      startDate: undefined,
      endDate: undefined,
      reason: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Request Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Leave Request</DialogTitle>
              <DialogDescription>
                Fill in the details below to submit your leave request.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="leaveType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="sick">Sick Leave</SelectItem>
                          <SelectItem value="personal">Personal Leave</SelectItem>
                          <SelectItem value="maternity">Maternity Leave</SelectItem>
                          <SelectItem value="paternity">Paternity Leave</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide a reason for your leave request"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This will be visible to the HR department and your manager.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Leave Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveBalance.map((leave, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{leave.type}</p>
                    <p className="text-sm text-muted-foreground">
                      Balance: {leave.balance} days
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Used: {leave.used} days
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total: {leave.total} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Team Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="pointer-events-auto rounded-md border"
            />
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                {date ? format(date, "MMMM d, yyyy") : "Select a date"}
              </h3>
              <div className="space-y-2">
                {teammatesOnLeave
                  .filter(
                    (item) =>
                      date &&
                      new Date(item.startDate) <= date &&
                      new Date(item.endDate) >= date
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-muted/50 rounded-md"
                    >
                      <Avatar>
                        <AvatarImage src={item.image} alt={item.name} />
                        <AvatarFallback>
                          {item.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.leaveType} ({format(new Date(item.startDate), "MMM d")} -{" "}
                          {format(new Date(item.endDate), "MMM d, yyyy")})
                        </p>
                      </div>
                    </div>
                  ))}
                {date &&
                  teammatesOnLeave.filter(
                    (item) =>
                      new Date(item.startDate) <= date &&
                      new Date(item.endDate) >= date
                  ).length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No team members on leave for this date
                    </p>
                  )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-requests" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="team-leaves">Team Leaves</TabsTrigger>
          <TabsTrigger value="pending-approval">Pending Approval (2)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-requests" className="space-y-4">
          {myLeaveRequests.map((request, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          request.status === "Approved"
                            ? "default"
                            : request.status === "Rejected"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {request.status}
                      </Badge>
                      <h3 className="font-medium">{request.leaveType}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(request.startDate), "MMM d")} - {format(new Date(request.endDate), "MMM d, yyyy")}
                      {" "}({request.duration} days)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {request.status === "Pending" && (
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        {request.status === "Pending" && (
                          <DropdownMenuItem className="text-red-600">
                            Cancel Request
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-sm mt-3">{request.reason}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="team-leaves">
          <Card>
            <CardHeader>
              <CardTitle>Team Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View all leave requests from your team members.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending-approval">
          {pendingApprovals.map((request, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start md:items-center gap-4">
                    <Avatar>
                      <AvatarImage src={request.image} alt={request.name} />
                      <AvatarFallback>
                        {request.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {request.leaveType} ({format(new Date(request.startDate), "MMM d")} -{" "}
                        {format(new Date(request.endDate), "MMM d, yyyy")})
                      </p>
                      <p className="text-sm mt-1">{request.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:ml-auto">
                    <Button variant="outline" size="sm" className="gap-2">
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Sample data
const leaveBalance = [
  { type: "Annual Leave", balance: 15, used: 5, total: 20 },
  { type: "Sick Leave", balance: 8, used: 2, total: 10 },
  { type: "Personal Leave", balance: 3, used: 0, total: 3 },
];

const myLeaveRequests = [
  {
    id: "leave001",
    leaveType: "Vacation",
    startDate: "2023-06-15",
    endDate: "2023-06-22",
    duration: 5,
    reason: "Annual family vacation",
    status: "Approved",
  },
  {
    id: "leave002",
    leaveType: "Sick Leave",
    startDate: "2023-05-10",
    endDate: "2023-05-11",
    duration: 2,
    reason: "Doctor's appointment and recovery",
    status: "Approved",
  },
  {
    id: "leave003",
    leaveType: "Personal Leave",
    startDate: "2023-07-05",
    endDate: "2023-07-05",
    duration: 1,
    reason: "Attending a conference",
    status: "Pending",
  },
];

const teammatesOnLeave = [
  {
    name: "David Kim",
    image: "/placeholder.svg",
    leaveType: "Vacation",
    startDate: "2023-06-10",
    endDate: "2023-06-17",
  },
  {
    name: "Maria Rodriguez",
    image: "/placeholder.svg",
    leaveType: "Personal Leave",
    startDate: "2023-06-15",
    endDate: "2023-06-15",
  },
  {
    name: "Alex Johnson",
    image: "/placeholder.svg",
    leaveType: "Sick Leave",
    startDate: "2023-06-13",
    endDate: "2023-06-14",
  },
];

const pendingApprovals = [
  {
    name: "Lisa Wang",
    image: "/placeholder.svg",
    leaveType: "Vacation",
    startDate: "2023-07-01",
    endDate: "2023-07-10",
    reason: "Summer vacation with family",
  },
  {
    name: "Robert Garcia",
    image: "/placeholder.svg",
    leaveType: "Personal Leave",
    startDate: "2023-06-28",
    endDate: "2023-06-28",
    reason: "Attending a technical conference",
  },
];

export default Leave;
