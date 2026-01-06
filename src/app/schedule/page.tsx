import { Metadata } from "next";
import ScheduleHero from "@/components/schedule/ScheduleHero";
import ScheduleForm from "@/components/schedule/ScheduleForm";
import ScheduleInfo from "@/components/schedule/ScheduleInfo";

export const metadata: Metadata = {
  title: "Schedule a Meeting | KITS Alumni Association",
  description: "Schedule a meeting with the Head of Department or faculty members for academic discussions, mentorship, or collaboration opportunities.",
  keywords: ["Schedule Meeting", "Book Appointment", "Meet HOD", "Faculty Meeting", "Academic Consultation"],
};

export default function SchedulePage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden bg-white">
      <ScheduleHero />
      <ScheduleForm />
      <ScheduleInfo />
    </main>
  );
}

