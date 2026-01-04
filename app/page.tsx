import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";

export default function Home() {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Benefits />
      <FormSection />
      <Footer />
    </main>
  );
}
