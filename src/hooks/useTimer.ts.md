import React, { useState } from "react";
const STATUS = {
  ON: "ON",
  OFF: "OFF",
} as const;
type TypeofStatus = typeof STATUS;
type StatusKeys = keyof TypeofStatus;
type StatusValues = TypeofStatus[StatusKeys];
const initialCountDown = {
  hrs: "00",
  mins: "00",
  secs: "00",
};
const addPrefixZero = (num: string) => {
  if (parseInt(num) < 10) {
    return "0" + num;
  }
  return num;
};
const useTimer = () => {
  const [id, setId] = useState<NodeJS.Timer | null>(null);
  const [status, setStatus] = useState<StatusValues>(STATUS.OFF);
  const [countdown, setCountdown] = useState(initialCountDown);
  const start = (durationInSec: number) => {
    if (status === STATUS.ON || id !== null) {
      throw new Error("Another timer is already running");
    }
    if (!durationInSec) {
      throw new Error("Invalid Duration supplied");
    }
    try {
      let timer = durationInSec;
      const thisId = setInterval(() => {
        if (
          countdown.hrs == "00" &&
          countdown.mins == "00" &&
          countdown.secs == "00"
        ) {
          clear();
        }
        const hrs = addPrefixZero(Math.trunc(timer / 3600)?.toString());
        const mins = addPrefixZero(Math.trunc(timer / 60)?.toString());
        const secs = addPrefixZero(Math.trunc(timer % 60)?.toString());
        setCountdown({ hrs, mins, secs });
        if (--timer < 0) {
          clear();
        }
      }, 1000);
      setId(thisId);
      setStatus(STATUS.ON);
      return { ok: true };
    } catch (e) {
      return { ok: false };
    }
  };
  const clear = () => {
    if (id === null || status === STATUS.OFF) {
      return;
    }
    clearInterval(id);
    setStatus(STATUS.OFF);
    setId(null);
    setCountdown(initialCountDown);
    return { ok: true };
  };

  return { start, clear, countdown };
};

export default useTimer;
