import React from 'react';
import { Link } from 'react-router-dom';

const statCategories = [
  {
    name: 'Strength',
    path: '/stats/strength',
    description: 'Test your raw power and muscular strength across 8 metrics.',
  },
  {
    name: 'Endurance',
    path: '/stats/endurance',
    description: 'Measure your cardiovascular and muscular endurance.',
  },
  {
    name: 'Speed',
    path: '/stats/speed',
    description: 'Test your sprinting, reflexes, and agility across 5 key metrics.',
  },
  {
    name: 'Skill',
    path: '/stats/skill',
    description:
      'Evaluate your control, balance, and bodyweight skills with advanced calisthenics moves.',
  },
  {
    name: 'Flexibility',
    path: '/stats/flexibility',
    description: 'Measure your mobility and joint range across 7 self-testable movements.',
  },
];

const StatsIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a192f] px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#64ffda]">
        Select a Stat Category
      </h1>

      {/* Flex layout */}
      <div className="flex flex-wrap justify-center gap-6">
        {statCategories.map(({ name, path, description }) => (
          <Link
            key={name}
            to={path}
            className="w-full sm:w-[280px] bg-[#112240] p-6 rounded-lg border border-[#233554] shadow-md 
            hover:shadow-lg hover:scale-[1.03] hover:border-[#64ffda] transition-all duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-[#ccd6f6]">{name}</h2>
            <p className="text-sm text-[#8892b0]">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StatsIndex;
