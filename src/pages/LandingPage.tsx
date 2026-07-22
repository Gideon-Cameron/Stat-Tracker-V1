import Hero from "../components/Hero";
import { RankingSystem } from "../components/RankingSystem";
import { Features } from "../components/Features";
import DashboardShowcase from "../components/DashboardShowcase"
import FinalCTA from "../components/FinalCTA"

export default function LandingPage() {
  return (
    <div className="bg-[#0A192F]">
      <Hero />
      <RankingSystem />
      <Features />
      <DashboardShowcase />
      <FinalCTA />
    </div>
  );
}