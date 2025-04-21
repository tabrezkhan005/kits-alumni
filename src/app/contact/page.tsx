import { Metadata } from "next";
import ContactHero from "@/components/contact/Hero";
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
      <ContactHero />
      <ContactInfo />
      <JoinNetwork />
      <div id="faq-section">
        <Faq />
      </div>
    </main>
  );
}
