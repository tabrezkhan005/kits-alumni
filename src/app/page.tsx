import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";
import { AnimatedStatistics } from "@/components/layout/animated-statistics";
import { NewsEventsSection } from "@/components/layout/news-events-section";
import { HodWelcomeSection } from "@/components/layout/hod-welcome-section";
import ResearchPillarsSection from "@/components/layout/research-pillars-section";
import { FacultySpotlightSection } from "@/components/layout/faculty-spotlight-section";
import { RecruitersSection } from "@/components/layout/recruiters-section";
import { TestimonialsCarouselSection } from "@/components/layout/testimonials-carousel-section";
import { FinalCTASection } from "@/components/layout/final-cta-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Section 1: Interactive Image Accordion Hero Section */}
      <LandingAccordionItem />

      {/* Section 2: News & Events */}
      <NewsEventsSection />

      {/* Section 3: Animated Statistics Section */}
      <AnimatedStatistics />

      {/* Section 4: HOD's Welcome */}
      <HodWelcomeSection />

      {/* Section 5: Research Pillars */}
      <ResearchPillarsSection />

      {/* Section 7: Faculty Spotlight */}
      <FacultySpotlightSection />

      {/* Section 8: Our Recruiters */}
      <RecruitersSection />

      {/* Section 9: Testimonials Carousel */}
      <TestimonialsCarouselSection />

      {/* Section 10: Final CTA */}
      <FinalCTASection />
    </div>
  );
}
