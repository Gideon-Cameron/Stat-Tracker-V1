// types/GlobalSnapshot.ts

import { StrengthFormData } from '../components/statInputs/StrengthInput';
import { EnduranceFormData } from '../components/statInputs/EnduranceInput';
import { FlexibilityFormData } from '../components/statInputs/FlexibilityInput';

import { Rank } from './Rank';
import { StrengthTest } from '../data/strengthRankThresholds';
import { EnduranceTest } from '../data/enduranceRankThresholds';
import { FlexibilityTest } from '../data/flexibilityRankThresholds';

import { StatCategory } from './StatCategory';

// Snapshot shape for strength stats
export type StrengthSnapshot = {
  formData: StrengthFormData;
  result: Record<StrengthTest, Rank>;
  average: {
    averageScore: number;
    globalRank: Rank;
  };
};

// Snapshot shape for endurance stats
export type EnduranceSnapshot = {
  formData: EnduranceFormData;
  result: Record<EnduranceTest, Rank>;
  average: {
    averageScore: number;
    globalRank: Rank;
  };
};

// Snapshot shape for flexibility stats
export type FlexibilitySnapshot = {
  formData: FlexibilityFormData;
  result: Record<FlexibilityTest, Rank>;
  average: {
    averageScore: number;
    globalRank: Rank;
  };
};

// A full snapshot representing all categories and the overall rank
export type GlobalSnapshot = {
  id?: string; // Will be included when fetched from Firestore
  timestamp: number;
  strength: StrengthSnapshot;
  endurance: EnduranceSnapshot;
  flexibility: FlexibilitySnapshot;
  averageScore: number; // average across categories
  globalRank: Rank;     // final global rank based on total average

  rankMap: Record<StatCategory, Rank>;
};
