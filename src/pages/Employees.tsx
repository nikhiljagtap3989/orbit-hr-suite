
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash,
  ArrowUpDown
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample employee data
const employeeData = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@orbithr.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "Jan 15, 2022",
    image: "/placeholder.svg",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@orbithr.com",
    department: "Design",
    position: "UI/UX Designer",
    status: "Active",
    joinDate: "Mar 01, 2022",
    image: "/placeholder.svg",
  },
  {
    id: "EMP003",
    name: "Robert Johnson",
    email: "robert.johnson@orbithr.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "Active",
    joinDate: "Feb 12, 2021",
    image: "/placeholder.svg",
  },
  {
    id: "EMP004",
    name: "Sarah Williams",
    email: "sarah.williams@orbithr.com",
    department: "HR",
    position: "HR Specialist",
    status: "On Leave",
    joinDate: "Nov 05, 2021",
    image: "/placeholder.svg",
  },
  {
    id: "EMP005",
    name: "Michael Brown",
    email: "michael.brown@orbithr.com",
    department: "Engineering",
    position: "Frontend Developer",
    status: "Active",
    joinDate: "Aug 18, 2022",
    image: "/placeholder.svg",
  },
  {
    id: "EMP006",
    name: "Emily Davis",
    email: "emily.davis@orbithr.com",
    department: "Sales",
    position: "Sales Representative",
    status: "Inactive",
    joinDate: "Jun 20, 2020",
    image: "/placeholder.svg",
  },
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredEmployees = employeeData.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && employee.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.image} alt={employee.name} />
                            <AvatarFallback>
                              {employee.name.split(" ").map(name => name[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {employee.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            employee.status === "Active"
                              ? "default"
                              : employee.status === "Inactive"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No employees match your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
