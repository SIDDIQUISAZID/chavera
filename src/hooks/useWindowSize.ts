import { useState, useEffect } from "react";
import { debounce } from "../utils";
interface Size {
  width: number;
  height: number;
}
// Hook
export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", debounce(handleResize, 250));
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Empty array ensures that effect is only run on mount
  return windowSize;
}
