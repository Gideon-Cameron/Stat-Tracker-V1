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
    <div className="mx-auto max-w-7xl px-6 py-6 text-slate-200">
  
      {/* ===========================================
          RESULTS DASHBOARD
      ============================================ */}
  
      {result && (
        <div className="mb-8 overflow-hidden rounded-3xl border border-cyan-400/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl">
  
          {/* Header */}
  
          <div className="border-b border-slate-700 px-5 py-5">
  
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
  
              <div className="min-w-0">
  
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                  Flexibility Overview
                </h2>
  
                <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
                  Your current flexibility across all major mobility categories.
                </p>
  
              </div>
  
              {history.length > 0 && (
  
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
  
                  <button
                    onClick={goToPreviousSnapshot}
                    disabled={
                      history.length === 0 ||
                      (historyIndex !== null && historyIndex === 0)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-800
                      px-5
                      py-3
                      text-sm
                      transition
                      hover:bg-slate-700
                      disabled:opacity-40
                      sm:w-auto
                    "
                  >
                    ← Previous
                  </button>
  
                  <span className="text-center text-xs text-slate-400 sm:min-w-[110px]">
                    {historyIndex === null
                      ? "Current Stats"
                      : `Snapshot ${historyIndex + 1} of ${history.length}`}
                  </span>
  
                  <button
                    onClick={goToNextSnapshot}
                    disabled={history.length === 0}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-800
                      px-5
                      py-3
                      text-sm
                      transition
                      hover:bg-slate-700
                      disabled:opacity-40
                      sm:w-auto
                    "
                  >
                    Next →
                  </button>
  
                </div>
  
              )}
  
            </div>
  
          </div>
  
          {/* Dashboard */}
  
          <div className="grid gap-5 p-5 lg:grid-cols-[1.7fr_1fr]">
  
            {/* Radar Chart */}
  
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
              <RadarChart data={result} />
            </div>
  
            {/* Category Grades */}
  
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
  
              <h3 className="mb-5 text-lg font-bold text-white">
                Category Grades
              </h3>
  
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
  
                {Object.entries(result).map(([test]) => {
                  const currentValue =
                    formData?.[test as keyof FlexibilityFormData] ?? "";
  
                  const prevSnapshot =
                    historyIndex !== null && historyIndex > 0
                      ? history[historyIndex - 1]
                      : null;
  
                  const previousValue =
                    prevSnapshot?.[
                      test as keyof FlexibilityFormData
                    ] ?? "";
  
                  const difference =
                    Number(currentValue) - Number(previousValue);
  
                  return (
                    <div
                      key={test}
                      className="rounded-lg border border-slate-700 bg-slate-800/30 p-3"
                    >
  
                      <div className="mb-2">
  
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          {test.replace(/([A-Z])/g, " $1")}
                        </p>
  
                      </div>
  
                      <div className="flex items-center justify-between">
  
                        <SubRankDisplay
                          value={Number(currentValue)}
                          thresholds={
                            flexibilityRankThresholds[
                              test as FlexibilityTest
                            ]
                          }
                        />
  
                        {prevSnapshot && difference !== 0 && (
                          <span
                            className={`text-xs font-semibold ${
                              difference > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {difference > 0
                              ? `↑ +${difference}`
                              : `↓ ${difference}`}
                          </span>
                        )}
  
                      </div>
  
                    </div>
                  );
                })}
  
              </div>
  
            </div>
  
          </div>
  
          {/* Bottom Cards */}
  
          {average && (
  
            <div className="grid gap-4 border-t border-slate-700 p-5 md:grid-cols-2">
  
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">
  
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Overall Rank
                </p>
  
                <h2 className="mt-2 text-5xl font-black text-cyan-400">
                  {average.globalRank}
                </h2>
  
                <p className="mt-1 text-sm text-slate-400">
                  Average Score{" "}
                  <span className="font-semibold text-white">
                    {formatRankPercentage(average.averageScore)}
                  </span>
                </p>
  
              </div>
  
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">
  
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  More Flexible Than
                </p>
  
                <h2 className="mt-2 text-4xl font-black text-cyan-400">
                  {formatRankPercentage(average.averageScore)}
                </h2>
  
                <p className="mt-1 text-sm text-slate-400">
                  of people worldwide
                </p>
  
              </div>
  
            </div>
  
          )}
  
        </div>
      )}
  
      {/* ===========================================
          INPUT SECTION
      ============================================ */}
  
      <div className="mb-8 text-center">
  
        <h1 className="text-5xl font-black text-white">
          Flexibility Assessment
        </h1>
  
        <p className="mt-3 text-slate-400">
          Enter your mobility measurements below to calculate your flexibility ranking.
        </p>
  
      </div>
  
      <div className="scroll-mt-32">
  
        <FlexibilityInput
          onSubmit={handleSubmit}
          initialData={formData ?? undefined}
        />
  
      </div>
  
    </div>
  );
};

export default FlexibilityPage;
