
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, File, Download, Share, MoreVertical, Folder } from "lucide-react";

// Sample document data
const templateDocuments = [
  {
    id: "doc001",
    name: "Employment Contract",
    category: "Contracts",
    updatedDate: "May 10, 2023",
    fileSize: "245 KB",
    fileType: "PDF",
  },
  {
    id: "doc002",
    name: "NDA Agreement",
    category: "Legal",
    updatedDate: "Apr 15, 2023",
    fileSize: "125 KB",
    fileType: "DOCX",
  },
  {
    id: "doc003",
    name: "Onboarding Checklist",
    category: "HR",
    updatedDate: "Jun 01, 2023",
    fileSize: "85 KB",
    fileType: "XLSX",
  },
  {
    id: "doc004",
    name: "IT Policy",
    category: "Policies",
    updatedDate: "Mar 22, 2023",
    fileSize: "320 KB",
    fileType: "PDF",
  },
  {
    id: "doc005",
    name: "Employee Handbook",
    category: "HR",
    updatedDate: "Feb 14, 2023",
    fileSize: "1.2 MB",
    fileType: "PDF",
  },
];

const employeeDocuments = [
  {
    id: "emp001",
    name: "John Doe",
    documentCount: 5,
    lastUpdated: "Jun 05, 2023",
  },
  {
    id: "emp002",
    name: "Jane Smith",
    documentCount: 4,
    lastUpdated: "May 18, 2023",
  },
  {
    id: "emp003",
    name: "Robert Johnson",
    documentCount: 6,
    lastUpdated: "Jun 02, 2023",
  },
  {
    id: "emp004",
    name: "Sarah Williams",
    documentCount: 3,
    lastUpdated: "Apr 30, 2023",
  },
  {
    id: "emp005",
    name: "Michael Brown",
    documentCount: 5,
    lastUpdated: "May 25, 2023",
  },
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTemplates = templateDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredEmployees = employeeDocuments.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Folder className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="relative w-full md:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search documents..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-scale">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <File className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mb-1">Templates</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">Standardized forms and documents</p>
            <Badge>{templateDocuments.length} documents</Badge>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <File className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mb-1">Employee Files</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">Personal employee documentation</p>
            <Badge>{employeeDocuments.length} employees</Badge>
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <File className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mb-1">Company Policies</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">Official company guidelines</p>
            <Badge>12 documents</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 mb-4">
          <TabsTrigger value="templates">Document Templates</TabsTrigger>
          <TabsTrigger value="employee-files">Employee Files</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((doc) => (
              <Card key={doc.id} className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <File className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {doc.fileType}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {doc.fileSize}
                          </span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">
                      Category: {doc.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Updated: {doc.updatedDate}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" className="w-full">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredTemplates.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <File className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No documents found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or upload a new document
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="employee-files">
          <Card>
            <CardHeader>
              <CardTitle>Employee Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEmployees.map((employee) => (
                  <Card key={employee.id} className="hover-scale">
                    <CardContent className="p-6">
                      <h3 className="font-medium">{employee.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">
                          {employee.documentCount} files
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last updated: {employee.lastUpdated}
                        </span>
                      </div>
                      <Button size="sm" className="w-full mt-4">
                        View Files
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {filteredEmployees.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <File className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No employees found</h3>
                    <p className="text-muted-foreground mt-1">
                      Try adjusting your search criteria
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
