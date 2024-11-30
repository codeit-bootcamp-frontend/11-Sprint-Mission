import axios from "./axios";

async function postImage(file: File): Promise<string> {
  const response = await axios.post("/images/upload", {
    data: { image: file },
  });
  return response.data.url;
}

export { postImage };
