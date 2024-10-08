const initialDevice = () => {
  let device = "mobile";
  if (window.innerWidth > 1199) {
    device = "windows";
  } else if (window.innerWidth > 767) {
    device = "tablit";
  }
  return device;
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
