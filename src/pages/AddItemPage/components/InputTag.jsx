import React, { useState } from "react";
import InputField from "./InputField";

function InputTag() {
  const [tag, setTag] = useState("");
  return (
    <div>
      <InputField
        id="tags"
        label="태그"
        type="text"
        placeholder="태그를 입력해 주세요"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
    </div>
  );
}

export default InputTag;
