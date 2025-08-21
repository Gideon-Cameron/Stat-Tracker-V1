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
      { value: 'standard', label: 'Standard Push-Up', description: 'A regular push-up: hands on the floor, lower your chest all the way down, then push back up.' },
      { value: 'decline', label: 'Decline Push-Up', description: 'Like a regular push-up but with your feet raised on a bench or box, making it harder on the shoulders and chest.' },
      { value: 'archer', label: 'Archer Push-Up', description: 'Push-up where most of the weight is on one arm while the other arm stays straight out to the side for balance.' },
      { value: 'explosive', label: 'Explosive Push-Up', description: 'Push so hard off the ground that your hands leave the floor for a moment.' },
      { value: 'clap', label: 'Clap Push-Up', description: 'An explosive push-up where you clap your hands in the air before catching yourself.' },
      { value: 'superman', label: 'Superman Push-Up', description: 'A very advanced push-up where both hands and feet leave the floor at the same time, body stretched like Superman flying.' },
      { value: 'pseudoPlanche', label: 'Pseudo Planche Push-Up', description: 'Lean your shoulders forward over your hands while doing a push-up, putting more weight on your arms and wrists.' },
      { value: 'planche', label: 'Planche Push-Up', description: 'An elite move: hold your entire body parallel to the ground with only your hands touching, then do push-ups in that position.' },
    ],
  },
  {
    name: 'pullSkill',
    label: 'Pull Skill',
    levels: [
      { value: 'standard', label: 'Standard Pull-Up', description: 'Hang from a bar and pull until your chin rises over it, then lower down with control.' },
      { value: 'chestToBar', label: 'Chest-to-Bar Pull-Up', description: 'Pull higher than a standard pull-up so your chest touches the bar.' },
      { value: 'archer', label: 'Archer Pull-Up', description: 'Pull-up where you shift your body toward one side, using mostly one arm while the other stays more extended.' },
      { value: 'explosive', label: 'Explosive Pull-Up', description: 'Pull with enough force to come off the bar slightly at the top.' },
      { value: 'high', label: 'High Pull-Up', description: 'Pull much higher than usual, aiming to bring the bar to your lower chest or waist.' },
      { value: 'muscleUp', label: 'Muscle-Up', description: 'A pull-up that continues over the bar into a dip, so you end up with your chest above the bar and arms straight.' },
      { value: 'oneArmAssist', label: 'One-Arm Pull-Up (Assisted)', description: 'Pull-up using mostly one arm while the other uses a band or support to help.' },
      { value: 'oneArm', label: 'One-Arm Pull-Up', description: 'A full pull-up using only one arm, no assistance.' },
    ],
  },
  {
    name: 'handstandSkill',
    label: 'Handstand Skill',
    levels: [
      { value: 'wall5', label: 'Wall Handstand (5s)', description: 'Kick up into a handstand against a wall and hold for about 5 seconds.' },
      { value: 'wall15', label: 'Wall Handstand (15s)', description: 'Same as the 5s version, but holding for 15 seconds to build endurance.' },
      { value: 'free5', label: 'Freestanding Handstand (5s)', description: 'Balance in a handstand without using the wall, holding for around 5 seconds.' },
      { value: 'free15', label: 'Freestanding Handstand (15s)', description: 'Balance freely in a handstand for about 15 seconds.' },
      { value: 'handstandPushWall', label: 'Wall Handstand Push-Up', description: 'Upside down against a wall, lower your head toward the floor and push back up, like a vertical push-up.' },
      { value: 'handstandPushFree', label: 'Freestanding Handstand Push-Up', description: 'Do the same vertical push-up motion, but balance freely without the wall.' },
      { value: 'oneArmAssist', label: 'One-Arm Handstand (Assisted)', description: 'Practice holding a handstand mostly on one arm, with the wall or support to help you balance.' },
      { value: 'oneArmFree', label: 'One-Arm Handstand', description: 'An advanced move: hold a handstand using only one arm, no support.' },
    ],
  },
  {
    name: 'coreSkill',
    label: 'Core Skill',
    levels: [
      { value: 'tuck', label: 'Tuck Hold', description: 'Sit on the ground with hands by your sides, lift your legs and pull your knees into your chest, holding your feet off the floor.' },
      { value: 'oneLeg', label: 'One-Leg Tuck Hold', description: 'Same as the tuck hold, but keep one leg straight out while the other stays tucked.' },
      { value: 'lsit5', label: 'L-Sit (5s)', description: 'Support yourself on your hands and hold your legs straight out in front of you like the shape of an “L” for 5 seconds.' },
      { value: 'lsit15', label: 'L-Sit (15s)', description: 'Same as the L-sit hold but lasting 15 seconds.' },
      { value: 'vsit', label: 'V-Sit', description: 'A harder version of the L-sit: hold your legs raised higher so your body forms more of a “V” shape.' },
      { value: 'pressAssist', label: 'Press to Handstand (Assisted)', description: 'From sitting, use support to lift your legs and push your body into a handstand with control.' },
      { value: 'pressFree', label: 'Press to Handstand (Free)', description: 'Do the same transition to handstand without support, lifting yourself smoothly from the floor.' },
      { value: 'straddlePlanche', label: 'Straddle Planche', description: 'Hold your body parallel to the ground, supported only by your arms, with legs spread apart for balance.' },
    ],
  },
  {
    name: 'legSkill',
    label: 'Leg Skill',
    levels: [
      { value: 'airSquat', label: 'Air Squat', description: 'A regular squat using just your body weight: bend your knees and lower down, then stand back up.' },
      { value: 'jumpSquat', label: 'Jump Squat', description: 'Squat down and then jump explosively into the air, landing softly.' },
      { value: 'splitSquat', label: 'Split Squat', description: 'Keep one foot forward and the other behind you on a bench or surface, squat down with the front leg doing most of the work.' },
      { value: 'shrimpSquat', label: 'Shrimp Squat', description: 'Balance on one leg while holding the other foot behind you, lowering down until your back knee nearly touches the floor.' },
      { value: 'pistolSquat', label: 'Pistol Squat', description: 'A one-leg squat with the other leg extended straight out in front as you lower all the way down and stand back up.' },
      { value: 'pistolJump', label: 'Jumping Pistol Squat', description: 'Perform a one-leg squat (pistol squat) and jump explosively at the top.' },
      { value: 'elevatedPistol', label: 'Elevated Pistol Squat', description: 'Do a pistol squat while standing on a raised surface so the free leg can lower below the floor level.' },
      { value: 'pistolToBox', label: 'Pistol to Box Jump', description: 'Perform a pistol squat and then jump onto a box or platform as you come up.' },
    ],
  },
  {
    name: 'leverSkill',
    label: 'Lever Skill',
    levels: [
      { value: 'hollow', label: 'Hollow Body Hold', description: 'Lie on your back, lift your legs and shoulders slightly off the ground, keeping your lower back pressed down.' },
      { value: 'tuck', label: 'Tuck Front Lever', description: 'Hang from a bar and pull your knees to your chest, holding your body horizontal to the ground.' },
      { value: 'advTuck', label: 'Advanced Tuck Front Lever', description: 'Same as the tuck, but extend your back straighter and open your knees slightly for more difficulty.' },
      { value: 'straddle', label: 'Straddle Front Lever', description: 'Hold your body horizontal to the ground with legs spread apart wide, which makes balancing a bit easier.' },
      { value: 'full5', label: 'Full Front Lever (5s)', description: 'Hold your body straight and horizontal while hanging from a bar, keeping it parallel to the floor for 5 seconds.' },
      { value: 'full15', label: 'Full Front Lever (15s)', description: 'Same full front lever but hold the position for 15 seconds.' },
      { value: 'leverPull', label: 'Lever Pull', description: 'From hanging, pull yourself up into a front lever position and lower back down with control.' },
      { value: 'leverPullups', label: 'Lever Pull-Ups', description: 'Do pull-ups while keeping your body locked in the front lever horizontal position.' },
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-4 bg-[#0a192f] rounded-lg shadow-lg border border-[#233554]"
    >
      {categories.map(({ name, label, levels }) => {
        const selectedLevel = levels.find((l) => l.value === formData[name]);

        return (
          <div key={name} className="flex flex-col">
            <label className="mb-1 text-sm font-medium flex items-center text-[#64ffda]">
              {label}
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span className="ml-2 text-[#64ffda] cursor-help">❓</span>
                </Tooltip.Trigger>
                <Tooltip.Content
                  side="right"
                  className="bg-[#112240] text-[#ccd6f6] text-xs px-3 py-2 rounded-md shadow-md border border-[#233554] max-w-xs z-50"
                >
                  Choose the highest level of progression you've mastered.
                </Tooltip.Content>
              </Tooltip.Root>
            </label>

            <div className="flex items-center">
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="bg-[#112240] border border-[#233554] text-[#ccd6f6] px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#64ffda] w-full"
              >
                <option value="">Select skill level</option>
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>

              {selectedLevel && (
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      type="button"
                      className="ml-2 text-[#64ffda] hover:text-[#52e0c4] transition text-sm font-bold cursor-help"
                    >
                      ⓘ
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side="right"
                    className="bg-[#112240] text-[#ccd6f6] text-sm px-4 py-3 rounded-md shadow-md border border-[#233554] max-w-xs leading-relaxed"
                  >
                    {selectedLevel.description}
                  </Tooltip.Content>
                </Tooltip.Root>
              )}
            </div>
          </div>
        );
      })}

      <button
        type="submit"
        className="w-full bg-[#64ffda] text-[#0a192f] font-semibold py-2 px-4 rounded hover:bg-[#52e0c4] transition"
      >
        Submit
      </button>
    </form>
  );
};

export default SkillInput;
