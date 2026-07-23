import React, { useEffect, useState } from 'react';
import { loadGlobalRanks } from '../utils/loadGlobalRanks';
import { loadGlobalSnapshots } from '../utils/loadGlobalSnapshots';
import { saveGlobalSnapshot } from '../utils/saveGlobalSnapshot';
import { StatCategory } from '../types/StatCategory';
import { useAuth } from '../context/AuthContext';
import { Rank } from '../types/Rank';
import RadarChart from '../components/RadarChart';
import { calculateAverageRank } from '../utils/calculateAverageGeneric';
import { GlobalSnapshot } from '../types/GlobalSnapshot';
import SubRankDisplay from '../components/SubRankDisplay';

import MainTutorial from '../tutorials/MainTutorial';
                          

const Home: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [snapshots, setSnapshots] = useState<GlobalSnapshot[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [latestSnapshot, setLatestSnapshot] = useState<GlobalSnapshot | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const summaries = await loadGlobalRanks(user);
      const rankMap = summaries.reduce((acc, { category, globalRank }) => {
        acc[category] = globalRank;
        return acc;
      }, {} as Record<StatCategory, Rank>);

      const allRanks = Object.values(rankMap);
      const { globalRank, averageScore } = calculateAverageRank(allRanks);

      const currentSnapshot: Omit<GlobalSnapshot, 'id'> = {
        rankMap,
        averageScore,
        globalRank,
        timestamp: Date.now(),
      };

      const history = await loadGlobalSnapshots(user);
      setSnapshots(history);
      setLatestSnapshot(currentSnapshot);
      setHistoryIndex(null);

      const lastSnapshot = history[0];
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const oneWeekPassed = !lastSnapshot || (Date.now() - lastSnapshot.timestamp > oneWeek);
      const hasChanged =
        !lastSnapshot ||
        JSON.stringify(lastSnapshot.rankMap) !== JSON.stringify(currentSnapshot.rankMap);

      if (oneWeekPassed && hasChanged) {
        await saveGlobalSnapshot(user, currentSnapshot);
        const updatedHistory = await loadGlobalSnapshots(user);
        setSnapshots(updatedHistory);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  const updateFromSnapshot = (index: number) => {
    setHistoryIndex(index);
  };

  const goToPreviousSnapshot = () => {
    if (historyIndex === null && snapshots.length > 0) {
      updateFromSnapshot(0);
    } else if (historyIndex !== null && historyIndex < snapshots.length - 1) {
      updateFromSnapshot(historyIndex + 1);
    }
  };

  const goToNextSnapshot = () => {
    if (historyIndex !== null) {
      if (historyIndex > 0) {
        updateFromSnapshot(historyIndex - 1);
      } else {
        setHistoryIndex(null);
      }
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-[#64ffda] text-lg">
        Loading your global stats...
      </p>
    );
  }

  const activeSnapshot = historyIndex !== null ? snapshots[historyIndex] : latestSnapshot;

  return (
    <div className="mx-auto max-w-7xl px-6 py-6 text-slate-200">
  
      <MainTutorial />
  
      <div className="mb-8 text-center">
  
        <h1 className="text-5xl font-black text-white">
          Your Fitness Dashboard
        </h1>
  
        <p className="mt-3 text-slate-400">
          Track your overall fitness ranking across every assessment category.
        </p>
  
      </div>
  
      {activeSnapshot ? (
  
        <div className="overflow-hidden rounded-3xl border border-cyan-400/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl">
  
          {/* ===========================================
              Header
          ============================================ */}
  
          <div className="border-b border-slate-700 px-5 py-5">
  
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
  
              <div>
  
                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  Overall Overview
                </h2>
  
                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                  Your combined ranking across every fitness category.
                </p>
  
              </div>
  
              {snapshots.length > 0 && (
  
                <div className="flex flex-col items-center gap-3 sm:flex-row">
  
                  <button
                    onClick={goToPreviousSnapshot}
                    disabled={
                      snapshots.length === 0 ||
                      (historyIndex !== null &&
                        historyIndex >= snapshots.length - 1)
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
  
                  <span className="text-center text-xs text-slate-400 sm:min-w-[120px]">
                    {historyIndex === null
                      ? "Current Stats"
                      : `Snapshot ${snapshots.length - historyIndex} of ${snapshots.length}`}
                  </span>
  
                  <button
                    onClick={goToNextSnapshot}
                    disabled={snapshots.length === 0}
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
  
          {/* ===========================================
              Dashboard
          ============================================ */}
  
          <div className="grid gap-5 p-5 lg:grid-cols-[1.7fr_1fr]">
  
            {/* Radar */}
  
            <div
              id="main-graph"
              className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4"
            >
              <RadarChart data={activeSnapshot.rankMap} />
            </div>
  
            {/* Category Grades */}

<div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">

<h3 className="mb-5 text-lg font-bold text-white">
  Category Grades
</h3>

<div className="grid grid-cols-2 gap-x-5 gap-y-4">

  {Object.entries(activeSnapshot.rankMap).map(([category, rank]) => {

    const displayThresholds = [
      {
        min: 0,
        rank: rank as Rank,
      },
    ];

    return (
      <div
        key={category}
        className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/30 px-3 py-3"
      >

        <div>

          <p className="text-xs uppercase tracking-wide text-slate-500">
            {category.replace(/([A-Z])/g, " $1")}
          </p>

        </div>

        <SubRankDisplay
          value={1}
          thresholds={displayThresholds}
        />

      </div>
    );
  })}

</div>

</div>
  
          </div>
  
          {/* ===========================================
              Bottom Cards
          ============================================ */}
  
          <div className="grid gap-4 border-t border-slate-700 p-5 md:grid-cols-2">
  
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">
  
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Overall Rank
              </p>
  
              <h2 className="mt-2 text-5xl font-black text-cyan-400">
                {activeSnapshot.globalRank}
              </h2>
  
              <p className="mt-1 text-sm text-slate-400">
                Your combined fitness ranking.
              </p>
  
            </div>
  
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">
  
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Snapshot History
              </p>
  
              <h2 className="mt-2 text-4xl font-black text-cyan-400">
                {snapshots.length}
              </h2>
  
              <p className="mt-1 text-sm text-slate-400">
                Last saved{" "}
                {new Date(
                  snapshots[0]?.timestamp || Date.now()
                ).toLocaleDateString()}
              </p>
  
            </div>
  
          </div>
  
        </div>
  
      ) : (
  
        <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-12 text-center">
  
          <h2 className="text-3xl font-bold text-white">
            No Fitness Data Yet
          </h2>
  
          <p className="mt-3 text-slate-400">
            Complete your first assessment to build your fitness dashboard.
          </p>
  
        </div>
  
      )}
  
    </div>
  );
};

export default Home;
