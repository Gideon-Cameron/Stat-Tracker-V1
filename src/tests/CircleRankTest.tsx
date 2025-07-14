import React, { useState } from 'react';

type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'Mythic';
type SubRank =
  | 'E-' | 'E' | 'E+'
  | 'D-' | 'D' | 'D+'
  | 'C-' | 'C' | 'C+'
  | 'B-' | 'B' | 'B+'
  | 'A-' | 'A' | 'A+'
  | 'S-' | 'S' | 'S+'
  | 'SS-' | 'SS' | 'SS+'
  | 'Mythic';

interface Threshold {
  min: number;
  rank: Rank;
}

interface SubRankResult {
  rank: Rank;
  modifier: '-' | '' | '+';
  percentToNext: number; // 0 to 100
}

// Mock thresholds for bench press
const benchPressThresholds: Threshold[] = [
  { min: 0, rank: 'E' },
  { min: 40, rank: 'D' },
  { min: 56, rank: 'C' },
  { min: 71, rank: 'B' },
  { min: 86, rank: 'A' },
  { min: 100, rank: 'S' },
  { min: 121, rank: 'SS' },
  { min: 136, rank: 'Mythic' },
];

// Rank logic
function getSubRank(value: number): SubRankResult {
  for (let i = benchPressThresholds.length - 1; i >= 0; i--) {
    const current = benchPressThresholds[i];
    const next = benchPressThresholds[i + 1];

    if (value >= current.min) {
      if (!next) {
        return { rank: current.rank, modifier: '', percentToNext: 100 };
      }

      const span = next.min - current.min;
      const progress = (value - current.min) / span;
      let modifier: '-' | '' | '+' = '';

      if (progress < 0.33) modifier = '-';
      else if (progress < 0.66) modifier = '';
      else modifier = '+';

      return {
        rank: current.rank,
        modifier,
        percentToNext: Math.min(100, Math.max(0, Math.round(progress * 100))),
      };
    }
  }

  return { rank: 'E', modifier: '-', percentToNext: 0 };
}

// Circle component with label inside
const SubRankCircle: React.FC<{ percent: number; label: SubRank }> = ({ percent, label }) => {
  const radius = 30;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-[60px] h-[60px]">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="#e2e8f0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-700">
        {label}
      </span>
    </div>
  );
};

// Main Test Component
const BenchPressSubRankTest: React.FC = () => {
  const [value, setValue] = useState<number>(72);
  const subRank = getSubRank(value);
  const label = `${subRank.rank}${subRank.modifier}` as SubRank;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Bench Press SubRank</h2>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="border p-2 rounded w-32 text-center mb-4"
      />

      <div className="flex flex-col items-center gap-2">
        <SubRankCircle percent={subRank.percentToNext} label={label} />
        <div className="text-sm text-gray-600">{subRank.percentToNext}% to next rank</div>
      </div>
    </div>
  );
};

export default BenchPressSubRankTest;
