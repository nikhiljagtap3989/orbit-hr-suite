
import React from "react";
import { ShieldCheck } from "lucide-react";
import RCMStepLayout from "@/components/rcm/RCMStepLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";

const verificationSchema = z.object({
  policyNumber: z.string().min(1, "Policy number is required"),
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  subscriberName: z.string().min(1, "Subscriber name is required"),
  subscriberId: z.string().min(1, "Subscriber ID is required"),
  groupNumber: z.string().optional(),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

const InsuranceVerification = () => {
  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      policyNumber: "",
      insuranceProvider: "",
      subscriberName: "",
      subscriberId: "",
      groupNumber: "",
    },
  });

  const onSubmit = (data: VerificationFormData) => {
    console.log("Insurance verification data:", data);
    // In a real app, this would be sent to your backend
    alert("Insurance verified successfully!");
  };

  // Sample insurance data for verification results
  const sampleVerificationResults = {
    patientName: "Sarah Johnson",
    status: "Active",
    coverageStart: "01/01/2023",
    coverageEnd: "12/31/2023",
    deductible: "$1,500",
    deductibleMet: "$750",
    copay: "$25",
    coinsurance: "20%",
    outOfPocketMax: "$5,000",
    outOfPocketMet: "$1,250",
    authorizedServices: [
      "Primary Care Visits",
      "Specialist Consultations",
      "Laboratory Services",
      "X-rays",
    ],
    notes: "Pre-authorization required for specialized imaging services.",
  };

  return (
    <RCMStepLayout
      title="Insurance Verification"
      description="Verify patient insurance coverage and eligibility"
      stepNumber={2}
      icon={ShieldCheck}
      previousStep={{ name: "Patient Scheduling", path: "/patient-scheduling" }}
      nextStep={{ name: "Patient Co-Pay Collection", path: "/copay-collection" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Verify Insurance</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="insuranceProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Provider</FormLabel>
                    <FormControl>
                      <Input placeholder="Blue Cross Blue Shield" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subscriberName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscriber Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subscriberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscriber ID</FormLabel>
                      <FormControl>
                        <Input placeholder="XYZ123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="policyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Policy Number</FormLabel>
                      <FormControl>
                        <Input placeholder="POL-12345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="groupNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="GRP-123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline">Clear</Button>
                <Button type="submit">Verify Insurance</Button>
              </div>
            </form>
          </Form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Verification Results</h2>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{sampleVerificationResults.patientName}</CardTitle>
                  <CardDescription>Policy verification details</CardDescription>
                </div>
                <Badge variant={sampleVerificationResults.status === "Active" ? "default" : "destructive"}>
                  {sampleVerificationResults.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="text-sm font-medium">Coverage Period:</div>
                <div className="text-sm">{sampleVerificationResults.coverageStart} - {sampleVerificationResults.coverageEnd}</div>
                
                <div className="text-sm font-medium">Deductible:</div>
                <div className="text-sm">{sampleVerificationResults.deductible} (Met: {sampleVerificationResults.deductibleMet})</div>
                
                <div className="text-sm font-medium">Copay:</div>
                <div className="text-sm">{sampleVerificationResults.copay}</div>
                
                <div className="text-sm font-medium">Coinsurance:</div>
                <div className="text-sm">{sampleVerificationResults.coinsurance}</div>
                
                <div className="text-sm font-medium">Out-of-Pocket Maximum:</div>
                <div className="text-sm">{sampleVerificationResults.outOfPocketMax} (Met: {sampleVerificationResults.outOfPocketMet})</div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium">Authorized Services:</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  {sampleVerificationResults.authorizedServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm italic">{sampleVerificationResults.notes}</p>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm">Print</Button>
                <Button size="sm">Save to Patient Record</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RCMStepLayout>
  );
};

export default InsuranceVerification;
