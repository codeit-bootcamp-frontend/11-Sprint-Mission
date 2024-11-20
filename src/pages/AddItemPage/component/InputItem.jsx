import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const InputSection = styled.input`
  padding: 16px 24px;
  background-color: #F3F4F6;
  color: #1F2937;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  &::placeholder {
    color: #9CA3AF;
  }
  &:focus {
    outline-color: #3692FF;
  }
`;

const TextSection = styled.textarea`
  padding: 16px 24px;
  background-color: #F3F4F6;
  color: #1F2937;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
	height: 200px;
  &::placeholder {
    color: #9CA3AF;
  }
  &:focus {
    outline-color: #3692FF;
  }
`;

function InputItem({ id, label, value, onChange, placeholder, onKeyDown, isTextArea, }) {
	return (
		<div>
			{label && <Label htmlFor={id}>{label}</Label>}
			{isTextArea ? (
				<TextSection 
					id={id}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
				/> 
			) : (
				<InputSection 
				id={id}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				/>
			)}
		</div>
	);
}

export default InputItem;