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
    <form
      id="strength-form" // 👈 form wrapper for tutorial
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-4 bg-[#0a192f] rounded-lg shadow-lg border border-[#233554]"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label
            htmlFor={field.name}
            className="mb-1 text-sm font-medium text-[#64ffda]"
          >
            {field.label}
          </label>
          <input
            type="number"
            id={`${field.name}-input`} // 👈 unique ID for tutorial targeting
            name={field.name}
            value={formData[field.name as keyof StrengthFormData]}
            onChange={handleChange}
            min={0}
            inputMode="numeric"
            className="bg-[#112240] border border-[#233554] text-[#ccd6f6] px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#64ffda] placeholder-gray-500"
          />
        </div>
      ))}
      <button
        id="submit-button" // 👈 tutorial will point here
        type="submit"
        className="w-full bg-[#64ffda] text-[#0a192f] font-semibold py-2 px-4 rounded hover:bg-[#52e0c4] transition"
      >
        Submit
      </button>
    </form>
  );
};

export default StrengthInput;
