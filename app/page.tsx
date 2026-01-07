import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FormSection from "@/components/FormSection";

export default function Home() {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <Hero />
      <HowItWorks />
      <Benefits />
      <FormSection />
    </main>
  );
}
