import Image from 'next/image';
import SelectBox from '@/components/common/SelectBox';
import Profile from '@/public/ic_profile.svg';

export default function Comment({ comment }) {
  const formatDate = value => {
    if (!value) return '';
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  };

  return (
    <div className="comment">
      <SelectBox />
      <div className="comment-container">
        <div className="comment-content">{comment?.content}</div>
        <div className="writer">
          <Image src={comment?.writer.image || Profile} alt="프로필사진" className="profile-img" />
          <div className="buyer-info">
            <p className="buyer-nickname">{comment?.writer.nickname}</p>
            <p className="comment-updatedAt">{formatDate(comment?.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
