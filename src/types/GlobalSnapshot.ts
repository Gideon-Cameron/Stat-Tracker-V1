// types/GlobalSnapshot.ts

import { StrengthFormData } from '../components/statInputs/StrengthInput';
import { EnduranceFormData } from '../components/statInputs/EnduranceInput';
import { FlexibilityFormData } from '../components/statInputs/FlexibilityInput';
import { Rank } from './Rank';
import { StrengthTest } from '../data/strengthRankThresholds';
import { EnduranceTest } from '../data/enduranceRankThresholds';
import { FlexibilityTest } from '../data/flexibilityRankThresholds';

export type StrengthSnapshot = {
  formData: StrengthFormData;
  result: Record<StrengthTest, Rank>;
  average: { averageScore: number; globalRank: Rank };
};

export type EnduranceSnapshot = {
  formData: EnduranceFormData;
  result: Record<EnduranceTest, Rank>;
  average: { averageScore: number; globalRank: Rank };
};

export type FlexibilitySnapshot = {
  formData: FlexibilityFormData;
  result: Record<FlexibilityTest, Rank>;
  average: { averageScore: number; globalRank: Rank };
};

export type GlobalSnapshot = {
  id?: string; // optional when saving
  timestamp: number;
  strength: StrengthSnapshot;
  endurance: EnduranceSnapshot;
  flexibility: FlexibilitySnapshot;
  averageScore: number;
  globalRank: Rank;
};
