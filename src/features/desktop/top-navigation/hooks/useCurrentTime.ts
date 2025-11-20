import { useState, useEffect } from "react";

// Format date and time as "Thu Nov 20 2:00 PM"
const formatDateTime = (date: Date): string => {
  const weekday = date.toLocaleString('en-US', { weekday: 'short' });
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  return `${weekday} ${month} ${day} ${time}`;
};

export function useCurrentTime(): string {
  const [currentTime, setCurrentTime] = useState<string>("");

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatDateTime(new Date()));
    };

    // Set initial time
    updateTime();

    // Update every minute
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
}

