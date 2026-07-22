import React, { useEffect, useState } from "react";
import SkillInput, { SkillFormData } from "../../components/statInputs/SkillInput";
import { SkillTest } from "../../data/skillRankThresholds";
import { Rank } from "../../types/Rank";
import { calculateSkillRank } from "../../utils/calculateSkillRank";
import { calculateAverageSkillRank } from "../../utils/calculateAverageSkill";
import RadarChart from "../../components/RadarChart";
import { useAuth } from "../../context/AuthContext";
import { loadUserStats } from "../../utils/loadUserStats";
import { saveUserStats } from "../../utils/saveUserStats";
import { loadUserHistory } from "../../utils/loadUserHistory";
import { formatRankPercentage } from "../../utils/formatRankPercentage";


const VALID_TEST_KEYS: SkillTest[] = [
  "pushSkill",
  "pullSkill",
  "handstandSkill",
  "coreSkill",
  "legSkill",
  "leverSkill",
];

const SkillStatPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<SkillFormData | null>(null);
  const [result, setResult] = useState<Record<SkillTest, Rank> | null>(null);
  const [average, setAverage] = useState<{ averageScore: number; globalRank: Rank } | null>(null);
  const [loading, setLoading] = useState(true);

  const [history, setHistory] = useState<
    (SkillFormData & { averageScore: number; globalRank: Rank; timestamp: number; id: string })[]
  >([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [currentSnapshot, setCurrentSnapshot] = useState<{
    result: Record<SkillTest, Rank>;
    average: { averageScore: number; globalRank: Rank };
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const saved = await loadUserStats<
          SkillFormData & { averageScore: number; globalRank: Rank }
        >(user, "skill");

        const allHistory = await loadUserHistory<
          SkillFormData & { averageScore: number; globalRank: Rank; id: string }
        >(user, "skill");

        setHistory(allHistory);
        setHistoryIndex(null);

        if (saved) {
          const { averageScore, globalRank, ...inputs } = saved;
          const ranks: Record<SkillTest, Rank> = VALID_TEST_KEYS.reduce((acc, key) => {
            acc[key] = calculateSkillRank(key, inputs[key]);
            return acc;
          }, {} as Record<SkillTest, Rank>);

          setFormData(inputs);
          setResult(ranks);
          setAverage({ averageScore, globalRank });
          setCurrentSnapshot({ result: ranks, average: { averageScore, globalRank } });
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (data: SkillFormData) => {
    const ranks: Record<SkillTest, Rank> = VALID_TEST_KEYS.reduce((acc, key) => {
      acc[key] = calculateSkillRank(key, data[key]);
      return acc;
    }, {} as Record<SkillTest, Rank>);

    const averageResult = calculateAverageSkillRank(Object.values(ranks));
    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);
    setHistoryIndex(null);
    setCurrentSnapshot({ result: ranks, average: averageResult });

    if (user) {
      await saveUserStats(user, "skill", {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });

      const updatedHistory = await loadUserHistory<
        SkillFormData & { averageScore: number; globalRank: Rank; id: string }
      >(user, "skill");

      setHistory(updatedHistory);
      setHistoryIndex(null);
    }
  };

  const updateFromSnapshot = (index: number) => {
    const snapshot = history[index];
    if (!snapshot) return;

    const { averageScore, globalRank, ...inputs } = snapshot;
    const ranks: Record<SkillTest, Rank> = VALID_TEST_KEYS.reduce((acc, key) => {
      acc[key] = calculateSkillRank(key, inputs[key]);
      return acc;
    }, {} as Record<SkillTest, Rank>);

    setResult(ranks);
    setAverage({ averageScore, globalRank });
    setHistoryIndex(index);
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
        setHistoryIndex(null);
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-[#64ffda]">Loading saved data...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-6 text-slate-200">
  
      {/* ===========================================
          RESULTS DASHBOARD
      ============================================ */}
  
      {result && (
        <div
          className="mb-8 overflow-hidden rounded-3xl border border-cyan-400/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl"
        >
  
          {/* Header */}
  
          <div className="border-b border-slate-700 px-5 py-5">
  
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
  
              <div className="min-w-0">
  
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                  Skill Overview
                </h2>
  
                <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
                  Your current performance across all major skill categories.
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
  
                {Object.entries(result).map(([test, rank]) => (
  
                  <div
                    key={test}
                    className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/30 px-3 py-3"
                  >
  
                    <div>
  
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {test.replace(/([A-Z])/g, " $1")}
                      </p>
  
                    </div>
  
                    <span className="text-lg font-bold text-cyan-400">
                      {rank}
                    </span>
  
                  </div>
  
                ))}
  
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
                  More Skilled Than
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
          Skill Assessment
        </h1>
  
        <p className="mt-3 text-slate-400">
          Enter your skill levels below to calculate your global ranking.
        </p>
  
      </div>
  
      <SkillInput
        onSubmit={handleSubmit}
        initialData={formData ?? undefined}
      />
  
    </div>
  );
};

export default SkillStatPage;
