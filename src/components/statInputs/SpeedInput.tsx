import { useEffect, useState } from 'react';

export type SpeedFormData = {
  sprint100m: string;
  run1km: string;
  suicides20m: string;
  rulerDrop: string;
  reactionTime: string;
};

type Props = {
  onSubmit: (data: SpeedFormData) => void;
  initialData?: SpeedFormData;
};

const SpeedInput: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<SpeedFormData>({
    sprint100m: '',
    run1km: '',
    suicides20m: '',
    rulerDrop: '',
    reactionTime: '',
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
    { label: '100m Sprint (seconds)', name: 'sprint100m' },
    { label: '1km Run (seconds)', name: 'run1km' },
    { label: '5 × 20m Suicides (seconds)', name: 'suicides20m' },
    { label: 'Ruler Drop Test (cm)', name: 'rulerDrop' },
    {
      label: 'Reaction Time (ms) — use https://humanbenchmark.com/tests/reactiontime',
      name: 'reactionTime',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1 text-sm font-medium text-[#64ffda]">
            {field.label}
          </label>
          <input
            type="number"
            name={field.name}
            id={field.name}
            value={formData[field.name as keyof SpeedFormData]}
            onChange={handleChange}
            min={0}
            inputMode="numeric"
            className="bg-[#112240] border border-[#233554] text-[#ccd6f6] px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#64ffda] placeholder-gray-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-[#64ffda] text-[#0a192f] font-semibold py-2 px-4 rounded hover:bg-[#52e0c4] transition"
      >
        Submit
      </button>
    </form>
  );
};

export default SpeedInput;
