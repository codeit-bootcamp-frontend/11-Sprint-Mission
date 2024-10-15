import { createContext, useContext, useEffect, useState } from "react";

const DeviceTypeContext = createContext();

export function DeviceTypeProvider({ children }) {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDeviceType("mobile");
        return;
      }
      if (window.innerWidth < 1200) {
        setDeviceType("tablet");
        return;
      }
      setDeviceType("desktop");
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DeviceTypeContext.Provider value={deviceType}>
      {children}
    </DeviceTypeContext.Provider>
  );
}

export function useDeviceType() {
  return useContext(DeviceTypeContext);
}
