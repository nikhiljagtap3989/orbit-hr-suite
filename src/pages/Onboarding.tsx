
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, CheckCircle, XCircle, Clock } from "lucide-react";

const Onboarding = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employee Onboarding</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Onboarding
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
          <TabsTrigger value="active">Active (4)</TabsTrigger>
          <TabsTrigger value="completed">Completed (8)</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activeOnboardings.map((employee) => (
            <Card key={employee.id} className="hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{employee.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{employee.position} - {employee.department}</p>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Start Date: {employee.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={employee.progress} className="h-2 w-32" />
                      <span className="text-sm font-medium">{employee.progress}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Documentation</h4>
                        <Badge variant={employee.documentation.completed ? "default" : "outline"}>
                          {employee.documentation.completed ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {employee.documentation.tasks.map((task, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {task.completed ? 
                              <CheckCircle className="h-4 w-4 text-green-500" /> : 
                              <XCircle className="h-4 w-4 text-muted-foreground" />}
                            <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Equipment</h4>
                        <Badge variant={employee.equipment.completed ? "default" : "outline"}>
                          {employee.equipment.completed ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {employee.equipment.tasks.map((task, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {task.completed ? 
                              <CheckCircle className="h-4 w-4 text-green-500" /> : 
                              <XCircle className="h-4 w-4 text-muted-foreground" />}
                            <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Training</h4>
                        <Badge variant={employee.training.completed ? "default" : "outline"}>
                          {employee.training.completed ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {employee.training.tasks.map((task, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {task.completed ? 
                              <CheckCircle className="h-4 w-4 text-green-500" /> : 
                              <XCircle className="h-4 w-4 text-muted-foreground" />}
                            <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Onboardings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">All completed employee onboarding processes will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage your onboarding templates for different departments and positions.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Sample data
const activeOnboardings = [
  {
    id: "onb001",
    name: "Emma Thompson",
    position: "UI/UX Designer",
    department: "Design",
    startDate: "June 1, 2023",
    progress: 75,
    documentation: {
      completed: true,
      tasks: [
        { name: "Submit identification documents", completed: true },
        { name: "Complete tax forms", completed: true },
        { name: "Sign employment contract", completed: true },
      ],
    },
    equipment: {
      completed: true,
      tasks: [
        { name: "Laptop setup", completed: true },
        { name: "Software installation", completed: true },
        { name: "Access badge issued", completed: true },
      ],
    },
    training: {
      completed: false,
      tasks: [
        { name: "Company orientation", completed: true },
        { name: "Department introduction", completed: true },
        { name: "Design tools training", completed: false },
      ],
    },
  },
  {
    id: "onb002",
    name: "Robert Garcia",
    position: "Software Developer",
    department: "Engineering",
    startDate: "June 5, 2023",
    progress: 45,
    documentation: {
      completed: true,
      tasks: [
        { name: "Submit identification documents", completed: true },
        { name: "Complete tax forms", completed: true },
        { name: "Sign employment contract", completed: true },
      ],
    },
    equipment: {
      completed: false,
      tasks: [
        { name: "Laptop setup", completed: true },
        { name: "Software installation", completed: false },
        { name: "Access badge issued", completed: true },
      ],
    },
    training: {
      completed: false,
      tasks: [
        { name: "Company orientation", completed: true },
        { name: "Department introduction", completed: false },
        { name: "Codebase introduction", completed: false },
      ],
    },
  },
  {
    id: "onb003",
    name: "Lisa Wang",
    position: "Marketing Specialist",
    department: "Marketing",
    startDate: "May 22, 2023",
    progress: 90,
    documentation: {
      completed: true,
      tasks: [
        { name: "Submit identification documents", completed: true },
        { name: "Complete tax forms", completed: true },
        { name: "Sign employment contract", completed: true },
      ],
    },
    equipment: {
      completed: true,
      tasks: [
        { name: "Laptop setup", completed: true },
        { name: "Software installation", completed: true },
        { name: "Access badge issued", completed: true },
      ],
    },
    training: {
      completed: false,
      tasks: [
        { name: "Company orientation", completed: true },
        { name: "Department introduction", completed: true },
        { name: "Marketing tools training", completed: true },
        { name: "Brand guidelines review", completed: false },
      ],
    },
  },
];

export default Onboarding;
