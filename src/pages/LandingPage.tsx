import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/layout/Navbar";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CTASection from "@/components/home/CTASection";
import CountriesSection from "@/components/home/CountriesSection";
import Footer from "@/components/layout/Footer";
import BudgetSection from "@/components/home/BudgetSection";

interface ILandingPageProps {}

const LandingPage: React.FunctionComponent<ILandingPageProps> = () => {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <BudgetSection />
        <CountriesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
