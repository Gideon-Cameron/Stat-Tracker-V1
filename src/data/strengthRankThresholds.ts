import { Rank } from '../types/Rank';

export type StrengthTest =
  | 'benchPress'
  | 'squat'
  | 'deadlift'
  | 'overheadPress'
  | 'pullUps'
  | 'pushUps'
  | 'barHang'
  | 'plankHold';

type Threshold = { min: number; rank: Rank };

type RankThresholds = Record<StrengthTest, Threshold[]>;

export const strengthRankThresholds: RankThresholds = {
  benchPress: [
    { min: 0, rank: 'E' },
    { min: 40, rank: 'D' },
    { min: 56, rank: 'C' },
    { min: 71, rank: 'B' },
    { min: 86, rank: 'A' },
    { min: 100, rank: 'S' },  
    { min: 121, rank: 'SS' },
    { min: 136, rank: 'Mythic' },
  ],
  
  squat: [
    { min: 0, rank: 'E' },
    { min: 50, rank: 'D' },
    { min: 66, rank: 'C' },
    { min: 81, rank: 'B' },
    { min: 91, rank: 'A' },
    { min: 111, rank: 'S' },
    { min: 131, rank: 'SS' },
    { min: 151, rank: 'Mythic' },
  ],
  deadlift: [
    { min: 0, rank: 'E' },
    { min: 60, rank: 'D' },
    { min: 76, rank: 'C' },
    { min: 91, rank: 'B' },
    { min: 106, rank: 'A' },
    { min: 126, rank: 'S' },
    { min: 146, rank: 'SS' },
    { min: 171, rank: 'Mythic' },
  ],
  overheadPress: [
    { min: 0, rank: 'E' },
    { min: 25, rank: 'D' },
    { min: 36, rank: 'C' },
    { min: 46, rank: 'B' },
    { min: 56, rank: 'A' },
    { min: 66, rank: 'S' },
    { min: 81, rank: 'SS' },
    { min: 96, rank: 'Mythic' },
  ],
  pullUps: [
    { min: 0, rank: 'E' },
    { min: 4, rank: 'D' },
    { min: 7, rank: 'C' },
    { min: 10, rank: 'B' },
    { min: 13, rank: 'A' },
    { min: 17, rank: 'S' },
    { min: 23, rank: 'SS' },
    { min: 29, rank: 'Mythic' },
  ],
  pushUps: [
    { min: 0, rank: 'E' },
    { min: 15, rank: 'D' },
    { min: 26, rank: 'C' },
    { min: 36, rank: 'B' },
    { min: 46, rank: 'A' },
    { min: 61, rank: 'S' },
    { min: 76, rank: 'SS' },
    { min: 91, rank: 'Mythic' },
  ],
  barHang: [
    { min: 0, rank: 'E' },
    { min: 10, rank: 'D' },
    { min: 21, rank: 'C' },
    { min: 31, rank: 'B' },
    { min: 41, rank: 'A' },
    { min: 56, rank: 'S' },
    { min: 76, rank: 'SS' },
    { min: 91, rank: 'Mythic' },
  ],
  plankHold: [
    { min: 0, rank: 'E' },
    { min: 30, rank: 'D' },
    { min: 61, rank: 'C' },
    { min: 91, rank: 'B' },
    { min: 121, rank: 'A' },
    { min: 161, rank: 'S' },
    { min: 201, rank: 'SS' },
    { min: 251, rank: 'Mythic' },
  ],
};
