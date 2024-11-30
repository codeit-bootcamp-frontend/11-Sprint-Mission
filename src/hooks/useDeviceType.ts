import { useState, useEffect } from "react";

const DEVICE_BREAKPOINTS = {
  MOBILE: 744,
  TABLET: 1279,
} as const;

type DeviceType = "mobile" | "tablet" | "pc";

const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// 디바이스 타입 판별 함수
const getDeviceType = (width: number): DeviceType => {
  if (width <= DEVICE_BREAKPOINTS.MOBILE) return "mobile";
  if (width <= DEVICE_BREAKPOINTS.TABLET) return "tablet";
  return "pc";
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>(
    getDeviceType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      const newDeviceType = getDeviceType(window.innerWidth);
      setDeviceType(newDeviceType);
    }, 200);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};
