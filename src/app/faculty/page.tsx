import { Hero } from "@/components/layout/hero";
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
      <Hero
        title="Meet Our Faculty"
        subtitle="Dedicated educators and researchers leading the way in AI & Machine Learning."
        size={500}
      />
      <FacultyMembers />
    </div>
  );
}
