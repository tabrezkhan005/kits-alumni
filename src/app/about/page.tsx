import AboutSection from "@/components/about/AboutSection";
import Timeline from "@/components/about/Timeline";
import AboutHero from "@/components/about/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CSM | KITS Computer Science & Machine Learning",
  description: "Learn about KITS CSM Department, our engineering programs, research initiatives, and achievements in Computer Science & Machine Learning.",
  keywords: ["About KITS CSM", "Engineering Programs", "CSM Mission", "Computer Science Education", "Machine Learning Engineering"],
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
