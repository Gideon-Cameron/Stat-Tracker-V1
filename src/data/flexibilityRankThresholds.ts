import { Rank } from '../types/Rank';


export type FlexibilityTest =
  | 'frontSplitLeft'
  | 'frontSplitRight'
  | 'middleSplit'
  | 'toeTouch'
  | 'wallReach'
  | 'pancakeFold'
  | 'bridgeDepth';

export type Threshold = {
  min: number;
  rank: Rank;
};

export const flexibilityRankThresholds: Record<FlexibilityTest, Threshold[]> = {
  frontSplitLeft: [
    { min: 100, rank: 'Mythic' },
    { min: 90, rank: 'SS' },
    { min: 80, rank: 'S' },
    { min: 70, rank: 'A' },
    { min: 60, rank: 'B' },
    { min: 50, rank: 'C' },
    { min: 40, rank: 'D' },
    { min: 0, rank: 'E' },
  ],
  frontSplitRight: [
    { min: 100, rank: 'Mythic' },
    { min: 90, rank: 'SS' },
    { min: 80, rank: 'S' },
    { min: 70, rank: 'A' },
    { min: 60, rank: 'B' },
    { min: 50, rank: 'C' },
    { min: 40, rank: 'D' },
    { min: 0, rank: 'E' },
  ],
  middleSplit: [
    { min: 100, rank: 'Mythic' },
    { min: 90, rank: 'SS' },
    { min: 80, rank: 'S' },
    { min: 70, rank: 'A' },
    { min: 60, rank: 'B' },
    { min: 50, rank: 'C' },
    { min: 40, rank: 'D' },
    { min: 0, rank: 'E' },
  ],
  toeTouch: [
    { min: 100, rank: 'Mythic' },
    { min: 90, rank: 'SS' },
    { min: 80, rank: 'S' },
    { min: 70, rank: 'A' },
    { min: 60, rank: 'B' },
    { min: 50, rank: 'C' },
    { min: 40, rank: 'D' },
    { min: 0, rank: 'E' },
  ],
  wallReach: [
    { min: 100, rank: 'Mythic' },
    { min: 90, rank: 'SS' },
    { min: 80, rank: 'S' },
    { min: 70, rank: 'A' },
    { min: 60, rank: 'B' },
    { min: 50, rank: 'C' },
    { min: 40, rank: 'D' },
    { min: 0, rank: 'E' },
  ],
  pancakeFold: [
    { min: 100, rank: 'Mythic' },
    { min: 90, rank: 'SS' },
    { min: 80, rank: 'S' },
    { min: 70, rank: 'A' },
    { min: 60, rank: 'B' },
    { min: 50, rank: 'C' },
    { min: 40, rank: 'D' },
    { min: 0, rank: 'E' },
  ],
  bridgeDepth: [
    { min: 100, rank: 'Mythic' },
    { min: 90, rank: 'SS' },
    { min: 80, rank: 'S' },
    { min: 70, rank: 'A' },
    { min: 60, rank: 'B' },
    { min: 50, rank: 'C' },
    { min: 40, rank: 'D' },
    { min: 0, rank: 'E' },
  ],
};
