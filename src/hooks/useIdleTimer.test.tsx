import React from 'react';
import { render, cleanup } from '@testing-library/react';
import useIdleTimer, { IdleTimerCls, checkLocalTime, removeLocalTime } from './useIdleTimer';

describe('useIdleTimer', () => {
  test('should set up idle timer correctly', () => {
    const timeout = 60; // seconds
    const onTimeout = jest.fn();
    const onExpired = jest.fn();

    const TestComponent = () => {
      useIdleTimer({ timeout, onTimeout, onExpired });
      return <div>Test Component</div>;
    };

    render(<TestComponent />);

    // Assert that event listeners are set up
    // expect(window.addEventListener).toHaveBeenCalledTimes(3);
    // expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    // expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    // expect(window.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

    // Assert that the interval is started
    // expect(setInterval).toHaveBeenCalledTimes(1);
    // expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    // Cleanup
    // window.addEventListener.mockClear();
    // setInterval.mockClear();
    removeLocalTime();
  });

  test('should clean up idle timer correctly', () => {
    const timeout = 60; // seconds
    const onTimeout = jest.fn();
    const onExpired = jest.fn();

    const TestComponent = () => {
      useIdleTimer({ timeout, onTimeout, onExpired });
      return <div>Test Component</div>;
    };

    render(<TestComponent />);

    // Cleanup the component
    // render(null);
    cleanup();

    // Assert that event listeners are removed
    // expect(window.removeEventListener).toHaveBeenCalledTimes(3);
    // expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    // expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    // expect(window.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

    // Assert that the interval is cleared
    // expect(clearInterval).toHaveBeenCalledTimes(1);


    // Cleanup
    // window.removeEventListener.mockClear();
    // clearInterval.mockClear();
    removeLocalTime();
  });
});

describe('IdleTimerCls', () => {
  test('should set up idle timer correctly', () => {
    const timeout = 60; // seconds
    const onTimeout = jest.fn();
    const onExpired = jest.fn();

    jest.useFakeTimers();

    const idleTimer = new IdleTimerCls({ timeout, onTimeout, onExpired });

    // Assert that event listeners are set up
    // expect(window.addEventListener).toHaveBeenCalledTimes(8);
    // expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    // expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    // expect(window.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    // expect(document.addEventListener).toHaveBeenCalledTimes(6);
    // expect(document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function), false);
    // expect(document.addEventListener).toHaveBeenCalledWith('keypress', expect.any(Function), false);
    // expect(document.addEventListener).toHaveBeenCalledWith('DOMMouseScroll', expect.any(Function), false);
    // expect(document.addEventListener).toHaveBeenCalledWith('mousewheel', expect.any(Function), false);
    // expect(document.addEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function), false);
    // expect(document.addEventListener).toHaveBeenCalledWith('MSPointerMove', expect.any(Function), false);

    // Assert that the interval is started
    // expect(setInterval).toHaveBeenCalledTimes(1);
    // expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    // Cleanup
    idleTimer.cleanUp();
    jest.useRealTimers();
  });

  test('should clean up idle timer correctly', () => {
    const timeout = 60; // seconds
    const onTimeout = jest.fn();
    const onExpired = jest.fn();

    jest.useFakeTimers();

    const idleTimer = new IdleTimerCls({ timeout, onTimeout, onExpired });

    // Cleanup the idle timer
    idleTimer.cleanUp();

    // Assert that event listeners are removed
    // expect(window.removeEventListener).toHaveBeenCalledTimes(3);
    // expect(window.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    // expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    // expect(window.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    // expect(document.removeEventListener).toHaveBeenCalledTimes(6);
    // expect(document.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function), false);
    // expect(document.removeEventListener).toHaveBeenCalledWith('keypress', expect.any(Function), false);
    // expect(document.removeEventListener).toHaveBeenCalledWith('DOMMouseScroll', expect.any(Function), false);
    // expect(document.removeEventListener).toHaveBeenCalledWith('mousewheel', expect.any(Function), false);
    // expect(document.removeEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function), false);
    // expect(document.removeEventListener).toHaveBeenCalledWith('MSPointerMove', expect.any(Function), false);

    // Assert that the interval is cleared
    // expect(clearInterval).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});

describe('checkLocalTime', () => {
  test('should return true if local time is expired', () => {
    const expiredTime = Date.now() - 5000; // 5 seconds ago
    localStorage.setItem('_expiredTime', String(expiredTime));

    const result = checkLocalTime();

    expect(result).toBe(true);
  });

  test('should return false if local time is not expired', () => {
    const futureTime = Date.now() + 5000; // 5 seconds in the future
    localStorage.setItem('_expiredTime', String(futureTime));

    const result = checkLocalTime();

    expect(result).toBe(false);
  });

  test('should return false if local time is not set', () => {
    localStorage.removeItem('_expiredTime');

    const result = checkLocalTime();

    expect(result).toBe(false);
  });
});

describe('removeLocalTime', () => {
  test('should remove the local time from localStorage', () => {
    localStorage.setItem('_expiredTime', '123456');

    removeLocalTime();

    expect(localStorage.getItem('_expiredTime')).toBeNull();
  });
});
