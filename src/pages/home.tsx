import React, { useEffect, useState } from 'react';
import { loadGlobalRanks } from '../utils/loadGlobalRanks';
import { StatCategory } from '../types/StatCategory';
import { useAuth } from '../context/AuthContext';
import { Rank } from '../types/Rank';
import RadarChart from '../components/RadarChart';
import { calculateAverageRank } from '../utils/calculateAverageGeneric'; // ✅ NEW

const Home: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rankMap, setRankMap] = useState<Record<StatCategory, Rank> | null>(null);
  const [combinedRank, setCombinedRank] = useState<Rank | null>(null); // ✅ NEW

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

      // ✅ Calculate combined rank
      const allRanks = Object.values(map);
      const { globalRank } = calculateAverageRank(allRanks);
      setCombinedRank(globalRank);

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
        </div>
      ) : (
        <p className="text-center text-gray-600">No stats submitted yet.</p>
      )}
    </div>
  );
};

export default Home;
