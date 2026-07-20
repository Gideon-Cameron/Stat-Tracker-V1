import Hero from "../components/Hero";
import { RankingSystem } from "../components/RankingSystem";

export default function LandingPage() {
  return (
    <div className="bg-[#0A192F]">
      <Hero />
      <RankingSystem />
    </div>
  );
}