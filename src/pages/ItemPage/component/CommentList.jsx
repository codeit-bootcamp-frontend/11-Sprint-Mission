import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductComments } from "../../../api/itemApi";
import { TimestampCal } from "../../../components/TimestampCal";
import { ReactComponent as EmptyStateImage } from "../../../assets/images/icons/Img_inquiry_empty.svg";
import { ReactComponent as UserProfileIcon } from "../../../assets/images/icons/ic_profile.svg";

const EmptyStateSection = styled.div`
  margin: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const EmptyStateText = styled.p`
  color: #9CA3AF;
  font-size: 16px;
  line-height: 26px;
`;

const EmptyState = () => {
  return (
    <EmptyStateSection>
      <EmptyStateImage />
      <EmptyStateText>아직 문의가 없습니다.</EmptyStateText>
    </EmptyStateSection>
  );
};

const ListSection = styled.div`
  margin-bottom: 40px;
`;

const CommentSection = styled.div`
  padding: 24px 0;
  position: relative;
`;

const CommentContent = styled.p`
  font-size: 16px;
  line-height: 140%;
  margin-bottom: 24px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserInfo = styled.div`
  display: flex;
	margin-left: 8px;
  flex-direction: column;
`;

const Username = styled.span`
  color: #4B5563;
  font-size: 12px;
  margin-bottom: 4px;
`;

const Timestamp = styled.span`
  color: #9CA3AF;
  font-size: 12px;
`;

const Line = styled.div`
  width: 100%;
  border: none;
  height: 1px;
  background-color: #E5E7EB;
  margin: ${(props) =>
    props.$margin || "16px 0"};
`;

const CommentItem = ({ item }) => {
	const writerInfo = item.writer;
	const formatTimestamp = TimestampCal(item.updatedAt);

	return (
		<>
			<CommentSection>
				<CommentContent>{item.content}</CommentContent>

				<UserProfile>
          <UserProfileIcon />
          <UserInfo>
            <Username>{writerInfo.nickname}</Username>
            <Timestamp>{formatTimestamp}</Timestamp>
          </UserInfo>
        </UserProfile>
			</CommentSection>

			<Line $margin="0" />
		</>
	)
};

function CommentList({ productId }) {
	const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

	useEffect(() => {
    if (!productId) return;

    const fetchComments = async () => {
      const params = {
        limit: 5,
      };

      try {
        const data = await getProductComments({ productId, params });
        setComments(data.list);
        setError(null);
      } 
			catch (error) {
        console.error("Error fetching comments:", error);
        setError("댓글못불러옴");
      }
    };

    fetchComments();
  }, [productId]);

	if (error) alert(`${error}`);

	if (comments && !comments.length) return <EmptyState />;
  
	else {
		return (
			<ListSection>
				{comments.map((item) => (
					<CommentItem item={item} key={`comment-${item.id}`}/>
				))}
			</ListSection>
		);
	}
}

export default CommentList;