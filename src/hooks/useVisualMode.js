import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    setMode(newMode);

    if (replace) {

      setHistory(prev => {
        const newHist = [...prev];
        newHist.pop();
        return [...newHist, newMode];
      });
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };

  const back = () => {

    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const newMode = newHistory[newHistory.length - 1];

      setMode(newMode);
      setHistory(newHistory);
    }
  };

  return { mode: mode, transition: transition, back: back };
};

export default useVisualMode;