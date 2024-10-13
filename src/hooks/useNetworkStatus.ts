import { useState, useEffect } from "react";

export interface NetworkStatus {
  isOnline: boolean;
  isOffline: boolean;
}
export interface props {
  handleCustomOnline?: (props: NetworkStatus) => void;
  handleCustomOffline?: (props: NetworkStatus) => void;
}

const useNetworkStatus = (props: props = {}): NetworkStatus => {
  const { handleCustomOnline, handleCustomOffline } = props;
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isOffline: !navigator.onLine,
  });

  useEffect(() => {
    const handleOnline = (): void => {
      const newNetworkState = {
        isOnline: true,
        isOffline: false,
      };
      handleCustomOnline?.(newNetworkState);
      setNetworkStatus(newNetworkState);
    };

    const handleOffline = (): void => {
      const newNetworkState = {
        isOnline: false,
        isOffline: true,
      };
      handleCustomOffline?.(newNetworkState);
      setNetworkStatus(newNetworkState);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return (): void => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleCustomOffline,handleCustomOnline]);

  return networkStatus;
};

export default useNetworkStatus;
