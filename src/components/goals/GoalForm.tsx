import React, { useState } from 'react';
import { Goal } from '../../types/Goal';

interface GoalFormProps {
  initialGoal?: Partial<Goal>;
  onSubmit: (goal: Partial<Goal>) => void;
  onCancel?: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ initialGoal = {}, onSubmit, onCancel }) => {
  const [statLabel, setStatLabel] = useState(initialGoal.statLabel || '');
  const [targetValue, setTargetValue] = useState(initialGoal.targetValue?.toString() || '');
  const [dueDate, setDueDate] = useState(initialGoal.dueDate ? initialGoal.dueDate.slice(0, 10) : '');
  const [note, setNote] = useState(initialGoal.note || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statLabel || !targetValue || !dueDate) return;

    onSubmit({
      ...initialGoal,
      statLabel,
      targetValue: parseFloat(targetValue),
      dueDate,
      note,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md border border-gray-200 max-w-md">
      <h2 className="text-xl font-bold mb-4">{initialGoal.id ? 'Edit Goal' : 'Create New Goal'}</h2>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Stat Label</label>
        <input
          type="text"
          value={statLabel}
          onChange={(e) => setStatLabel(e.target.value)}
          placeholder="e.g., Push-ups, Squat PR"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Target Value</label>
        <input
          type="number"
          step="any"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
          placeholder="e.g., 50"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any notes or reminders..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {initialGoal.id ? 'Update Goal' : 'Create Goal'}
        </button>
      </div>
    </form>
  );
};

export default GoalForm;
