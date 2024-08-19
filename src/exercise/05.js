import { useState, useEffect, useRef } from "react";

// Default activity events
const defaultActivityEvents = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
];

export function useIdle(ms, eventTypes = defaultActivityEvents) {
  const [isIdle, setIsIdle] = useState(false);
  const eventTypesRef = useRef(eventTypes); // Use a ref to store eventTypes

  useEffect(() => {
    // Update ref when eventTypes change
    eventTypesRef.current = eventTypes;

    // Set the initial timeout to mark as idle
    let interval = setTimeout(() => setIsIdle(true), ms);

    // Event handler to reset idle timer
    function setActive() {
      setIsIdle(false);
      clearTimeout(interval);
      interval = setTimeout(() => setIsIdle(true), ms);
    }

    // Attach event listeners
    for (const type of eventTypesRef.current) {
      window.addEventListener(type, setActive);
    }

    // Cleanup function
    return function cleanup() {
      for (const type of eventTypesRef.current) {
        window.removeEventListener(type, setActive);
      }
      clearTimeout(interval);
    };
  }, [ms]); // Only depend on ms, not eventTypes

  return isIdle;
}

export default function Idle() {
  const isIdle = useIdle(3000);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>useIdle Demo</h2>
      <h3>
        {isIdle ? (
          <span role="img" aria-label="idle">
            Idle 😴
          </span>
        ) : (
          <span role="img" aria-label="active">
            Active 🤠
          </span>
        )}
      </h3>
    </div>
  );
}
