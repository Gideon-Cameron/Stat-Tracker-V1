import { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

export type SkillFormData = {
  pushSkill: string;
  pullSkill: string;
  handstandSkill: string;
  coreSkill: string;
  legSkill: string;
  leverSkill: string;
};

type Props = {
  onSubmit: (data: SkillFormData) => void;
  initialData?: SkillFormData;
};

type SkillLevel = {
  label: string;
  value: string;
  description: string;
};

const categories: { name: keyof SkillFormData; label: string; levels: SkillLevel[] }[] = [
    {
      name: 'pushSkill',
      label: 'Push Skill',
      levels: [
        { value: 'standard', label: 'Standard Push-Up', description: 'Regular push-up with chest to floor' },
        { value: 'decline', label: 'Decline Push-Up', description: 'Feet elevated push-up' },
        { value: 'archer', label: 'Archer Push-Up', description: 'Push-up with one arm extended out' },
        { value: 'explosive', label: 'Explosive Push-Up', description: 'Push-up that leaves the ground' },
        { value: 'clap', label: 'Clap Push-Up', description: 'Push-up with a mid-air clap' },
        { value: 'superman', label: 'Superman Push-Up', description: 'Arms & legs leave the ground at once' },
        { value: 'pseudoPlanche', label: 'Pseudo Planche Push-Up', description: 'Push-up with shoulders over hands' },
        { value: 'planche', label: 'Planche Push-Up', description: 'Full-body parallel, no feet on floor' },
      ],
    },
    {
      name: 'pullSkill',
      label: 'Pull Skill',
      levels: [
        { value: 'standard', label: 'Standard Pull-Up', description: 'Chin over bar, full ROM' },
        { value: 'chestToBar', label: 'Chest-to-Bar Pull-Up', description: 'Bar touches chest at top' },
        { value: 'archer', label: 'Archer Pull-Up', description: 'Side-to-side unilateral pull' },
        { value: 'explosive', label: 'Explosive Pull-Up', description: 'Pull fast enough to leave bar' },
        { value: 'high', label: 'High Pull-Up', description: 'Pull to lower chest or waist height' },
        { value: 'muscleUp', label: 'Muscle-Up', description: 'Pull over the bar into dip' },
        { value: 'oneArmAssist', label: 'One-Arm Pull-Up (Assisted)', description: 'One arm with band or support' },
        { value: 'oneArm', label: 'One-Arm Pull-Up', description: 'Strict, no assist' },
      ],
    },
    {
      name: 'handstandSkill',
      label: 'Handstand Skill',
      levels: [
        { value: 'wall5', label: 'Wall Handstand (5s)', description: 'Hold a wall-supported handstand for 5 seconds' },
        { value: 'wall15', label: 'Wall Handstand (15s)', description: 'Hold a wall-supported handstand for 15 seconds' },
        { value: 'free5', label: 'Freestanding Handstand (5s)', description: 'Hold a freestanding handstand for 5 seconds' },
        { value: 'free15', label: 'Freestanding Handstand (15s)', description: 'Hold a freestanding handstand for 15 seconds' },
        { value: 'handstandPushWall', label: 'Wall Handstand Push-Up', description: 'Vertical push-up against wall' },
        { value: 'handstandPushFree', label: 'Freestanding Handstand Push-Up', description: 'Freestanding vertical push-up' },
        { value: 'oneArmAssist', label: 'One-Arm Handstand (Assisted)', description: 'With support or wall assist' },
        { value: 'oneArmFree', label: 'One-Arm Handstand', description: 'Freestanding one-arm handstand' },
      ],
    },
    {
      name: 'coreSkill',
      label: 'Core Skill',
      levels: [
        { value: 'tuck', label: 'Tuck Hold', description: 'Hold knees to chest in compression' },
        { value: 'oneLeg', label: 'One-Leg Tuck Hold', description: 'Extend one leg in tuck position' },
        { value: 'lsit5', label: 'L-Sit (5s)', description: 'Hold an L-sit for 5 seconds' },
        { value: 'lsit15', label: 'L-Sit (15s)', description: 'Hold an L-sit for 15 seconds' },
        { value: 'vsit', label: 'V-Sit', description: 'Hold legs at vertical angle' },
        { value: 'pressAssist', label: 'Press to Handstand (Assisted)', description: 'Enter handstand with support' },
        { value: 'pressFree', label: 'Press to Handstand (Free)', description: 'Enter handstand unaided from floor' },
        { value: 'straddlePlanche', label: 'Straddle Planche', description: 'Straight-arm hold in straddle position' },
      ],
    },
    {
      name: 'legSkill',
      label: 'Leg Skill',
      levels: [
        { value: 'airSquat', label: 'Air Squat', description: 'Standard bodyweight squat' },
        { value: 'jumpSquat', label: 'Jump Squat', description: 'Explosive squat with jump' },
        { value: 'splitSquat', label: 'Split Squat', description: 'Rear-leg elevated squat' },
        { value: 'shrimpSquat', label: 'Shrimp Squat', description: 'Bent-leg squat with knee to floor' },
        { value: 'pistolSquat', label: 'Pistol Squat', description: 'One-leg squat with full depth' },
        { value: 'pistolJump', label: 'Jumping Pistol Squat', description: 'Explosive pistol to jump' },
        { value: 'elevatedPistol', label: 'Elevated Pistol Squat', description: 'One-leg squat with heel below surface' },
        { value: 'pistolToBox', label: 'Pistol to Box Jump', description: 'Jump from pistol to elevated surface' },
      ],
    },
    {
      name: 'leverSkill',
      label: 'Lever Skill',
      levels: [
        { value: 'hollow', label: 'Hollow Body Hold', description: 'Basic core tension hold' },
        { value: 'tuck', label: 'Tuck Front Lever', description: 'Tuck knees, horizontal hold' },
        { value: 'advTuck', label: 'Advanced Tuck Front Lever', description: 'Straighter back, knees slightly out' },
        { value: 'straddle', label: 'Straddle Front Lever', description: 'Legs split out wide in horizontal hold' },
        { value: 'full5', label: 'Full Front Lever (5s)', description: 'Straight body horizontal hold for 5s' },
        { value: 'full15', label: 'Full Front Lever (15s)', description: 'Hold for 15 seconds' },
        { value: 'leverPull', label: 'Lever Pull', description: 'Pull into front lever from hang' },
        { value: 'leverPullups', label: 'Lever Pull-Ups', description: 'Pull-ups while holding front lever' },
      ],
    },
  ];
  

const SkillInput: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<SkillFormData>({
    pushSkill: '',
    pullSkill: '',
    handstandSkill: '',
    coreSkill: '',
    legSkill: '',
    leverSkill: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      {categories.map(({ name, label, levels }) => (
        <div key={name} className="flex flex-col">
          <label className="mb-1 text-sm font-medium flex items-center">
            {label}
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="ml-2 text-blue-600 cursor-help">❓</span>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="right"
                className="bg-black text-white text-xs px-2 py-1 rounded shadow max-w-xs z-50"
              >
                Choose the highest level of progression you've mastered.
              </Tooltip.Content>
            </Tooltip.Root>
          </label>
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select skill level</option>
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
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

export default SkillInput;
