import { Hero } from "@/components/layout/hero";
import FacultyMembers from "@/components/faculty/FacultyMembers";
import { FacultyExpertise } from "@/components/faculty/FacultyExpertise";
import { FacultyStats } from "@/components/faculty/FacultyStats";
import { FacultyCTA } from "@/components/faculty/FacultyCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty | KITS Computer Science & Machine Learning",
  description: "Meet the dedicated faculty of the Department of AI & Machine Learning at KITS, leading the way in cutting-edge education and research.",
  keywords: ["KITS Faculty", "AI & ML Faculty", "KITS Professors", "AI Education Leaders", "Machine Learning Department Staff"],
};

export default function FacultyPage() {
  return (
    <div className="space-y-0">
      <Hero
        title="Our Distinguished Faculty"
        subtitle="Meet the visionary educators and groundbreaking researchers shaping the future of Artificial Intelligence and Machine Learning at KITS."
        variant="geometric"
      />

      <FacultyMembers />

      <FacultyExpertise />

      <FacultyStats />

      <FacultyCTA />
    </div>
  );
}
