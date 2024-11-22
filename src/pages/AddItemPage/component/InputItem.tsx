import styled from "styled-components";
import { ChangeEvent, KeyboardEvent } from "react";

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

interface InputItemProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  isTextArea?: boolean;
  errorMessage?: string;
  type?: string;
}

const InputItem: React.FC<InputItemProps> = ({ 
  id,
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  isTextArea,
  type = "text", 
}) => {
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
        type={type}
				/>
			)}
		</div>
	);
}

export default InputItem;