import { useEffect, useState } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

type UseLockedBodyOutput = [boolean, (locked: boolean) => void];

function useLockedBody(
  initialLocked = false,
  rootId = "___gatsby",
  ref?: React.RefObject<HTMLElement> // Default to `___gatsby` to not introduce breaking change
): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked);

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return;
    }
    const refRoot = ref?.current;
    if (!refRoot) {
      return;
    }
    // Save initial body style
    const originalOverflow = refRoot.style.overflow;
    const originalPaddingRight = refRoot.style.paddingRight;

    // Lock body scroll
    refRoot.style.overflow = locked?"hidden":"overlay";

    // Get the scrollBar width
    const root = document.getElementById(rootId); // or root
    const scrollBarWidth = refRoot
      ? refRoot.offsetWidth - refRoot.scrollWidth
      : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      refRoot.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      refRoot.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        refRoot.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}

export default useLockedBody;
