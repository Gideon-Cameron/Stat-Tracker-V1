import { useEffect, useState } from 'react';

export type EnduranceFormData = {
  burpees: string;
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
    burpees: '',
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
    { label: 'Max Burpees (unbroken set)', name: 'burpees' },
    { label: 'Plank Hold (seconds)', name: 'plankHold' },
    { label: 'Push-Ups (1 min)', name: 'pushUps' },
    { label: 'Jump Rope (unbroken reps)', name: 'jumpRope' },
    { label: 'Wall Sit Hold (seconds)', name: 'wallSit' },
    { label: 'Max Distance Run (km)', name: 'runMaxDistance' },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-[#0a192f] rounded-lg shadow-lg border border-[#112240]"
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
            name={field.name}
            id={field.name}
            value={formData[field.name as keyof EnduranceFormData]}
            onChange={handleChange}
            min={0}
            inputMode="numeric"
            className="bg-[#112240] border border-[#233554] text-white px-3 py-2 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-[#64ffda] focus:border-[#64ffda]
              placeholder-gray-400"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-[#64ffda] text-[#0a192f] py-2 px-4 rounded font-semibold 
          hover:bg-teal-300 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default EnduranceInput;
