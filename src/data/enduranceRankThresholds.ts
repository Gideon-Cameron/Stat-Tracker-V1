import { Rank } from '../types/Rank';

export type EnduranceTest =
  | 'burpees'           // max unbroken set
  | 'plankHold'         // sec
  | 'pushUps'           // reps in 1 min
  | 'jumpRope'          // unbroken reps
  | 'wallSit'           // sec
  | 'runMaxDistance';   // km

type Threshold = { min: number; rank: Rank };

type RankThresholds = Record<EnduranceTest, Threshold[]>;

export const enduranceRankThresholds: RankThresholds = {
  burpees: [
    { min: 0, rank: 'E' },         // bottom 59%
    { min: 20, rank: 'D' },        // 60–69%
    { min: 36, rank: 'C' },        // 70–79%
    { min: 45, rank: 'B' },        // 80–89%
    { min: 60, rank: 'A' },        // 90–98.9%
    { min: 75, rank: 'S' },       // top 1%
    { min: 90, rank: 'SS' },      // top 0.1%
    { min: 120, rank: 'Mythic' },  // top 0.01%
  ],

  plankHold: [
    { min: 0, rank: 'E' },
    { min: 30, rank: 'D' },
    { min: 61, rank: 'C' },
    { min: 91, rank: 'B' },
    { min: 121, rank: 'A' },
    { min: 161, rank: 'S' },
    { min: 201, rank: 'SS' },
    { min: 301, rank: 'Mythic' }, // > 5 min
  ],

  pushUps: [
    { min: 0, rank: 'E' },
    { min: 15, rank: 'D' },
    { min: 26, rank: 'C' },
    { min: 36, rank: 'B' },
    { min: 46, rank: 'A' },
    { min: 61, rank: 'S' },
    { min: 81, rank: 'SS' },
    { min: 101, rank: 'Mythic' },
  ],

  jumpRope: [
    { min: 0, rank: 'E' },
    { min: 20, rank: 'D' },
    { min: 41, rank: 'C' },
    { min: 71, rank: 'B' },
    { min: 101, rank: 'A' },
    { min: 151, rank: 'S' },
    { min: 301, rank: 'SS' },
    { min: 501, rank: 'Mythic' },
  ],

  wallSit: [
    { min: 0, rank: 'E' },
    { min: 30, rank: 'D' },
    { min: 61, rank: 'C' },
    { min: 91, rank: 'B' },
    { min: 121, rank: 'A' },
    { min: 151, rank: 'S' },
    { min: 181, rank: 'SS' },
    { min: 241, rank: 'Mythic' },
  ],

  runMaxDistance: [
    { min: 0, rank: 'E' },
    { min: 2, rank: 'D' },
    { min: 4, rank: 'C' },
    { min: 6, rank: 'B' },
    { min: 8, rank: 'A' },
    { min: 12, rank: 'S' },
    { min: 17, rank: 'SS' },
    { min: 22, rank: 'Mythic' },
  ],
};
