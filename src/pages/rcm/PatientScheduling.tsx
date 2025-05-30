import React, { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";
import RCMStepLayout from "@/components/rcm/RCMStepLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";

const patientFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  appointmentDate: z.string().min(1, "Appointment date is required"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  reasonForVisit: z.string().min(1, "Reason for visit is required"),
});

type PatientFormData = z.infer<typeof patientFormSchema>;

const PatientScheduling = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      appointmentDate: "",
      appointmentTime: "",
      reasonForVisit: "",
    },
  });

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments");
      const data = await response.json();

      const today = dayjs().format("YYYY-MM-DD");
      const filtered = data.filter((appt: any) =>
        dayjs(appt.appointment_date).format("YYYY-MM-DD") === today
      );

      setAppointments(filtered);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const onSubmit = async (data: PatientFormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/schedule-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Appointment scheduled successfully!");
        form.reset();
        fetchAppointments(); // Refresh list
      } else {
        alert("Failed to schedule appointment: " + result.message);
      }
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <RCMStepLayout
      title="Patient Scheduling & Registration"
      description="Schedule patient appointments and collect basic registration information"
      stepNumber={1}
      icon={CalendarPlus}
      nextStep={{ name: "Insurance Verification", path: "/insurance-verification" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointment Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Schedule New Appointment</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl><Input placeholder="John" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* DOB */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Appointment Date */}
                <FormField
                  control={form.control}
                  name="appointmentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Date</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Appointment Time */}
                <FormField
                  control={form.control}
                  name="appointmentTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Time</FormLabel>
                      <FormControl><Input type="time" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Reason for Visit */}
              <FormField
                control={form.control}
                name="reasonForVisit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Visit</FormLabel>
                    <FormControl><Input placeholder="Annual checkup" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Schedule Appointment</Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Today’s Appointments */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-muted-foreground">No appointments for today.</p>
            ) : (
              appointments.map((appointment, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {appointment.first_name} {appointment.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.reason_for_visit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {dayjs(`1970-01-01T${appointment.appointment_time}`).format("hh:mm A")}
                      </p>
                      <Button variant="ghost" size="sm">Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </RCMStepLayout>
  );
};

export default PatientScheduling;
