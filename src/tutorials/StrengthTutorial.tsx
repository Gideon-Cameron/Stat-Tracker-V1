import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

const StrengthTutorial: React.FC = () => {
  const [run, setRun] = useState(false);

  const steps: Step[] = [
    {
      target: "#benchPress-input",
      content:
        "Start by entering your Bench Press max here. Fill out ALL the fields with your stats, or your best estimation if you’re not sure.",
      disableBeacon: true, // force tutorial to start without requiring click
    },
    {
      target: "#squat-input",
      content: "Next, enter your Squat max in kilograms.",
    },
    {
      target: "#deadlift-input",
      content: "Enter your Deadlift max in kilograms.",
    },
    {
      target: "#overheadPress-input",
      content: "Fill in your Overhead Press numbers.",
    },
    {
      target: "#pullUps-input",
      content: "Record how many Pull-Ups you can do.",
    },
    {
      target: "#pushUps-input",
      content: "Add your Push-Up count.",
    },
    {
      target: "#barHang-input",
      content: "How long can you hang on the bar? Enter in seconds.",
    },
    {
      target: "#plankHold-input",
      content: "How long can you hold a plank? Enter in seconds.",
    },
    {
      target: "#submit-button",
      content: "Once all fields are filled, click Submit to calculate your ranks.",
    },
    {
      target: "#strength-graph",
      content: "Here’s your strength profile graph. Each axis shows one exercise compared to global data.",
    },
    {
      target: "#rank-display",
      content:
        "Your overall rank is shown here. For example, A = top 10% of people, Mythic = top 0.01%.",
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
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#64ffda", // match your theme
          backgroundColor: "#0a192f",
          textColor: "#ccd6f6",
        },
      }}
    />
  );
};

export default StrengthTutorial;
