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
  const [rankMap, setRankMap] = useState<Record<StatCategory, Rank> | null>(null);
  const [combinedRank, setCombinedRank] = useState<Rank | null>(null); 
  const [snapshots, setSnapshots] = useState<GlobalSnapshot[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const summaries = await loadGlobalRanks(user);
      console.log('[Home] summaries:', summaries);

      const map = summaries.reduce((acc, { category, globalRank }) => {
        acc[category] = globalRank;
        return acc;
      }, {} as Record<StatCategory, Rank>);

      console.log('[Home] rankMap:', map);
      setRankMap(map);

      const allRanks = Object.values(map);
      const { globalRank, averageScore } = calculateAverageRank(allRanks);
      setCombinedRank(globalRank);

      // 💾 Save snapshot if valid
      if (user && Object.keys(map).length > 0) {
        await saveGlobalSnapshot(user, {
          rankMap: map,
          averageScore,
          globalRank,
          timestamp: Date.now(),
        });
      }

      // 📥 Load snapshot history
      const snapshotHistory = await loadGlobalSnapshots(user);
      setSnapshots(snapshotHistory);

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading your global stats...</p>;

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Fitness Dashboard</h1>

      {rankMap ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Global Rank by Stat Category</h2>
          <RadarChart data={rankMap} />

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-6">
            {Object.entries(rankMap).map(([category, rank]) => (
              <li key={category} className="flex justify-between items-center border-b py-2">
                <span className="capitalize whitespace-nowrap">
                  {category.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-bold text-blue-700 whitespace-nowrap ml-4">{rank}</span>
              </li>
            ))}
          </ul>

          {combinedRank && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium">
                <span className="text-blue-800 font-bold">Overall Global Rank:</span> {combinedRank}
              </p>
            </div>
          )}

          {snapshots.length > 0 && (
            <div className="mt-8 text-sm text-center text-gray-500">
              <p>Snapshots saved: {snapshots.length}</p>
              <p>Last saved: {new Date(snapshots[0].timestamp).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">No stats submitted yet.</p>
      )}
    </div>
  );
};

export default Home;