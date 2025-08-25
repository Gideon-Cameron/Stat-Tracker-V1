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
    <div className="py-10 px-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#64ffda]">
        Skill Stat Assessment
      </h1>

      {/* ✅ This renders all dropdowns (tooltips come from inside SkillInput) */}
      <SkillInput onSubmit={handleSubmit} initialData={formData ?? undefined} />

      {result && (
        <div className="mt-10 bg-[#112240] p-6 rounded-lg shadow-lg border border-[#233554]">
          <h2 className="text-xl font-semibold mb-4 text-[#64ffda]">Your Skill Ranks</h2>

          {history.length > 0 && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={goToPreviousSnapshot}
                disabled={history.length === 0 || (historyIndex !== null && historyIndex === 0)}
                className="bg-[#233554] text-white px-3 py-1 rounded hover:bg-[#64ffda] hover:text-black transition disabled:opacity-50 disabled:hover:bg-[#233554] disabled:hover:text-white"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-400">
                {historyIndex === null
                  ? "Viewing: Current Stats"
                  : `Viewing: Snapshot ${historyIndex + 1} of ${history.length}`}
              </span>
              <button
                onClick={goToNextSnapshot}
                disabled={history.length === 0}
                className="bg-[#233554] text-white px-3 py-1 rounded hover:bg-[#64ffda] hover:text-black transition disabled:opacity-50 disabled:hover:bg-[#233554] disabled:hover:text-white"
              >
                Next →
              </button>
            </div>
          )}

          <RadarChart data={result} />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(result).map(([test, rank]) => (
              <li
                key={test}
                className="flex justify-between items-center border-b border-[#233554] py-2"
              >
                <span className="capitalize whitespace-nowrap">
                  {test.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="font-bold text-[#64ffda] whitespace-nowrap ml-4">{rank}</span>
              </li>
            ))}
          </ul>

          {average && (
            <div className="mt-6 text-center">
              <p className="text-lg">
                <span className="font-semibold text-gray-300">Average Skill Score:</span>{" "}
                {average.averageScore}
              </p>
              <p className="text-xl mt-1">
                <span className="font-bold text-[#64ffda]">Global Rank:</span>{" "}
                {average.globalRank}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillStatPage;
