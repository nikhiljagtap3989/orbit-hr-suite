
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUp, Users, Calendar, Clock, Briefcase } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline">Export</Button>
          <Button>Add Employee</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">347</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" />
                12%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Hires</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" />
                8%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              2.3% of workforce
            </p>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.3%</div>
            <Progress value={97.3} className="h-2 mt-1" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest HR activities across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className={`p-2 rounded-full ${activity.iconBg}`}>
                    <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled events and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="rounded border p-2 text-center w-12">
                    <div className="text-xs font-medium">{event.day}</div>
                    <div className="text-lg font-bold">{event.date}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Progress</CardTitle>
            <CardDescription>Status of new employees onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onboardingEmployees.map((employee, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-sm">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {employee.position}
                      </div>
                    </div>
                    <div className="text-xs font-medium">{employee.progress}%</div>
                  </div>
                  <Progress value={employee.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Pending approval requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{request.name}</p>
                    <p className="text-xs text-muted-foreground">{request.date}</p>
                    <p className="text-xs">{request.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Deny</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Sample data
const recentActivities = [
  {
    title: "New employee added",
    description: "Jane Smith was added to the Engineering department",
    time: "2h ago",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Leave approved",
    description: "Michael Johnson's vacation request was approved",
    time: "5h ago",
    icon: Calendar,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Onboarding completed",
    description: "Sarah Williams completed all onboarding tasks",
    time: "1d ago",
    icon: Briefcase,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const upcomingEvents = [
  {
    day: "MON",
    date: "15",
    title: "Team Meeting",
    time: "10:00 AM - 11:30 AM",
  },
  {
    day: "WED",
    date: "17",
    title: "Performance Reviews",
    time: "All Day",
  },
  {
    day: "FRI",
    date: "19",
    title: "New Hire Orientation",
    time: "9:00 AM - 12:00 PM",
  },
];

const onboardingEmployees = [
  {
    name: "Emma Thompson",
    position: "UI/UX Designer",
    progress: 75,
  },
  {
    name: "Robert Garcia",
    position: "Software Developer",
    progress: 45,
  },
  {
    name: "Lisa Wang",
    position: "Marketing Specialist",
    progress: 90,
  },
];

const leaveRequests = [
  {
    name: "Alex Johnson",
    date: "May 20 - May 25, 2023",
    type: "Vacation",
  },
  {
    name: "Maria Rodriguez",
    date: "May 18, 2023",
    type: "Sick Leave",
  },
  {
    name: "David Kim",
    date: "May 22 - May 23, 2023",
    type: "Personal Leave",
  },
];

export default Dashboard;
