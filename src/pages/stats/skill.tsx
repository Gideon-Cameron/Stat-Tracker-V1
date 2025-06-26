import React, { useEffect, useState } from 'react';
import SkillInput, { SkillFormData } from '../../components/statInputs/SkillInput';
import { SkillTest } from '../../data/skillRankThresholds';
import { Rank } from '../../types/Rank';
import { calculateSkillRank } from '../../utils/calculateSkillRank';
import { calculateAverageStrengthRank } from '../../utils/calculateAverageStrength';
import RadarChart from '../../components/RadarChart';
import { useAuth } from '../../context/AuthContext';
import { loadUserStats } from '../../utils/loadUserStats';
import { saveUserStats } from '../../utils/saveUserStats';

const SkillStatPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<SkillFormData | null>(null);
  const [result, setResult] = useState<Record<SkillTest, Rank> | null>(null);
  const [average, setAverage] = useState<{ averageScore: number; globalRank: Rank } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const saved = await loadUserStats<SkillFormData & { averageScore: number; globalRank: Rank }>(user, 'skill');
        if (saved) {
          const { averageScore, globalRank, ...inputs } = saved;
          setFormData(inputs);
          const ranks: Record<SkillTest, Rank> = {
            pushSkill: calculateSkillRank('pushSkill', inputs.pushSkill),
            pullSkill: calculateSkillRank('pullSkill', inputs.pullSkill),
            handstandSkill: calculateSkillRank('handstandSkill', inputs.handstandSkill),
            coreSkill: calculateSkillRank('coreSkill', inputs.coreSkill),
            legSkill: calculateSkillRank('legSkill', inputs.legSkill),
            leverSkill: calculateSkillRank('leverSkill', inputs.leverSkill),
          };
          setResult(ranks);
          setAverage({ averageScore, globalRank });
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (data: SkillFormData) => {
    const ranks: Record<SkillTest, Rank> = {
      pushSkill: calculateSkillRank('pushSkill', data.pushSkill),
      pullSkill: calculateSkillRank('pullSkill', data.pullSkill),
      handstandSkill: calculateSkillRank('handstandSkill', data.handstandSkill),
      coreSkill: calculateSkillRank('coreSkill', data.coreSkill),
      legSkill: calculateSkillRank('legSkill', data.legSkill),
      leverSkill: calculateSkillRank('leverSkill', data.leverSkill),
    };

    const averageResult = calculateAverageStrengthRank(Object.values(ranks));
    setFormData(data);
    setResult(ranks);
    setAverage(averageResult);

    if (user) {
      await saveUserStats(user, 'skill', {
        ...data,
        averageScore: averageResult.averageScore,
        globalRank: averageResult.globalRank,
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading saved data...</p>;
  }

  return (
    <div className="py-10 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Skill Stat Assessment</h1>
      <SkillInput onSubmit={handleSubmit} initialData={formData ?? undefined} />

      {result && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Skill Ranks</h2>

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
                <span className="font-semibold">Average Skill Score:</span> {average.averageScore}
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

export default SkillStatPage;
