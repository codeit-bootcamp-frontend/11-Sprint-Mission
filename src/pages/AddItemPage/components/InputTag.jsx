import React, { useState } from "react";
import styled from "styled-components";
import InputItem from "./InputItem";

function InputTag() {
	const [input, setInput] = useState("");

	return (
		<div>
			<InputItem 
				id="tags"
				label="태그"
				value={input}
				onChange={(e) => setInput(e.target.value)}
        placeholder="태그를 입력해 주세요"
			/>
		</div>
	)
}

export default InputTag;