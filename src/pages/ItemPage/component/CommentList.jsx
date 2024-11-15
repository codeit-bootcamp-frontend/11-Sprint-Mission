import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductComments } from "../../../api/itemApi";
import { ReactComponent as EmptyStateImage } from "../../../assets/images/icons/Img_inquiry_empty.svg";
//import { ReactComponent as UserProfileIcon } from "../../../assets/images/icons/ic_profile.svg";

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
}

export default CommentList;