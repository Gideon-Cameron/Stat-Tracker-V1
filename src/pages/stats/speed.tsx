import React, { useEffect, useState } from 'react';
import SpeedInput, { SpeedFormData } from '../../components/statInputs/SpeedInput';
import { calculateSpeedRank } from '../../utils/calculateSpeedRank';
import { calculateAverageStrengthRank } from '../../utils/calculateAverageStrength';
import { SpeedTest } from '../../data/speedRankThresholds';
import { Rank } from '../../types/Rank';
import RadarChart from '../../components/RadarChart';
import { useAuth } from '../../context/AuthContext';
import { saveUserStats } from '../../utils/saveUserStats';
import { loadUserStats } from '../../utils/loadUserStats';

const SpeedStatPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<SpeedFormData | null>(null);
  const [result, setResult] = useState<Record<SpeedTest, Rank> | null>(null);
  const [average, setAverage] = useState<{
    averageScore: number;
    globalRank: Rank;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const saved = await loadUserStats<SpeedFormData & { averageScore: number; globalRank: Rank }>(
        user,
        'speed'
      );
      if (saved) {
        const { averageScore, globalRank, ...inputs } = saved;
        setFormData(inputs);
        const ranks: Record<SpeedTest, Rank> = {
          sprint100m: calculateSpeedRank('sprint100m', Number(inputs.sprint100m)),
          run1km: calculateSpeedRank('run1km', Number(inputs.run1km)),
          suicides20m: calculateSpeedRank('suicides20m', Number(inputs.suicides20m)),
          rulerDrop: calculateSpeedRank('rulerDrop', Number(inputs.rulerDrop)),
          reactionTime: calculateSpeedRank('reactionTime', Number(inputs.reactionTime)),
        };
        setResult(ranks);
        setAverage({ averageScore, globalRank });
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSubmit = async (data: SpeedFormData) => {
    const ranks: Record<SpeedTest, Rank> = {
      sprint100m: calculateSpeedRank('sprint100m', Number(data.sprint100m)),
      run1km: calculateSpeedRank('run1km', Number(data.run1km)),
      suicides20m: calculateSpeedRank('suicides20m', Number(data.suicides20m)),
      rulerDrop: calculateSpeedRank('rulerDrop', Number(data.rulerDrop)),
      reactionTime: calculateSpeedRank('reactionTime', Number(data.reactionTime)),
    };

    const averageResult = calculateAverageStrengthRank(Object.values(ranks));
    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);

    if (user) {
      await saveUserStats(user, 'speed', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading saved data...</p>;

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Speed Stat Assessment</h1>
      <SpeedInput onSubmit={handleSubmit} initialData={formData ?? undefined} />

      {result && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Speed Ranks</h2>
          <RadarChart data={result} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(result).map(([test, rank]) => (
              <li key={test} className="flex justify-between items-center border-b py-2">
                <span className="capitalize whitespace-nowrap">
                  {test.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                </span>
                <span className="font-bold text-blue-700 whitespace-nowrap ml-4">{rank}</span>
              </li>
            ))}
          </ul>

          {average && (
            <div className="mt-6 text-center">
              <p className="text-lg">
                <span className="font-semibold">Average Speed Score:</span> {average.averageScore}
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

export default SpeedStatPage;
