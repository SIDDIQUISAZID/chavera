import React, { useEffect, useState } from "react";
interface UseTimeI {
  min?: number;
  sec: number;
}

const useTime = ({ min, sec }: UseTimeI) => {
  const [minutes, setMinutes] = useState<number>(min ?? 0);
  const [seconds, setSeconds] = useState(sec);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  const setTime = ({ min, sec }: UseTimeI) => {
    min && setMinutes(min);
    setSeconds(sec);
  };
  return {
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
    timeLeft: seconds > 0 || minutes > 0,
    setTime,
  };
};

export default useTime;
