import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FilePlus } from "lucide-react";

const claimSchema = z.object({
  appointmentId: z.string().min(1, "Select an appointment"),
  diagnosisCode: z.string().min(1, "Diagnosis code is required"),
  procedureCode: z.string().min(1, "Procedure code is required"),
  billedAmount: z.string().min(1, "Billed amount is required"),
  providerNPI: z.string().min(1, "Provider NPI is required"),
  insuranceProvider: z.string().min(1, "Insurance Provider is required"),
  insurancePolicyNumber: z.string().min(1, "Policy Number is required"),
  serviceLocation: z.string().min(1, "Service Location is required"),
  claimNotes: z.string().optional(),
  medicalReport: z.any().optional(),
  billingDoc: z.any().optional(),
});

const ClaimSubmission = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const form = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      appointmentId: "",
      diagnosisCode: "",
      procedureCode: "",
      billedAmount: "",
      providerNPI: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      serviceLocation: "",
      claimNotes: "",
      medicalReport: null,
      billingDoc: null,
    },
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  const handleAppointmentChange = (e) => {
    const id = e.target.value;
    form.setValue("appointmentId", id);
    const appt = appointments.find((a) => a.id === id);
    setSelectedAppointment(appt);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch("http://localhost:5000/api/submit-claim", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Claim submitted successfully!");
        form.reset();
        setSelectedAppointment(null);
      } else {
        alert("Failed to submit claim: " + result.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <FilePlus className="text-primary" />
            <h2 className="text-xl font-bold">Claim Submission</h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appointment Select */}
              <FormItem>
                <FormLabel>Select Appointment</FormLabel>
                <FormControl>
                    <select
                    onChange={handleAppointmentChange}
                    value={form.watch("appointmentId")}
                    className="w-full border rounded px-3 py-2"
                    >
                    <option value="">-- Select --</option>
                    {appointments.map((appt) => (
                        <option key={appt.id} value={appt.id}>
                        {`${appt.first_name} ${appt.last_name} - ${new Date(appt.appointment_date).toLocaleDateString()} (${appt.reason_for_visit})`}
                        </option>
                    ))}
                    </select>
                </FormControl>
                <FormMessage />
                </FormItem>


              {/* Diagnosis Code */}
              <FormField
                control={form.control}
                name="diagnosisCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosis Code (ICD-10)</FormLabel>
                    <FormControl>
                      <Input placeholder="E11.9" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Procedure Code */}
              <FormField
                control={form.control}
                name="procedureCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Procedure Code (CPT)</FormLabel>
                    <FormControl>
                      <Input placeholder="99213" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Billed Amount */}
              <FormField
                control={form.control}
                name="billedAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billed Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="125.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Provider NPI */}
              <FormField
                control={form.control}
                name="providerNPI"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider NPI</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Insurance Provider */}
              <FormField
                control={form.control}
                name="insuranceProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Provider</FormLabel>
                    <FormControl>
                      <Input placeholder="Blue Cross, Aetna, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Insurance Policy Number */}
              <FormField
                control={form.control}
                name="insurancePolicyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy Number</FormLabel>
                    <FormControl>
                      <Input placeholder="POL1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Service Location */}
              <FormField
                control={form.control}
                name="serviceLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Location</FormLabel>
                    <FormControl>
                      <Input placeholder="New York Clinic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Claim Notes */}
              <FormField
                control={form.control}
                name="claimNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Claim Notes</FormLabel>
                    <FormControl>
                      <Input placeholder="Any special notes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload Medical Report */}
              <FormField
                control={form.control}
                name="medicalReport"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Upload Medical Report</FormLabel>
                    <FormControl>
                      <Input type="file" accept=".pdf,.jpg,.png" onChange={(e) => onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Upload Billing Document */}
              <FormField
                control={form.control}
                name="billingDoc"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Upload Billing Document</FormLabel>
                    <FormControl>
                      <Input type="file" accept=".pdf,.jpg,.png" onChange={(e) => onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="md:col-span-2">
                <Button type="submit" >
                  Submit Claim
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimSubmission;
