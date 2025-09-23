import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

type Props = {
  hasResults: boolean; // 👈 passed from strength.tsx
};

const StrengthTutorial: React.FC<Props> = ({ hasResults }) => {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  // Phase 1 steps (before submit)
  const initialSteps: Step[] = [
    {
      target: "#deadlift-input", // 👈 directly points to Deadlift field
      content:
        "Start by entering your stats. If you’re not sure, just put your best estimation — you can always update them later.",
      disableBeacon: true,
    },
    {
      target: "#submit-button",
      content:
        "Once you’ve filled out your stats, click Submit to calculate your ranks.",
    },
  ];

  // Phase 2 steps (after submit)
  const resultSteps: Step[] = [
    {
      target: "#strength-graph",
      content:
        "Here’s your strength profile graph. Each axis shows how you compare globally for different lifts and exercises.",
    },
    {
      target: "#rank-display",
      content:
        "This is your overall strength rank! Ready to get started? See where you stand now and track your progress over time.",
    },
  ];

  // Start tutorial if user hasn’t seen it before
  useEffect(() => {
    const hasSeen = localStorage.getItem("seenStrengthTutorial");
    if (!hasSeen) {
      setSteps(initialSteps);
      setRun(true);
      localStorage.setItem("seenStrengthTutorial", "true");
    }
  }, []);

  // Trigger phase 2 once results are available
  useEffect(() => {
    if (hasResults) {
      setSteps(resultSteps);
      setRun(true);
    }
  }, [hasResults]);

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      spotlightClicks
      scrollToFirstStep
      scrollOffset={window.innerHeight / 4} // 👈 keeps target in view, not at very top
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#52e0c4", // slightly darker teal
          backgroundColor: "#0a192f",
          textColor: "#ccd6f6",
        },
        buttonNext: {
          backgroundColor: "#52e0c4", // darker button version
          color: "#0a192f",
        },
        buttonBack: {
          color: "#8892b0", // softer muted tone
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip",
      }}
    />
  );
};

export default StrengthTutorial;
