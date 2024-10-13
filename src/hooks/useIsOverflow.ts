import * as React from "react";

export const useIsOverflow = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback?: (hasOverflow: boolean) => void
) => {
  const [isOverflow, setIsOverflow] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    const { current } = ref;
    if (current) {
      const trigger = () => {
        const hasOverflow =
          current.offsetHeight < current.scrollHeight ||
          current.offsetWidth < current.scrollWidth;
        setIsOverflow(hasOverflow);
        if (callback) callback(hasOverflow);
      };
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
      }
      trigger();
    }
  }, [callback, ref]);
  return isOverflow;
};
