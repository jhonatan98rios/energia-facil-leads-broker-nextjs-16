import ComercializadorasHero from "@/components/comercializadoras/ComercializadorasHero";
import MarketProblem from "@/components/comercializadoras/MarketProblem";
import LeadQualification from "@/components/comercializadoras/LeadQualification";
import HowItWorksPartners from "@/components/comercializadoras/HowItWorksPartners";
import IdealProfile from "@/components/comercializadoras/IdealProfile";
import ComercializadorasForm from "@/components/comercializadoras/ComercializadorasForm";

export default function ComercializadorasPage() {
  return (
    <main className="bg-neutral-100 min-h-screen">

      <ComercializadorasHero />
      <MarketProblem />
      <LeadQualification />
      <HowItWorksPartners />
      <IdealProfile />
      <ComercializadorasForm />

    </main>
  );
}
