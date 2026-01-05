import { Hero } from "@/components/layout/hero";
import FacultyMembers from "@/components/faculty/FacultyMembers";
import ResearchPillarsSection from "@/components/layout/research-pillars-section";
import { FinalCTASection } from "@/components/layout/final-cta-section";
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

      <div className="bg-white py-12">
        <ResearchPillarsSection />
      </div>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="bg-navy rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-navy/10 shadow-2xl shadow-navy/20">
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block">Academic Excellence</span>
              <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-8">
                Driven by <span className="text-gold">Innovation</span>, Guided by Experience
              </h2>
              <p className="text-white/60 text-lg mb-12 font-medium">
                Our faculty members are not just teachers; they are mentors, researchers, and industry consultants who bring real-world insights into the classroom.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Research Papers", value: "200+" },
                  { label: "Patents Filed", value: "15+" },
                  { label: "Industry Grants", value: "₹2.5Cr+" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="text-3xl font-bold text-gold mb-1">{stat.value}</div>
                    <div className="text-[10px] uppercase font-bold text-white/40 tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </section>

      <FinalCTASection />
    </div>
  );
}
