import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

const StrengthTutorial: React.FC = () => {
  const [run, setRun] = useState(false);

  const steps: Step[] = [
    {
      target: "#strength-input-section",
      content:
        "Start by entering your strength stats. If you’re not sure about some, just enter your best estimation — you can always update them later.",
      disableBeacon: true,
    },
    {
      target: "#submit-button",
      content:
        "Once you’ve filled out your stats, click Submit to calculate your ranks.",
    },
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

  useEffect(() => {
    const hasSeen = localStorage.getItem("seenStrengthTutorial");
    if (!hasSeen) {
      setRun(true);
      localStorage.setItem("seenStrengthTutorial", "true");
    }
  }, []);

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      spotlightClicks
      scrollToFirstStep
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#52e0c4", // slightly darker teal
          backgroundColor: "#0a192f",
          textColor: "#ccd6f6",
        },
        buttonNext: {
          backgroundColor: "#52e0c4", // darker version of your theme button
          color: "#0a192f",
        },
        buttonBack: {
          color: "#8892b0", // softer muted tone for back button
        },
      }}
      locale={{
        back: "Back",
        close: "Close",
        last: "Finish", // changed from "Last"
        next: "Next",
        skip: "Skip",
      }}
    />
  );
};

export default StrengthTutorial;
