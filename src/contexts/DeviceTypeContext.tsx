import { createContext, useContext, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

type DeviceType = "desktop" | "tablet" | "mobile";

const DeviceTypeContext = createContext<DeviceType>("desktop");

export function DeviceTypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  const handleResize = useDebounce(() => {
    if (window.innerWidth < 768) {
      setDeviceType("mobile");
    } else if (window.innerWidth < 1200) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <DeviceTypeContext.Provider value={deviceType}>
      {children}
    </DeviceTypeContext.Provider>
  );
}

export function useDeviceType() {
  return useContext(DeviceTypeContext);
}
