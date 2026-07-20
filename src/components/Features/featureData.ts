import {
    Globe2,
    Radar,
    TrendingUp,
    Dumbbell,
  } from "lucide-react";
  
  import type { Feature } from "./types";
  
  export const features: Feature[] = [
    {
      title: "Global Rankings",
      description:
        "See exactly where you stand against athletes around the world. Compare your overall rank or dive into individual categories to discover your strengths and weaknesses.",
      icon: Globe2,
      color: "#22D3EE",
    },
  
    {
      title: "Performance Radar",
      description:
        "Visualize your abilities with an interactive radar chart that highlights your strongest lifts and exposes areas with the greatest potential for improvement.",
      icon: Radar,
      color: "#3B82F6",
    },
  
    {
      title: "Progress History",
      description:
        "Every assessment is saved automatically so you can track your improvement over time, celebrate milestones, and watch your rank climb higher.",
      icon: TrendingUp,
      color: "#A855F7",
    },
  
    {
      title: "Complete Assessment",
      description:
        "Measure more than just strength. Track endurance, speed, flexibility, skill, balance, and other performance metrics for a complete fitness profile.",
      icon: Dumbbell,
      color: "#14B8A6",
    },
  ];