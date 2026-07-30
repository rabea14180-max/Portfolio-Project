import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../api";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";

function OfflineGuard({ children }) {
  const [isConnected, setIsConnected] = useState(null);

  const checkConnection = useCallback(async () => {
    if (!navigator.onLine) {
      setIsConnected(false);
      return;
    }

    const result = await apiRequest(
      `/dashboard?connection_check=${Date.now()}`
    );

    setIsConnected(result.ok);
  }, []);

  useEffect(() => {
    function handleOffline() {
      setIsConnected(false);
    }

    function handleOnline() {
      checkConnection();
    }

    checkConnection();

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    const interval = setInterval(checkConnection, 5000);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      clearInterval(interval);
    };
  }, [checkConnection]);

  if (isConnected === null) {
    return <LoadingState />;
  }

  if (!isConnected) {
    return <ErrorState />;
  }

  return children;
}

export default OfflineGuard;
