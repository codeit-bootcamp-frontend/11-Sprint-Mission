import { KeyboardEvent,useState } from "react";
import styled from "styled-components";
import InputItem from "./InputItem";
import { ReactComponent as DelIcon } from "../../../assets/images/icons/ic_del.svg";

interface InputTagProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const InputTag: React.FC<InputTagProps> = ({ tags, onAddTag, onRemoveTag }) => {
	const [input, setInput] = useState("");

	const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		const inputValue = input.trim();
		if(e.key === "Enter" && inputValue) {
			e.preventDefault();
			onAddTag(inputValue);
			setInput("");
		}
	};

	const handleDeleteTag = (tag: string) => {
    onRemoveTag(tag);
  };

	return (
		<div>
			<InputItem 
				id="tags"
				label="태그"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handlePressEnter}
        placeholder="태그를 입력해 주세요"
			/>

			{tags.length > 0 && (
				<TagSection>
					{tags.map((tag) => (
						<Tag key={`tag-${tag}`}>
							<TagText>{tag}</TagText>
							<DeleteBtn onClick={() => handleDeleteTag(tag)}>
								<DelIcon />
							</DeleteBtn>
						</Tag>
					))}
				</TagSection>
			)}
		</div>
	)
}

const TagSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const Tag = styled.div`
	display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F9FAFB;
  color: #1F2937;
  padding: 14px 14px 14px 16px;
  border-radius: 999px;
  min-width: 100px;
`;

const TagText = styled.span`
  font-size: 16px;
  line-height: 24px;
  margin-right: 8px;
  overflow: hidden;
  white-space: nowrap;
`;

const DeleteBtn = styled.button`
  background-color: #9CA3AF;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default InputTag;