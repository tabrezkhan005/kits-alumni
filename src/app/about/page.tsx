import AboutSection from "@/components/about/AboutSection";
import Timeline from "@/components/about/Timeline";
import { Hero } from "@/components/layout/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CSM | KITS Computer Science & Machine Learning",
  description: "Learn about KITS CSM Department, our engineering programs, research initiatives, and achievements in Computer Science & Machine Learning.",
  keywords: ["About KITS CSM", "Engineering Programs", "CSM Mission", "Computer Science Education", "Machine Learning Engineering"],
};

export default function AboutPage() {
  return (
    <div className="space-y-0">
      <Hero
        title="About KITS CSM Department"
        subtitle="Discover our engineering excellence, cutting-edge research, and commitment to shaping the future of Computer Science & Machine Learning."
        size={500}
      />
      <AboutSection />
      <Timeline />
    </div>
  );
}
