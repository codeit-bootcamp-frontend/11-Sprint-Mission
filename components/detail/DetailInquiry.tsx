import { useState } from "react";
import DropDownInquiry from "./DropDownInquiry";
import { updateComment, updateCommentInterface } from "@/pages/api/productApi";
import { calculateGapTime } from "@/utils/formatDate";
import Image from "next/image";
import ProfileIcon from "../Icons/ProfileIcon";

interface DetailInquiryProps {
  id: string;
  content: string;
  writer: any;
  updatedAt: string;
  onUpdate: (id: string, updatedContent: string) => void;
  onDelete: (id: string) => void;
}

function DetailInquiry({
  id,
  content,
  writer,
  updatedAt,
  onUpdate,
  onDelete,
}: DetailInquiryProps) {
  const [isEditing, setIsEditing] = useState(false); // 수정 상태를 할당할 state
  const [comment, setComment] = useState(content); // 문의하기 text를 할당할 state
  const userId = localStorage.getItem("userId");

  const handleCancelEdit = () => {
    setIsEditing(false);
    setComment(content);
  };

  const handleSaveEdit = async () => {
    try {
      const updateData: updateCommentInterface = { content: comment };
      const response = await updateComment(id, updateData);

      if (response.ok) {
        onUpdate(id, comment);
      }
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='content-inquiry'>
      {!isEditing && String(writer.id) === userId && (
        <DropDownInquiry
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(id)}
        />
      )}
      <div className='inquiry-comment'>
        {isEditing ? (
          <textarea
            name='inquiry_comment'
            id='inquiry_comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        ) : (
          <p>{content}</p>
        )}
      </div>
      <div className='inquiry-footer'>
        <div className='user-area'>
          <div className='writer-icon'>
            {writer.image ? (
              <Image fill src={writer.image} alt={writer.nickname} />
            ) : (
              <ProfileIcon />
            )}
          </div>
          <div>
            <div className='writer-name'>{writer.nickname}</div>
            <div className='date-update'>{calculateGapTime(updatedAt)}</div>
          </div>
        </div>
        {isEditing && (
          <div className='edit-area'>
            <button className='btn-cancel' onClick={handleCancelEdit}>
              취소
            </button>
            <button className='btn-edit' onClick={handleSaveEdit}>
              수정 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailInquiry;
