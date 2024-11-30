import getConfig from "next/config";

export default async function handler(req, res) {
  const { url } = req.query;
  const {
    publicRuntimeConfig: {
      images: { remotePatterns },
    },
  } = getConfig();

  try {
    const imageRes = await fetch(url);

    if (imageRes.status === 200) {
      const isValid = remotePatterns.some((pattern) => {
        const srcUrl = new URL(url);
        const validProtocol = srcUrl.protocol.slice(0, -1) === pattern.protocol;
        const validHost = srcUrl.hostname === pattern.hostname;
        return validProtocol && validHost;
      });

      if (isValid) {
        res.status(200).json({ imgSrc: url });
      } else {
        res.status(403).json({
          message: "Image source not configured in next.config.js",
        });
      }
    } else {
      res.status(400).json({
        message: "URL does not point to a valid image",
      });
    }
  } catch (error) {
    res.status(500).json({ imessage: "Error checking image" });
  }
}
