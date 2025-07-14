import React from 'react';
import { SubRankResult } from '../types/Rank';

interface SubRankCircleProps {
  rank: SubRankResult;
}

const rankColors: Record<string, string> = {
  'E': '#e0e0e0',
  'D': '#c6d2ff',
  'C': '#9ab0ff',
  'B': '#7b9aff',
  'A': '#4d80ff',
  'S': '#3f62db',
  'SS': '#2b44b2',
  'Mythic': '#151f6d',
};

const SubRankCircle: React.FC<SubRankCircleProps> = ({ rank }) => {
  const { rank: letter, modifier, percentToNext } = rank;
  const progress = Math.min(percentToNext, 99.9); // to avoid full circle edge case

  const strokeDasharray = 88;
  const strokeDashoffset = strokeDasharray * (1 - progress / 100);

  return (
    <div className="relative w-10 h-10">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={rankColors[letter] || '#4d80ff'}
          strokeWidth="3"
          strokeDasharray={`${strokeDasharray}`}
          strokeDashoffset={`${strokeDashoffset}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
        {letter}{modifier}
      </div>
    </div>
  );
};

export default SubRankCircle;
