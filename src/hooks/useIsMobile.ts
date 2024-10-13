import { useLayoutEffect, useState } from "react";
import { debounce } from "../utils";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", debounce(updateSize, 250));
    // updateSize();
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};
export const useIsMobileTouch = (): boolean => {
  const [isMobile, setIsMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator?.userAgent));

  useLayoutEffect(() => {
    const updateMobileType = (): void => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator?.userAgent));
    };
    window.addEventListener("resize", debounce(updateMobileType, 250));
    // updateMobileType();
    return (): void => window.removeEventListener("resize", updateMobileType);
  }, []);

  return isMobile;
};

export default useIsMobile;
