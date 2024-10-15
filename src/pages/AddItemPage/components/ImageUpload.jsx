import React, { useState } from "react";

function ImageUpload() {
  const [preview, setPreview] = useState();
  return (
    <div>
      <img src={preview} />
    </div>
  );
}

export default ImageUpload;
