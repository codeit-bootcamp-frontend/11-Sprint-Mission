import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "pc";

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("pc");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 744) {
        setDeviceType("mobile");
      } else if (width <= 1279) {
        setDeviceType("tablet");
      } else {
        setDeviceType("pc");
      }
    };

    // 초기 실행
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};
