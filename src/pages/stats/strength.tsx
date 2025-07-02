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
import { loadUserHistory } from '../../utils/loadUserHistory';

const StrengthStatPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<StrengthFormData | null>(null);
  const [result, setResult] = useState<Record<StrengthTest, Rank> | null>(null);
  const [average, setAverage] = useState<{ averageScore: number; globalRank: Rank } | null>(null);
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState<
    (StrengthFormData & { averageScore: number; globalRank: Rank; timestamp: number; id: string })[]
  >([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      console.log('[🚀 useEffect] Fetching user stats and history…');

      const saved = await loadUserStats<StrengthFormData & { averageScore: number; globalRank: Rank }>(
        user,
        'strength'
      );
      const allHistory = await loadUserHistory<StrengthFormData & {
        averageScore: number;
        globalRank: Rank;
        id: string;
      }>(user, 'strength');

      console.log('[📜 Fetched History]', allHistory);
      setHistory(allHistory);
      setHistoryIndex(null);

      if (saved) {
        console.log('[💾 Fetched Saved Stats]', saved);

        const { averageScore, globalRank, ...inputs } = saved;
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
        setFormData(inputs);
        setResult(ranks);
        setAverage({ averageScore, globalRank });
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (data: StrengthFormData) => {
    console.log('[📝 Submitting New Stats]', data);

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
    console.log('[📊 Calculated Ranks]', ranks);
    console.log('[📈 Average Result]', averageResult);

    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);
    setHistoryIndex(null);

    if (user) {
      await saveUserStats(user, 'strength', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });

      const updatedHistory = await loadUserHistory<StrengthFormData & {
        averageScore: number;
        globalRank: Rank;
        id: string;
      }>(user, 'strength');

      console.log('[📜 Reloaded History After Save]', updatedHistory);
      setHistory(updatedHistory);
      setHistoryIndex(null);
    }
  };

  const updateFromSnapshot = (index: number) => {
    const snapshot = history[index];
    if (!snapshot) return;

    console.log(`[🔍 Viewing Snapshot ${index}]`, snapshot);

    const { averageScore, globalRank, ...inputs } = snapshot;

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

    setFormData(inputs);
    setResult(ranks);
    setAverage({ averageScore, globalRank });
    setHistoryIndex(index);
  };

  const goToPreviousSnapshot = () => {
    console.log('[⬅️ Previous Snapshot Clicked]', { historyIndex });
    if (historyIndex === null && history.length > 0) {
      updateFromSnapshot(history.length - 1);
    } else if (historyIndex !== null && historyIndex > 0) {
      updateFromSnapshot(historyIndex - 1);
    }
  };

  const goToNextSnapshot = () => {
    console.log('[➡️ Next Snapshot Clicked]', { historyIndex });

    if (historyIndex !== null) {
      if (historyIndex < history.length - 1) {
        updateFromSnapshot(historyIndex + 1);
      } else {
        console.log('[🔄 Returning to Current Stats]');
        setHistoryIndex(null);
      }
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

          {history.length > 0 && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={goToPreviousSnapshot}
                disabled={history.length === 0 || (historyIndex !== null && historyIndex === 0)}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-600">
                {historyIndex === null
                  ? 'Viewing: Current Stats'
                  : `Viewing: Snapshot ${historyIndex + 1} of ${history.length}`}
              </span>
              <button
                onClick={goToNextSnapshot}
                disabled={history.length === 0}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}

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
