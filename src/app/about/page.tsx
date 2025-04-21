import AboutHero from "@/components/about/Hero";
import AboutSection from "@/components/about/AboutSection";
import Timeline from "@/components/about/Timeline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | KITS Alumni Association",
  description: "Learn about the KITS Alumni Association, our history, mission, and achievements in the field of AI & Machine Learning.",
  keywords: ["About KITS", "Alumni History", "KITS Mission", "AI Education", "Machine Learning Department"],
};

export default function AboutPage() {
  return (
    <div className="space-y-0">
      <AboutHero />
      <AboutSection />
      <Timeline />
    </div>
  );
}
