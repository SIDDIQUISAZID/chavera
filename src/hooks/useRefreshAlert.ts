import useEventListener from "./useEventListener";

const useRefreshAlert = () => {
  useEventListener("beforeunload", (event) => {
    event.preventDefault();
    return (event.returnValue = "");
  });
};

export default useRefreshAlert;
