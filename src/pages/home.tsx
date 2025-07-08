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

  if (loading) return <p className="text-center mt-10">Loading your global stats...</p>;

  const activeSnapshot = historyIndex !== null ? snapshots[historyIndex] : latestSnapshot;

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Fitness Dashboard</h1>

      {activeSnapshot ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Global Rank by Stat Category</h2>

          {snapshots.length > 0 && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={goToPreviousSnapshot}
                disabled={snapshots.length === 0 || (historyIndex !== null && historyIndex >= snapshots.length - 1)}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-600">
                {historyIndex === null
                  ? 'Viewing: Current Stats'
                  : `Viewing: Snapshot ${snapshots.length - historyIndex} of ${snapshots.length}`}
              </span>
              <button
                onClick={goToNextSnapshot}
                disabled={snapshots.length === 0}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}

          <RadarChart data={activeSnapshot.rankMap} />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(activeSnapshot.rankMap).map(([category, rank]) => (
              <li key={category} className="flex justify-between items-center border-b py-2">
                <span className="capitalize whitespace-nowrap">
                  {category.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-bold text-blue-700 whitespace-nowrap ml-4">{rank}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center">
            <p className="text-lg font-medium">
              <span className="text-blue-800 font-bold">Overall Global Rank:</span>{' '}
              {activeSnapshot.globalRank}
            </p>
          </div>

          <div className="mt-8 text-sm text-center text-gray-500">
            <p>Snapshots saved: {snapshots.length}</p>
            <p>Last saved: {new Date(snapshots[0]?.timestamp || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No stats submitted yet.</p>
      )}
    </div>
  );
};

export default Home;
