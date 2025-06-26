import { useEffect, useState } from 'react';
import { FlexibilityTest } from '../../data/flexibilityRankThresholds';

export type FlexibilityFormData = Record<FlexibilityTest, string>;

type Props = {
  onSubmit: (data: FlexibilityFormData) => void;
  initialData?: FlexibilityFormData;
};

const testFields: { label: string; name: FlexibilityTest }[] = [
  { name: 'frontSplitLeft', label: 'Front Split (Left) %' },
  { name: 'frontSplitRight', label: 'Front Split (Right) %' },
  { name: 'middleSplit', label: 'Middle Split %' },
  { name: 'toeTouch', label: 'Toe Touch %' },
  { name: 'wallReach', label: 'Wall Reach %' },
  { name: 'pancakeFold', label: 'Pancake Fold %' },
  { name: 'bridgeDepth', label: 'Bridge Depth %' },
];

const FlexibilityInput: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<FlexibilityFormData>({
    frontSplitLeft: '',
    frontSplitRight: '',
    middleSplit: '',
    toeTouch: '',
    wallReach: '',
    pancakeFold: '',
    bridgeDepth: '',
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      {testFields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1 text-sm font-medium">
            {field.label}
          </label>
          <input
            type="number"
            name={field.name}
            id={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            min={0}
            max={100}
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

export default FlexibilityInput;
