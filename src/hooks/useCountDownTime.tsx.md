import React, { useState, useRef, useCallback, useEffect } from 'react';

interface Actions {
    start(ttc?: number): void;
    pause(): void;
    resume(): void;
    reset(): void;
}
interface TimerRef {
    started?: number | null;
    lastInterval?: number | null;
    timeToCount?: number;
    timeLeft?: number;
    requestId?: number;
}

const useCountDownTime: (
    timeToCount?: number,
    interval?: number
) => [number, Actions] = (timeToCount=60 * 1000, interval = 1000) => {
    const [timeLeft, setTimeLeft] = useState<number>(timeToCount);
    const timer = useRef<TimerRef>({});
    const run = useCallback((ts: number) => {
        if (!timer.current.started || !timer.current.lastInterval) {
            timer.current.started = ts;
            timer.current.lastInterval = ts;
        }

        const localInterval = Math.min(interval, timer.current.timeLeft || Infinity);
        if (ts - timer.current.lastInterval >= localInterval) {
            timer.current.lastInterval += localInterval;
            setTimeLeft((timeLeft) => {
                timer.current.timeLeft = timeToCount  - localInterval;
                return timer.current.timeLeft;
            });
        }

        if (ts - timer.current.started < timer.current.timeToCount!) {
            timer.current.requestId = window.requestAnimationFrame(run);
        } else {
            timer.current = {};
            setTimeLeft(0);
        }
    }, [interval]);

    const start = useCallback(
        (ttc?: number) => {
            timer.current.requestId &&  window.cancelAnimationFrame(timer.current.requestId);

            const newTimeToCount = ttc !== undefined ? ttc : timeToCount;
            timer.current.started = null;
            timer.current.lastInterval = null;
            timer.current.timeToCount = newTimeToCount;
            timer.current.requestId = window.requestAnimationFrame(run);

            setTimeLeft(newTimeToCount);
        },
        [timeToCount, run]
    );

    const pause = useCallback(() => {
        timer.current.requestId && window.cancelAnimationFrame(timer.current.requestId);
        timer.current.started = null;
        timer.current.lastInterval = null;
        timer.current.timeToCount = timer.current.timeLeft;
    }, []);

    const resume = useCallback(() => {
        if (!timer.current.started && timer.current.timeLeft! > 0) {
            timer.current.requestId && window.cancelAnimationFrame(timer.current.requestId);
            timer.current.requestId = window.requestAnimationFrame(run);
        }
    }, [run]);

    const reset = useCallback(() => {
        if (timer.current.timeLeft) {
            window.cancelAnimationFrame(timer?.current?.requestId!);
            timer.current = {};
            setTimeLeft(0);
        }
    }, []);

    const actions = React.useMemo(
        () => ({ start, pause, resume, reset }),
        [start, pause, resume, reset]
    );

    useEffect(() => {
        return () => {
            timer.current.requestId && window.cancelAnimationFrame(timer.current.requestId)
        };
    }, []);

    return [timeLeft, actions];
};

export default useCountDownTime;
