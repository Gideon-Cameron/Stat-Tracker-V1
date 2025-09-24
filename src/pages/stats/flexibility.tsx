import React, { useEffect, useState } from 'react';
import FlexibilityInput, { FlexibilityFormData } from '../../components/statInputs/FlexibilityInput';
import { calculateFlexibilityRank } from '../../utils/calculateFlexibilityRank';
import { calculateAverageFlexibilityRank } from '../../utils/calculateAverageFlexibility';
import { FlexibilityTest, flexibilityRankThresholds } from '../../data/flexibilityRankThresholds';
import { Rank } from '../../types/Rank';
import RadarChart from '../../components/RadarChart';
import { useAuth } from '../../context/AuthContext';
import { saveUserStats } from '../../utils/saveUserStats';
import { loadUserStats } from '../../utils/loadUserStats';
import { loadUserHistory } from '../../utils/loadUserHistory';
import SubRankDisplay from '../../components/SubRankDisplay';
import { formatRankPercentage } from '../../utils/formatRankPercentage';

const VALID_TEST_KEYS: FlexibilityTest[] = [
  'frontSplitLeft',
  'frontSplitRight',
  'middleSplit',
  'toeTouch',
  'wallReach',
  'pancakeFold',
  'bridgeDepth',
];

const FlexibilityPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FlexibilityFormData | null>(null);
  const [result, setResult] = useState<Record<FlexibilityTest, Rank> | null>(null);
  const [average, setAverage] = useState<{ averageScore: number; globalRank: Rank } | null>(null);
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState<
    (FlexibilityFormData & { averageScore: number; globalRank: Rank; timestamp: number; id: string })[]
  >([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [currentSnapshot, setCurrentSnapshot] = useState<{
    result: Record<FlexibilityTest, Rank>;
    average: { averageScore: number; globalRank: Rank };
    formData?: FlexibilityFormData;
  } | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const saved = await loadUserStats<FlexibilityFormData & { averageScore: number; globalRank: Rank }>(
        user,
        'flexibility'
      );

      const allHistory = await loadUserHistory<FlexibilityFormData & {
        averageScore: number;
        globalRank: Rank;
        id: string;
        timestamp: number;
      }>(user, 'flexibility');

      setHistory(allHistory);
      setHistoryIndex(null);

      if (saved) {
        const { averageScore, globalRank, ...inputs } = saved;

        const ranks: Record<FlexibilityTest, Rank> = VALID_TEST_KEYS.reduce((acc, key) => {
          acc[key] = calculateFlexibilityRank(key, Number(inputs[key]));
          return acc;
        }, {} as Record<FlexibilityTest, Rank>);

        setFormData(inputs);
        setResult(ranks);
        setAverage({ averageScore, globalRank });
        setCurrentSnapshot({ result: ranks, average: { averageScore, globalRank }, formData: inputs });
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (data: FlexibilityFormData) => {
    const ranks: Record<FlexibilityTest, Rank> = VALID_TEST_KEYS.reduce((acc, key) => {
      acc[key] = calculateFlexibilityRank(key, Number(data[key]));
      return acc;
    }, {} as Record<FlexibilityTest, Rank>);

    const averageResult = calculateAverageFlexibilityRank(Object.values(ranks));

    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);
    setHistoryIndex(null);
    setCurrentSnapshot({ result: ranks, average: averageResult, formData: data });

    if (user) {
      await saveUserStats(user, 'flexibility', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });

      const updatedHistory = await loadUserHistory<FlexibilityFormData & {
        averageScore: number;
        globalRank: Rank;
        id: string;
      }>(user, 'flexibility');

      setHistory(updatedHistory);
      setHistoryIndex(null);
    }
  };

  const updateFromSnapshot = (index: number) => {
    const snapshot = history[index];
    if (!snapshot) return;

    const { averageScore, globalRank, ...inputs } = snapshot;

    try {
      const ranks: Record<FlexibilityTest, Rank> = VALID_TEST_KEYS.reduce((acc, key) => {
        acc[key] = calculateFlexibilityRank(key, Number(inputs[key]));
        return acc;
      }, {} as Record<FlexibilityTest, Rank>);

      setFormData(inputs);
      setResult(ranks);
      setAverage({ averageScore, globalRank });
      setHistoryIndex(index);
    } catch (err) {
      console.error('[❌ Error processing snapshot]', err);
    }
  };

  const goToPreviousSnapshot = () => {
    if (historyIndex === null && history.length > 0) {
      updateFromSnapshot(history.length - 1);
    } else if (historyIndex !== null && historyIndex > 0) {
      updateFromSnapshot(historyIndex - 1);
    }
  };

  const goToNextSnapshot = () => {
    if (historyIndex !== null) {
      if (historyIndex < history.length - 1) {
        updateFromSnapshot(historyIndex + 1);
      } else {
        setResult(currentSnapshot?.result ?? null);
        setAverage(currentSnapshot?.average ?? null);
        setFormData(currentSnapshot?.formData ?? null);
        setHistoryIndex(null);
      }
    }
  };

  if (loading) return <p className="text-center mt-10 text-[#64ffda]">Loading saved data...</p>;

  return (
    <div className="py-10 px-6 max-w-4xl mx-auto text-[#ccd6f6]">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#64ffda]">Flexibility Stat Assessment</h1>

      <div className="mb-10">
        <FlexibilityInput onSubmit={handleSubmit} initialData={formData ?? undefined} />
      </div>

      {result && (
        <div className="mt-10 bg-[#0a192f] p-6 rounded-lg shadow-lg border border-[#233554]">
          <h2 className="text-xl font-semibold mb-4 text-[#64ffda]">Your Flexibility Ranks</h2>

          {history.length > 0 && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={goToPreviousSnapshot}
                disabled={history.length === 0 || (historyIndex !== null && historyIndex === 0)}
                className="bg-[#112240] border border-[#233554] text-[#ccd6f6] px-3 py-1 rounded hover:bg-[#1d2d50] disabled:opacity-50 transition"
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
                disabled={history.length === 0}
                className="bg-[#112240] border border-[#233554] text-[#ccd6f6] px-3 py-1 rounded hover:bg-[#1d2d50] disabled:opacity-50 transition"
              >
                Next →
              </button>
            </div>
          )}

          <RadarChart data={result} />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(result).map(([test]) => {
              const currentValue = formData?.[test as keyof FlexibilityFormData] ?? '';
              const prevSnapshot =
                historyIndex !== null && historyIndex > 0 ? history[historyIndex - 1] : null;
              const previousValue = prevSnapshot?.[test as keyof FlexibilityFormData] ?? '';
              const difference = Number(currentValue) - Number(previousValue);

              return (
                <li
                  key={test}
                  className="flex justify-between items-center border-b border-[#233554] py-2"
                >
                  <span className="capitalize whitespace-nowrap text-[#ccd6f6]">
                    {test.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="ml-4 flex items-center gap-2">
                    <SubRankDisplay
                      value={Number(currentValue)}
                      thresholds={flexibilityRankThresholds[test as FlexibilityTest]}
                    />
                    {prevSnapshot && difference !== 0 && (
                      <span
                        className={`text-sm ${
                          difference > 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {difference > 0 ? `↑ (+${difference})` : `↓ (${difference})`}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          {average && (
            <div className="mt-6 text-center">
              <p className="text-lg">
                <span className="font-semibold text-[#64ffda]">Average Flexibility Score:</span>{' '}
                {formatRankPercentage(average.averageScore)}
              </p>
              <p className="text-xl mt-1">
                <span className="font-bold text-[#64ffda]">Global Rank:</span> {average.globalRank}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlexibilityPage;
