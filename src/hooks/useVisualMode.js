import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      // Replace the current mode with the new one
      setMode(newMode);
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      // Add the new mode to the end of the history array
      setMode(newMode);
      setHistory(prev => [...prev, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      // Remove the current mode from the history array
      const newHistory = [...history.slice(0, -1)];
      // Set the mode to the previous item in the history array
      const newMode = newHistory[newHistory.length - 1];
      setMode(newMode);
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}
