import AboutSection from "@/components/about/AboutSection";
import Timeline from "@/components/about/Timeline";
import { Hero } from "@/components/layout/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | KITS Alumni Association",
  description: "Learn about the KITS Alumni Association, our history, mission, and achievements in the field of AI & Machine Learning.",
  keywords: ["About KITS", "Alumni History", "KITS Mission", "AI Education", "Machine Learning Department"],
};

export default function AboutPage() {
  return (
    <div className="space-y-0">
      <Hero
        title="Our Alumni Story"
        subtitle="Discover the history, values, and mission driving our vibrant alumni community."
        size={500}
      />
      <AboutSection />
      <Timeline />
    </div>
  );
}
