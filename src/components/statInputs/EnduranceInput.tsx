import { useEffect, useState } from 'react';

export type EnduranceFormData = {
  run1_5Mile: string;
  plankHold: string;
  pushUps: string;
  jumpRope: string;
  wallSit: string;
  runMaxDistance: string;
};

type Props = {
  onSubmit: (data: EnduranceFormData) => void;
  initialData?: EnduranceFormData;
};

const EnduranceInput: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<EnduranceFormData>({
    run1_5Mile: '',
    plankHold: '',
    pushUps: '',
    jumpRope: '',
    wallSit: '',
    runMaxDistance: '',
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
    { label: '1.5-Mile Run (seconds)', name: 'run1_5Mile' },
    { label: 'Plank Hold (seconds)', name: 'plankHold' },
    { label: 'Push-Ups (1 min)', name: 'pushUps' },
    { label: 'Jump Rope (unbroken reps)', name: 'jumpRope' },
    { label: 'Wall Sit Hold (seconds)', name: 'wallSit' },
    { label: 'Max Distance Run (km)', name: 'runMaxDistance' },
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
            value={formData[field.name as keyof EnduranceFormData]}
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

export default EnduranceInput;
