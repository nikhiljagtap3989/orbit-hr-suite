
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CalendarPlus, ShieldCheck, Coins, FileText, Code, FilePen, Search, Send, Receipt, X, Mail, FileText as FileInvoice } from "lucide-react";

const rcmSteps = [
  {
    id: 1,
    name: "Patient Scheduling & Registration",
    path: "/patient-scheduling",
    description: "Schedule appointments and register patient information",
    icon: CalendarPlus,
    color: "bg-purple-100 text-purple-700 border-purple-200"
  },
  {
    id: 2,
    name: "Insurance Verification",
    path: "/insurance-verification",
    description: "Verify patient insurance coverage and benefits",
    icon: ShieldCheck,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200"
  },
  {
    id: 3,
    name: "Patient Co-Pay Collection",
    path: "/copay-collection",
    description: "Collect patient co-pays and manage patient payments",
    icon: Coins,
    color: "bg-blue-100 text-blue-700 border-blue-200"
  },
  {
    id: 4,
    name: "Documentation of Visit",
    path: "/visit-documentation",
    description: "Document patient visits and clinical information",
    icon: FileText,
    color: "bg-sky-100 text-sky-700 border-sky-200"
  },
  {
    id: 5,
    name: "Medical Coding",
    path: "/medical-coding",
    description: "Assign appropriate medical codes for procedures and diagnoses",
    icon: Code,
    color: "bg-cyan-100 text-cyan-700 border-cyan-200"
  },
  {
    id: 6,
    name: "Demo and Charge Entry",
    path: "/charge-entry",
    description: "Enter patient demographics and charges for services",
    icon: FilePen,
    color: "bg-teal-100 text-teal-700 border-teal-200"
  },
  {
    id: 7,
    name: "Claims Checking and Error Resolution",
    path: "/claims-checking",
    description: "Review claims for errors and resolve issues before submission",
    icon: Search,
    color: "bg-red-100 text-red-700 border-red-200"
  },
  {
    id: 8,
    name: "Claims Submission",
    path: "/claims-submission",
    description: "Submit claims to insurance providers",
    icon: Send,
    color: "bg-rose-100 text-rose-700 border-rose-200"
  },
  {
    id: 9,
    name: "Payment Processing and Posting",
    path: "/payment-processing",
    description: "Process and post payments from insurance providers and patients",
    icon: Receipt,
    color: "bg-orange-100 text-orange-700 border-orange-200"
  },
  {
    id: 10,
    name: "Denial Management",
    path: "/denial-management",
    description: "Manage denied claims and appeal processes",
    icon: X,
    color: "bg-amber-100 text-amber-700 border-amber-200"
  },
  {
    id: 11,
    name: "A/R Follow-up and Appeals",
    path: "/ar-followup",
    description: "Follow up on accounts receivable and manage appeals",
    icon: Mail,
    color: "bg-lime-100 text-lime-700 border-lime-200"
  },
  {
    id: 12,
    name: "Patient Statements",
    path: "/patient-statements",
    description: "Generate and send patient statements",
    icon: FileInvoice,
    color: "bg-emerald-100 text-emerald-700 border-emerald-200"
  }
];

const RCMDashboard = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Healthcare Revenue Cycle Management (RCM)</h1>
        <p className="text-muted-foreground">
          Complete end-to-end solution for managing the healthcare revenue cycle from patient scheduling to payment collection.
        </p>
      </div>
      
      <div className="relative mb-12">
        <div className="flex justify-center mb-8">
          <div className="w-40 h-40 rounded-full bg-amber-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            RCM
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rcmSteps.map((step) => (
            <Link to={step.path} key={step.id} className="hover-scale">
              <Card className={`h-full border-2 ${step.color} shadow-sm`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-lg font-semibold">
                      {step.id}
                    </div>
                    <CardTitle className="text-lg">{step.name}</CardTitle>
                  </div>
                  <step.icon className="h-6 w-6" />
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RCMDashboard;
