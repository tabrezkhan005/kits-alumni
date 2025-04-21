import FacultyHero from "@/components/faculty/Hero";
import FacultyMembers from "@/components/faculty/FacultyMembers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faculty | KITS Alumni Association",
  description: "Meet the dedicated faculty of the Department of AI & Machine Learning at KITS, leading the way in cutting-edge education and research.",
  keywords: ["KITS Faculty", "AI & ML Faculty", "KITS Professors", "AI Education Leaders", "Machine Learning Department Staff"],
};

export default function FacultyPage() {
  return (
    <div className="space-y-0">
      <FacultyHero />
      <FacultyMembers />
    </div>
  );
}
