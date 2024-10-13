import { useEffect } from "react";

interface IdleTimerProps {
  timeout: number;
  onTimeout?: () => void;
  onExpired: () => void;
}
//experimental stage
const useIdleTimer = ({ timeout, onTimeout, onExpired }: IdleTimerProps) => {
  useEffect(() => {
    const expiredTime = parseInt(
      localStorage.getItem("_expiredTime") || "0",
      10
    );
    if (expiredTime > 0 && expiredTime < Date.now()) {
      onExpired();
      return;
    }

    const eventHandler = () => updateExpiredTime();

    const startInterval = () => {
      updateExpiredTime();

      const interval = setInterval(() => {
        const expiredTime = parseInt(
          localStorage.getItem("_expiredTime") || "0",
          10
        );
        if (expiredTime < Date.now()) {
          if (onTimeout) {
            onTimeout();
            cleanUp();
          }
        }
      }, 1000);

      return interval;
    };

    const updateExpiredTime = () => {
      let timeoutTracker: NodeJS.Timeout | undefined;

      if (timeoutTracker) {
        clearTimeout(timeoutTracker);
      }

      timeoutTracker = setTimeout(() => {
        localStorage.setItem(
          "_expiredTime",
          String(Date.now() + timeout * 1000)
        );
      }, 300);
    };

    const tracker = () => {
      window.addEventListener("mousemove", eventHandler);
      window.addEventListener("scroll", eventHandler);
      window.addEventListener("keydown", eventHandler);
    };

    const cleanUp = () => {
      localStorage.removeItem("_expiredTime");
      clearInterval(interval);
      window.removeEventListener("mousemove", eventHandler);
      window.removeEventListener("scroll", eventHandler);
      window.removeEventListener("keydown", eventHandler);
    };

    const interval = startInterval();
    tracker();

    return () => {
      cleanUp();
    };
  }, [timeout, onTimeout, onExpired]);
};
export const checkLocalTime = () => {
  const expiredTime = parseInt(localStorage.getItem("_expiredTime") || "0", 10);
  return expiredTime > 0 && expiredTime < Date.now();
};
export const removeLocalTime = () => {
  localStorage.removeItem("_expiredTime");
};

//stable
export class IdleTimerCls {
  private timeout: number;
  private onTimeout?: () => void;
  private eventHandler: (() => void) | undefined;
  private interval: NodeJS.Timeout | undefined;
  private timeoutTracker: NodeJS.Timeout | undefined;

  constructor({ timeout, onTimeout, onExpired }: IdleTimerProps) {
    const timeoutTime = localStorage.getItem("_testTime");
    this.timeout = timeoutTime && !Number.isNaN(parseInt(timeoutTime)) ? parseInt(timeoutTime) : timeout;
    console.log(this.timeout,"this timeout")
    this.onTimeout = onTimeout;

    if (checkLocalTime()) {
      onExpired();
      return;
    }

    this.eventHandler = this.updateExpiredTime.bind(this);
    this.tracker();
    this.startInterval();
  }

  private startInterval() {
    this.updateExpiredTime();

    this.interval = setInterval(() => {
      const expiredTime = parseInt(
        localStorage.getItem("_expiredTime") || "0",
        10
      );
      if (expiredTime < Date.now()) {
        if (this.onTimeout) {
          this.onTimeout();
          this.cleanUp();
        }
      }
    }, 1000);
  }

  private updateExpiredTime() {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = setTimeout(() => {
      localStorage.setItem(
        "_expiredTime",
        String(Date.now() + this.timeout * 1000)
      );
    }, 600);
  }

  private tracker() {
    window.addEventListener("mousemove", this.eventHandler!);
    window.addEventListener("scroll", this.eventHandler!);
    window.addEventListener("keydown", this.eventHandler!);
    document.addEventListener("mousemove", this.eventHandler!, false);
    document.addEventListener("keypress", this.eventHandler!, false);
    document.addEventListener("DOMMouseScroll", this.eventHandler!, false);
    document.addEventListener("mousewheel", this.eventHandler!, false);
    document.addEventListener("touchmove", this.eventHandler!, false);
    document.addEventListener("MSPointerMove", this.eventHandler!, false);
  }

  cleanUp() {
    localStorage.removeItem("_expiredTime");
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.removeEventListener("mousemove", this.eventHandler!);
    window.removeEventListener("scroll", this.eventHandler!);
    window.removeEventListener("keydown", this.eventHandler!);
    document.removeEventListener("mousemove", this.eventHandler!);
    document.removeEventListener("keypress", this.eventHandler!);
    document.removeEventListener("DOMMouseScroll", this.eventHandler!);
    document.removeEventListener("mousewheel", this.eventHandler!);
    document.removeEventListener("touchmove", this.eventHandler!);
    document.removeEventListener("MSPointerMove", this.eventHandler!);
  }
}

export default useIdleTimer;
