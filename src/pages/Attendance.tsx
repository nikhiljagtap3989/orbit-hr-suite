
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Attendance = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
          <Button>Download Report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="pointer-events-auto rounded-md border"
            />
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-semibold">
                {format(date, "EEEE, MMMM d, yyyy")}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Present: 42</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>Absent: 3</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span>Late: 5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={record.image} alt={record.name} />
                            <AvatarFallback>
                              {record.name.split(" ").map(name => name[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{record.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>{record.clockIn}</TableCell>
                      <TableCell>{record.clockOut || "—"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "Present"
                              ? "default"
                              : record.status === "Absent"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Working Days</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Absent</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Attendance %</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={record.image} alt={record.name} />
                          <AvatarFallback>
                            {record.name.split(" ").map(name => name[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{record.name}</div>
                          <div className="text-xs text-muted-foreground">{record.department}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{record.workingDays}</TableCell>
                    <TableCell>{record.present}</TableCell>
                    <TableCell>{record.absent}</TableCell>
                    <TableCell>{record.late}</TableCell>
                    <TableCell>
                      {record.attendancePercentage}%
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Sample data
const todayAttendance = [
  {
    id: "att001",
    name: "John Doe",
    department: "Engineering",
    clockIn: "09:02 AM",
    clockOut: "05:30 PM",
    status: "Present",
    image: "/placeholder.svg",
  },
  {
    id: "att002",
    name: "Jane Smith",
    department: "Design",
    clockIn: "08:55 AM",
    clockOut: "05:15 PM",
    status: "Present",
    image: "/placeholder.svg",
  },
  {
    id: "att003",
    name: "Robert Johnson",
    department: "Marketing",
    clockIn: "09:30 AM",
    clockOut: null,
    status: "Late",
    image: "/placeholder.svg",
  },
  {
    id: "att004",
    name: "Sarah Williams",
    department: "HR",
    clockIn: null,
    clockOut: null,
    status: "Absent",
    image: "/placeholder.svg",
  },
  {
    id: "att005",
    name: "Michael Brown",
    department: "Engineering",
    clockIn: "08:45 AM",
    clockOut: "05:00 PM",
    status: "Present",
    image: "/placeholder.svg",
  },
];

const monthlyAttendance = [
  {
    id: "emp001",
    name: "John Doe",
    department: "Engineering",
    workingDays: 22,
    present: 21,
    absent: 0,
    late: 1,
    attendancePercentage: 95,
    image: "/placeholder.svg",
  },
  {
    id: "emp002",
    name: "Jane Smith",
    department: "Design",
    workingDays: 22,
    present: 20,
    absent: 1,
    late: 1,
    attendancePercentage: 91,
    image: "/placeholder.svg",
  },
  {
    id: "emp003",
    name: "Robert Johnson",
    department: "Marketing",
    workingDays: 22,
    present: 18,
    absent: 2,
    late: 2,
    attendancePercentage: 82,
    image: "/placeholder.svg",
  },
  {
    id: "emp004",
    name: "Sarah Williams",
    department: "HR",
    workingDays: 22,
    present: 19,
    absent: 3,
    late: 0,
    attendancePercentage: 86,
    image: "/placeholder.svg",
  },
  {
    id: "emp005",
    name: "Michael Brown",
    department: "Engineering",
    workingDays: 22,
    present: 22,
    absent: 0,
    late: 0,
    attendancePercentage: 100,
    image: "/placeholder.svg",
  },
];

export default Attendance;
