import React, { useEffect, useState } from 'react';
import FlexibilityInput, { FlexibilityFormData } from '../../components/statInputs/FlexibilityInput';
import { calculateFlexibilityRank } from '../../utils/calculateFlexibilityRank';
import { calculateAverageFlexibilityRank } from '../../utils/calculateAverageFlexibility';
import { FlexibilityTest } from '../../data/flexibilityRankThresholds';
import { Rank } from '../../types/Rank';
import RadarChart from '../../components/RadarChart';
import { useAuth } from '../../context/AuthContext';
import { saveUserStats } from '../../utils/saveUserStats';
import { loadUserStats } from '../../utils/loadUserStats';

const FlexibilityPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FlexibilityFormData | null>(null);
  const [result, setResult] = useState<Record<FlexibilityTest, Rank> | null>(null);
  const [average, setAverage] = useState<{
    averageScore: number;
    globalRank: Rank;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const saved = await loadUserStats<FlexibilityFormData & { averageScore: number; globalRank: Rank }>(
        user,
        'flexibility'
      );
      if (saved) {
        const { averageScore, globalRank, ...inputs } = saved;
        setFormData(inputs);

        const ranks: Record<FlexibilityTest, Rank> = Object.entries(inputs).reduce((acc, [key, val]) => {
          acc[key as FlexibilityTest] = calculateFlexibilityRank(key as FlexibilityTest, Number(val));
          return acc;
        }, {} as Record<FlexibilityTest, Rank>);

        setResult(ranks);
        setAverage({ averageScore, globalRank });
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSubmit = async (data: FlexibilityFormData) => {
    const ranks: Record<FlexibilityTest, Rank> = Object.entries(data).reduce((acc, [key, val]) => {
      acc[key as FlexibilityTest] = calculateFlexibilityRank(key as FlexibilityTest, Number(val));
      return acc;
    }, {} as Record<FlexibilityTest, Rank>);

    const averageResult = calculateAverageFlexibilityRank(Object.values(ranks));
    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);

    if (user) {
      await saveUserStats(user, 'flexibility', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading saved data...</p>;

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Flexibility Stat Assessment</h1>
      <FlexibilityInput onSubmit={handleSubmit} initialData={formData ?? undefined} />

      {result && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Flexibility Ranks</h2>

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
                <span className="font-semibold">Average Flexibility Score:</span> {average.averageScore}
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

export default FlexibilityPage;
