import React from 'react';
import { Goal } from '../../types/Goal';
import { format } from 'date-fns';

interface GoalCardProps {
  goal: Goal;
  onMarkComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onMarkComplete, onEdit }) => {
  const isPastDue = new Date(goal.dueDate) < new Date();
  const progress = goal.currentValue && goal.targetValue
    ? Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{goal.statLabel}</h2>
        {goal.completed && (
          <span className="text-green-600 text-sm font-semibold">✅ Completed</span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-1">
        🎯 Target: <strong>{goal.targetValue}</strong>
      </p>

      {goal.currentValue !== undefined && (
        <p className="text-sm text-gray-600 mb-2">
          📊 Current: <strong>{goal.currentValue}</strong> ({progress}%)
        </p>
      )}

      <p className={`text-sm mb-2 ${isPastDue ? 'text-red-500' : 'text-gray-600'}`}>
        ⏰ Due: {format(new Date(goal.dueDate), 'MMM d, yyyy')}
      </p>

      {goal.note && (
        <p className="text-xs italic text-gray-500 mb-2">📝 {goal.note}</p>
      )}

      {!goal.completed && (
        <div className="flex space-x-2 mt-3">
          {onMarkComplete && (
            <button
              onClick={() => onMarkComplete(goal.id)}
              className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
            >
              Mark Complete
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(goal.id)}
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalCard;
