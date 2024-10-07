const initialDevice = () => {
  return window.innerWidth < 1199
    ? window.innerWidth < 767
      ? "mobile"
      : "tablit"
    : "windows";
};

const showInitialDeviceItems = (contentType = "all") => {
  const getinitDevice = initialDevice();
  switch (getinitDevice) {
    case "windows":
      return contentType === "all" ? 10 : 4;
    case "tablit":
      return contentType === "all" ? 6 : 2;
    default:
      return contentType === "all" ? 4 : 1;
  }
};

export { initialDevice, showInitialDeviceItems };
