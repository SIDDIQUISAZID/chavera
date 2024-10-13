import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useLinkActive = (pageActiveFlag: (mainRoute: string) => boolean) => {
  const { pathname } = useLocation();
  const linkActive = useMemo(() => {
    const mainRoute = pathname.split("/")?.[1];
    return pageActiveFlag(mainRoute);
  }, [pathname, pageActiveFlag]);
  return linkActive;
};

export default useLinkActive;
