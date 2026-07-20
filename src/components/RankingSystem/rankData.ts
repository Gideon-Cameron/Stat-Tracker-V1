// rankData.ts

export interface Rank {
    rank: string;
    title: string;
    percentile: string;
    color: string;
    gradient: string;
    description: string;
  }
  
  export const ranks: Rank[] = [
    {
      rank: "E",
      title: "Foundation",
      percentile: "Top 50%",
      color: "#94A3B8",
      gradient: "from-slate-400 to-slate-500",
      description:
        "You're standing with the global average. This range spans from little-to-no training up to everyday fitness levels. Everyone starts here—it's your first step into the journey.",
    },
  
    {
      rank: "D",
      title: "Rising",
      percentile: "Top 40%",
      color: "#22C55E",
      gradient: "from-green-400 to-emerald-500",
      description:
        "You've already pulled ahead of the crowd. Above average, but still room to grow. This is the foundation for anyone serious about climbing higher.",
    },
  
    {
      rank: "C",
      title: "Proven",
      percentile: "Top 30%",
      color: "#38BDF8",
      gradient: "from-sky-400 to-cyan-500",
      description:
        "The mark of the casual gym-goer. Reaching C means you're no longer just average—you're building momentum and standing out from the pack.",
    },
  
    {
      rank: "B",
      title: "Advanced",
      percentile: "Top 20%",
      color: "#A855F7",
      gradient: "from-violet-400 to-purple-500",
      description:
        "Now it's getting exciting. You're well above average, in the zone where progress starts to demand consistency. Push forward, and greatness awaits.",
    },
  
    {
      rank: "A",
      title: "Elite",
      percentile: "Top 10%",
      color: "#F59E0B",
      gradient: "from-amber-400 to-orange-500",
      description:
        "Welcome to the edge of elite. You've broken into the upper tier, and your dedication is showing. From here, the climb gets harder—and far more rewarding.",
    },
  
    {
      rank: "S",
      title: "Master",
      percentile: "Top 1%",
      color: "#06B6D4",
      gradient: "from-cyan-400 to-cyan-500",
      description:
        "You've joined the elite. This is the level most only dream about—proof that your discipline, training, and drive have carried you far beyond the ordinary.",
    },
  
    {
      rank: "SS",
      title: "Legendary",
      percentile: "Top 0.1%",
      color: "#EC4899",
      gradient: "from-pink-400 to-fuchsia-500",
      description:
        "Almost untouchable. This rank is for the relentless—those who refuse to stop at the summit and instead carve a new peak above it.",
    },
  
    {
      rank: "MYTHIC",
      title: "Living Legend",
      percentile: "Top 0.01%",
      color: "#FACC15",
      gradient: "from-yellow-300 via-amber-400 to-orange-500",
      description:
        "One in ten thousand. A living legend. If you've reached this rank, you're not just fit—you're a rarity, standing at the absolute pinnacle of global performance.",
    },
  ];