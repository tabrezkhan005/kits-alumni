import { EntropyDemo } from "@/components/ui/entropy-demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entropy Demo | KITS College",
  description: "A visual demonstration of order and chaos using interactive particle animations.",
};

export default function EntropyDemoPage() {
  return <EntropyDemo />;
}
