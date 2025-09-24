import React, { useEffect, useState } from 'react';
import EnduranceInput, { EnduranceFormData } from '../../components/statInputs/EnduranceInput';
import { calculateEnduranceRank } from '../../utils/calculateEnduranceRank';
import { calculateAverageStrengthRank } from '../../utils/calculateAverageStrength';
import { EnduranceTest, enduranceRankThresholds } from '../../data/enduranceRankThresholds';
import { Rank } from '../../types/Rank';
import RadarChart from '../../components/RadarChart';
import { useAuth } from '../../context/AuthContext';
import { saveUserStats } from '../../utils/saveUserStats';
import { loadUserStats } from '../../utils/loadUserStats';
import { loadUserHistory } from '../../utils/loadUserHistory';
import SubRankDisplay from '../../components/SubRankDisplay';
import { formatRankPercentage } from '../../utils/formatRankPercentage';

const EnduranceStatPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<EnduranceFormData | null>(null);
  const [result, setResult] = useState<Record<EnduranceTest, Rank> | null>(null);
  const [average, setAverage] = useState<{ averageScore: number; globalRank: Rank } | null>(null);
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState<
    (EnduranceFormData & { averageScore: number; globalRank: Rank; timestamp: number; id: string })[]
  >([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const saved = await loadUserStats<EnduranceFormData & { averageScore: number; globalRank: Rank }>(
        user,
        'endurance'
      );

      const allHistory = await loadUserHistory<
        EnduranceFormData & { averageScore: number; globalRank: Rank; id: string; timestamp: number }
      >(user, 'endurance');

      setHistory(allHistory);
      setHistoryIndex(null);

      if (saved) {
        const { averageScore, globalRank, ...inputs } = saved;
        const ranks: Record<EnduranceTest, Rank> = {
          burpees: calculateEnduranceRank('burpees', Number(inputs.burpees)),
          plankHold: calculateEnduranceRank('plankHold', Number(inputs.plankHold)),
          pushUps: calculateEnduranceRank('pushUps', Number(inputs.pushUps)),
          jumpRope: calculateEnduranceRank('jumpRope', Number(inputs.jumpRope)),
          wallSit: calculateEnduranceRank('wallSit', Number(inputs.wallSit)),
          runMaxDistance: calculateEnduranceRank('runMaxDistance', Number(inputs.runMaxDistance)),
        };

        setFormData(inputs);
        setResult(ranks);
        setAverage({ averageScore, globalRank });
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (data: EnduranceFormData) => {
    const ranks: Record<EnduranceTest, Rank> = {
      burpees: calculateEnduranceRank('burpees', Number(data.burpees)),
      plankHold: calculateEnduranceRank('plankHold', Number(data.plankHold)),
      pushUps: calculateEnduranceRank('pushUps', Number(data.pushUps)),
      jumpRope: calculateEnduranceRank('jumpRope', Number(data.jumpRope)),
      wallSit: calculateEnduranceRank('wallSit', Number(data.wallSit)),
      runMaxDistance: calculateEnduranceRank('runMaxDistance', Number(data.runMaxDistance)),
    };

    const averageResult = calculateAverageStrengthRank(Object.values(ranks));
    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);
    setHistoryIndex(null);

    if (user) {
      await saveUserStats(user, 'endurance', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });

      const updatedHistory = await loadUserHistory<
        EnduranceFormData & { averageScore: number; globalRank: Rank; id: string; timestamp: number }
      >(user, 'endurance');

      setHistory(updatedHistory);
    }
  };

  const updateFromSnapshot = (index: number) => {
    const snapshot = history[index];
    if (!snapshot) return;

    const { averageScore, globalRank, ...inputs } = snapshot;

    const ranks: Record<EnduranceTest, Rank> = {
      burpees: calculateEnduranceRank('burpees', Number(inputs.burpees)),
      plankHold: calculateEnduranceRank('plankHold', Number(inputs.plankHold)),
      pushUps: calculateEnduranceRank('pushUps', Number(inputs.pushUps)),
      jumpRope: calculateEnduranceRank('jumpRope', Number(inputs.jumpRope)),
      wallSit: calculateEnduranceRank('wallSit', Number(inputs.wallSit)),
      runMaxDistance: calculateEnduranceRank('runMaxDistance', Number(inputs.runMaxDistance)),
    };

    setFormData(inputs);
    setResult(ranks);
    setAverage({ averageScore, globalRank });
    setHistoryIndex(index);
  };

  const goToPreviousSnapshot = () => {
    if (historyIndex !== null && historyIndex > 0) {
      updateFromSnapshot(historyIndex - 1);
    } else if (historyIndex === null && history.length > 0) {
      updateFromSnapshot(history.length - 1);
    }
  };

  const goToNextSnapshot = () => {
    if (historyIndex !== null) {
      if (historyIndex < history.length - 1) {
        updateFromSnapshot(historyIndex + 1);
      } else {
        const restoreCurrent = async () => {
          if (!user) return;
          const saved = await loadUserStats<EnduranceFormData & { averageScore: number; globalRank: Rank }>(
            user,
            'endurance'
          );
          if (saved) {
            const { averageScore, globalRank, ...inputs } = saved;
            const ranks: Record<EnduranceTest, Rank> = {
              burpees: calculateEnduranceRank('burpees', Number(inputs.burpees)),
              plankHold: calculateEnduranceRank('plankHold', Number(inputs.plankHold)),
              pushUps: calculateEnduranceRank('pushUps', Number(inputs.pushUps)),
              jumpRope: calculateEnduranceRank('jumpRope', Number(inputs.jumpRope)),
              wallSit: calculateEnduranceRank('wallSit', Number(inputs.wallSit)),
              runMaxDistance: calculateEnduranceRank('runMaxDistance', Number(inputs.runMaxDistance)),
            };

            setFormData(inputs);
            setResult(ranks);
            setAverage({ averageScore, globalRank });
            setHistoryIndex(null);
          }
        };
        restoreCurrent();
      }
    }
  };

  if (loading) return <p className="text-center mt-10 text-[#64ffda]">Loading saved data...</p>;

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#64ffda]">
        Endurance Stat Assessment
      </h1>

      <EnduranceInput onSubmit={handleSubmit} initialData={formData ?? undefined} />

      {result && (
        <div className="mt-10 bg-[#112240] p-6 rounded-lg shadow-lg border border-[#233554]">
          <h2 className="text-xl font-semibold mb-4 text-[#64ffda]">
            Your Endurance Ranks
          </h2>

          {history.length > 1 && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={goToPreviousSnapshot}
                disabled={historyIndex === 0 && history.length > 1}
                className="bg-[#112240] text-[#64ffda] px-3 py-1 rounded border border-[#233554] 
                  hover:bg-[#1a2d4a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-400">
                {historyIndex === null
                  ? 'Viewing: Current Stats'
                  : `Viewing: Snapshot ${historyIndex + 1} of ${history.length}`}
              </span>
              <button
                onClick={goToNextSnapshot}
                disabled={historyIndex === null && !formData}
                className="bg-[#112240] text-[#64ffda] px-3 py-1 rounded border border-[#233554] 
                  hover:bg-[#1a2d4a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}

          <RadarChart data={result} />

          {historyIndex !== null && history[historyIndex]?.timestamp && (
            <p className="text-sm text-center text-gray-500 mt-2">
              Snapshot from{' '}
              {new Date(history[historyIndex].timestamp).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(result).map(([testKey]) => {
              const value = formData?.[testKey as keyof EnduranceFormData];
              const thresholds = enduranceRankThresholds[testKey as EnduranceTest];

              return (
                <li
                  key={testKey}
                  className="flex justify-between items-center border-b border-[#233554] py-2"
                >
                  <span className="capitalize whitespace-nowrap text-gray-300">
                    {testKey.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
                  </span>
                  {value !== undefined && thresholds ? (
                    <SubRankDisplay value={Number(value)} thresholds={thresholds} />
                  ) : (
                    <span className="text-gray-500">No data</span>
                  )}
                </li>
              );
            })}
          </ul>

          {average && (
            <div className="mt-6 text-center">
              <p className="text-lg">
                <span className="font-semibold text-[#64ffda]">
                  Average Endurance Score:
                </span>{' '}
                {formatRankPercentage(average.averageScore)}
              </p>
              <p className="text-xl mt-1">
                <span className="font-bold text-[#64ffda]">Global Rank:</span>{' '}
                {average.globalRank}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnduranceStatPage;
