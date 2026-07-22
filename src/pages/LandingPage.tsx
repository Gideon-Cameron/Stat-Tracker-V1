import Hero from "../components/Hero";
import { RankingSystem } from "../components/RankingSystem";
import { Features } from "../components/Features";
import DashboardShowcase from "../components/DashboardShowcase"

export default function LandingPage() {
  return (
    <div className="bg-[#0A192F]">
      <Hero />
      <RankingSystem />
      <Features />
      <DashboardShowcase />
    </div>
  );
}