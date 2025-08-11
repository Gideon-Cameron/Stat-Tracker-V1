import React from 'react';
import { Goal } from '../../types/Goal';
import GoalCard from './GoalCard';

interface GoalListProps {
  goals: Goal[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const GoalList: React.FC<GoalListProps> = ({ goals, onComplete, onDelete }) => {
  if (goals.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No goals set yet. Add one now to get started!
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onMarkComplete={onComplete}
          onEdit={onDelete}
        />
      ))}
    </div>
  );
};

export default GoalList;
