import { Metadata } from "next";
import { Hero } from "@/components/layout/hero";
import ContactInfo from "@/components/contact/ContactInfo";
import JoinNetwork from "@/components/contact/JoinNetwork";
import Faq from "@/components/contact/Faq";

export const metadata: Metadata = {
  title: "Contact | KITS Alumni Association",
  description: "Get in touch with the KITS Alumni Association for inquiries, collaborations, or to update your information.",
  keywords: ["Contact KITS", "Alumni Association Contact", "KITS Support", "Get in Touch", "Alumni Inquiry"],
};

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Hero
        title="Get in Touch"
        subtitle="Connect with our team for inquiries, feedback, or collaboration opportunities"
        size={450}
      />
      <ContactInfo />
      <JoinNetwork />
      <div id="faq-section">
        <Faq />
      </div>
    </main>
  );
}
