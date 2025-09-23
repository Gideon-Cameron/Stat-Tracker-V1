import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

const MainTutorial: React.FC = () => {
  const [run, setRun] = useState(false);

  const steps: Step[] = [
    {
      target: "body",
      placement: "center",
      content:
        "👋 Welcome to your personalized stat tracker! Here you can see how you rank on a global scale.",
      disableBeacon: true,
    },
    {
      target: "#main-graph",
      content: (
        <div>
          <p>
            This is your <strong>global ranking chart</strong>. Each axis
            represents a fitness category (strength, endurance, speed, etc.).
          </p>
          <p className="mt-2">
            Ranks are calculated based on global averages:
            <br />
            <strong>E</strong> = top 50% • <strong>D</strong> = top 40% •{" "}
            <strong>C</strong> = top 30% • <strong>B</strong> = top 20% •{" "}
            <strong>A</strong> = top 10% • <strong>S</strong> = top 1% •{" "}
            <strong>SS</strong> = top 0.1% • <strong>Mythic</strong> = top
            0.01%.
          </p>
        </div>
      ),
    },
    {
      target: "#strength-link",
      content:
        "Ready to get started? Click here to enter your stats and see your first strength ranking!",
    },
  ];

  useEffect(() => {
    const hasSeen = localStorage.getItem("seenMainTutorial");
    if (!hasSeen) {
      setRun(true);
      localStorage.setItem("seenMainTutorial", "true");
    }
  }, []);

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep
      scrollOffset={150} // ✅ keeps step centered & visible
      spotlightClicks
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#52e0c4",
          backgroundColor: "#0a192f",
          textColor: "#ccd6f6",
        },
        buttonNext: {
          backgroundColor: "#52e0c4",
          color: "#0a192f",
        },
        buttonBack: {
          color: "#8892b0",
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

export default MainTutorial;
