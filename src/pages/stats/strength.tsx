import React, { useEffect, useState } from 'react';
import StrengthInput, { StrengthFormData } from '../../components/statInputs/StrengthInput';
import { calculateStrengthRank } from '../../utils/calculateStrengthRank';
import { calculateAverageStrengthRank } from '../../utils/calculateAverageStrength';
import { StrengthTest } from '../../data/strengthRankThresholds';
import { Rank } from '../../types/Rank';
import RadarChart from '../../components/RadarChart';
import { useAuth } from '../../context/AuthContext';
import { saveUserStats } from '../../utils/saveUserStats';
import { loadUserStats } from '../../utils/loadUserStats';

const StrengthStatPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<StrengthFormData | null>(null);
  const [result, setResult] = useState<Record<StrengthTest, Rank> | null>(null);
  const [average, setAverage] = useState<{
    averageScore: number;
    globalRank: Rank;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const saved = await loadUserStats<StrengthFormData & { averageScore: number; globalRank: Rank }>(
        user,
        'strength'
      );
      if (saved) {
        const { averageScore, globalRank, ...inputs } = saved;
        setFormData(inputs);
        const ranks: Record<StrengthTest, Rank> = {
          benchPress: calculateStrengthRank('benchPress', Number(inputs.benchPress)),
          squat: calculateStrengthRank('squat', Number(inputs.squat)),
          deadlift: calculateStrengthRank('deadlift', Number(inputs.deadlift)),
          overheadPress: calculateStrengthRank('overheadPress', Number(inputs.overheadPress)),
          pullUps: calculateStrengthRank('pullUps', Number(inputs.pullUps)),
          pushUps: calculateStrengthRank('pushUps', Number(inputs.pushUps)),
          barHang: calculateStrengthRank('barHang', Number(inputs.barHang)),
          plankHold: calculateStrengthRank('plankHold', Number(inputs.plankHold)),
        };
        setResult(ranks);
        setAverage({ averageScore, globalRank });
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSubmit = async (data: StrengthFormData) => {
    const ranks: Record<StrengthTest, Rank> = {
      benchPress: calculateStrengthRank('benchPress', Number(data.benchPress)),
      squat: calculateStrengthRank('squat', Number(data.squat)),
      deadlift: calculateStrengthRank('deadlift', Number(data.deadlift)),
      overheadPress: calculateStrengthRank('overheadPress', Number(data.overheadPress)),
      pullUps: calculateStrengthRank('pullUps', Number(data.pullUps)),
      pushUps: calculateStrengthRank('pushUps', Number(data.pushUps)),
      barHang: calculateStrengthRank('barHang', Number(data.barHang)),
      plankHold: calculateStrengthRank('plankHold', Number(data.plankHold)),
    };

    const averageResult = calculateAverageStrengthRank(Object.values(ranks));
    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);

    if (user) {
      await saveUserStats(user, 'strength', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading saved data...</p>;

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Strength Stat Assessment</h1>
      <StrengthInput onSubmit={handleSubmit} initialData={formData ?? undefined} />

      {result && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Strength Ranks</h2>

          <RadarChart data={result} />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(result).map(([test, rank]) => (
              <li key={test} className="flex justify-between items-center border-b py-2">
                <span className="capitalize whitespace-nowrap">{test.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-bold text-blue-700 whitespace-nowrap ml-4">{rank}</span>
              </li>
            ))}
          </ul>

          {average && (
            <div className="mt-6 text-center">
              <p className="text-lg">
                <span className="font-semibold">Average Strength Score:</span> {average.averageScore}
              </p>
              <p className="text-xl mt-1">
                <span className="font-bold text-blue-800">Global Rank:</span> {average.globalRank}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StrengthStatPage;
