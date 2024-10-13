import { useEffect, useMemo, useRef } from "react";
import { APP_TITLE } from "../Router";
//this custom hook for setting title of the page 
const useDocumentTitle = (title: string): void => {
  const documentDefined = useMemo(() => typeof document !== "undefined",[]);
  const prevTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    const currentTitle = prevTitle.current;
    if (!documentDefined) return;
    if (document.title !== title) document.title = title;
    return () => {
      if (document.title !== currentTitle) {
        document.title = APP_TITLE;
      }
    };
  }, [documentDefined,title]);
};

export default useDocumentTitle;
