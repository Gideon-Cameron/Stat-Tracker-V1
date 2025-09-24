// utils/formatRankPercentage.ts
export function formatRankPercentage(score: number): string {
    switch (score) {
      case 1:
        return "Bottom 50%"; // E rank
      case 2:
        return "Top 40%";    // D rank
      case 3:
        return "Top 30%";    // C rank
      case 4:
        return "Top 20%";    // B rank
      case 5:
        return "Top 10%";    // A rank
      case 6:
        return "Top 1%";     // S rank
      case 7:
        return "Top 0.1%";   // SS rank
      case 8:
        return "Top 0.01%";  // Mythic rank
      default:
        return "Unranked";
    }
  }
  