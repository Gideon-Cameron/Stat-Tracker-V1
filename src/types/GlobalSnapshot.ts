// types/GlobalSnapshot.ts

import { Rank } from './Rank';
import { StatCategory } from './StatCategory';

import { StrengthFormData } from '../components/statInputs/StrengthInput';
import { EnduranceFormData } from '../components/statInputs/EnduranceInput';
import { FlexibilityFormData } from '../components/statInputs/FlexibilityInput';

import { StrengthTest } from '../data/strengthRankThresholds';
import { EnduranceTest } from '../data/enduranceRankThresholds';
import { FlexibilityTest } from '../data/flexibilityRankThresholds';

/**
 * Snapshot of a single category's raw inputs, per-test results, and category average.
 */
export type StrengthSnapshot = {
  formData: StrengthFormData;
  result: Record<StrengthTest, Rank>;
  average: {
    averageScore: number;
    globalRank: Rank;
  };
};

export type EnduranceSnapshot = {
  formData: EnduranceFormData;
  result: Record<EnduranceTest, Rank>;
  average: {
    averageScore: number;
    globalRank: Rank;
  };
};

export type FlexibilitySnapshot = {
  formData: FlexibilityFormData;
  result: Record<FlexibilityTest, Rank>;
  average: {
    averageScore: number;
    globalRank: Rank;
  };
};

/**
 * A full global snapshot for the user across all major categories.
 */
export type GlobalSnapshot = {
  id?: string; // Firestore ID (optional when writing)
  timestamp: number;

  // Global summary
  rankMap: Record<StatCategory, Rank>;
  averageScore: number;
  globalRank: Rank;

  // Full breakdown
  strength: StrengthSnapshot;
  endurance: EnduranceSnapshot;
  flexibility: FlexibilitySnapshot;
};
