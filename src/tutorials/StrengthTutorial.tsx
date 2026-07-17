import React, { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust import

type Props = {
  hasResults: boolean;
};

const StrengthTutorial: React.FC<Props> = ({ hasResults }) => {
  const { user } = useAuth();
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  // Phase 1 steps (before submit)
  const initialSteps: Step[] = [
    {
      target: "#deadlift-input",
      content:
        "Start by entering your stats. If you’re not sure, just put your best estimation — you can always update them later.",
      disableBeacon: true,
    },
    {
      target: "#submit-button",
      content:
        "Once you’ve filled out your stats, click Submit to calculate your ranks.",
      disableBeacon: true,
    },
  ];

  // Phase 2 steps (after submit)
  const resultSteps: Step[] = [
    {
      target: "#strength-graph",
      content:
        "Here’s your strength profile graph. Each axis shows how you compare globally for different lifts and exercises.",
      disableBeacon: true,
    },
    {
      target: "#rank-display",
      content:
        "This is your overall strength rank! Ready to get started? See where you stand now and track your progress over time.",
      disableBeacon: true,
    },
  ];

  useEffect(() => {
    if (!user) return;

    const checkTutorial = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists() && snap.data().seenStrengthTutorial) {
        // ✅ already seen, don’t run
        return;
      }

      // Decide which phase to show depending on results
      const selectedSteps = hasResults ? resultSteps : initialSteps;

      setSteps(selectedSteps);
      setRun(true);

      // save flag so tutorial never runs again
      await setDoc(ref, { seenStrengthTutorial: true }, { merge: true });
    };

    checkTutorial();
  }, [user, hasResults]);

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      spotlightClicks
      scrollToFirstStep
      scrollOffset={window.innerHeight / 4}
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

export default StrengthTutorial;
