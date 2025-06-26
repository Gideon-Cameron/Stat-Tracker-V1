import { useEffect, useState } from 'react';

export type StrengthFormData = {
  benchPress: string;
  squat: string;
  deadlift: string;
  overheadPress: string;
  pullUps: string; 
  pushUps: string;
  barHang: string;
  plankHold: string;
};

type Props = {
  onSubmit: (data: StrengthFormData) => void;
  initialData?: StrengthFormData;
};

const StrengthInput: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<StrengthFormData>({
    benchPress: '',
    squat: '',
    deadlift: '',
    overheadPress: '',
    pullUps: '',
    pushUps: '',
    barHang: '',
    plankHold: '',
  });

  // ✅ Load initial data (e.g. from Firestore)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fields = [
    { label: 'Bench Press (kg)', name: 'benchPress' },
    { label: 'Squat (kg)', name: 'squat' },
    { label: 'Deadlift (kg)', name: 'deadlift' },
    { label: 'Overhead Press (kg)', name: 'overheadPress' },
    { label: 'Pull-Ups (reps)', name: 'pullUps' },
    { label: 'Push-Ups (reps)', name: 'pushUps' },
    { label: 'Bar Hang (sec)', name: 'barHang' },
    { label: 'Plank Hold (sec)', name: 'plankHold' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1 text-sm font-medium">
            {field.label}
          </label>
          <input
            type="number"
            name={field.name}
            id={field.name}
            value={formData[field.name as keyof StrengthFormData]}
            onChange={handleChange}
            min={0}
            inputMode="numeric"
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default StrengthInput;
