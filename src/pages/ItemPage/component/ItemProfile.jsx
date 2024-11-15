import React from "react";
import styled from "styled-components";
import LikeBtn from "./LikeBtn";
import { ReactComponent as UserProfileIcon } from "../../../assets/images/icons/ic_profile.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 1200px) {
    gap: 24px;
  }
`;

const ItemImgSection = styled.div`
  width: 100%;
  height: 100%;
	margin-top: 50px;

  img {
    border-radius: 12px;
    width: 100%;
    height: auto;
  }

  @media (min-width: 768px) {
    width: 40%;
    max-width: 486px;
  }
`;

const ItemDetailSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: flex-start;

	@media (min-width: 768px) {
		margin-top: 50px;
	}
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 12px;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const Price = styled.h2`
  font-size: 24px;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 32px;
  }

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const Line = styled.div`
  width: 100%;
  border: none;
  height: 1px;
  background-color: #E5E7EB;
  margin: ${(props) =>
    props.$margin || "16px 0"};
`;

const SubHeadding = styled.h3`
	color: #4B5563;
	font-size: 14px;
	font-weight: 500;
	padding-top: 12px;
	margin-bottom: 8px;

	@media (min-width: 1200px) {
		font-size: 16px;
	}
`;

const Description = styled.p`
  font-size: 16px;
`;

const Tag = styled.div`
  border-radius: 999px;
  font-size: 16px;

	span {
    padding: 4px 8px;
  }
`;

const UserProfile = styled.div`
	margin-top: 12px;
	display: flex;
  align-items: center;
	font-weight: 500;
	font-size: 14px;
	line-height: 24px;
	color: #4B5563;
`;

const UserInfo = styled.div`
  display: flex;
	margin-left: 8px;
  flex-direction: column;
`;

const ButtomSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-top: 12px;
`;

function ItemProfile({ product }) {
	return (
		<Container>
			<ItemImgSection>
				<img src={product.images[0]} alt={`${product.name}`} />
			</ItemImgSection>
			
			<ItemDetailSection>
				<Title>{product.name}</Title>
				<Price>{product.price.toLocaleString()}원</Price>
				
				<Line />

				<SubHeadding>상품 소개</SubHeadding>
				<Description>{product.description}</Description>

				<SubHeadding>상품 태그</SubHeadding>
				<Tag>
          {product.tags.map((tag, index) => (
            <span key={`tag-display-${index}`}>#{tag}</span>
          ))}
        </Tag>

				<ButtomSection>
					<UserProfile>
						<UserProfileIcon />
						<UserInfo>
            	<span>{product.ownerNickname}</span>
            	<span>{product.updatedAt.split("T")[0]}</span>
          	</UserInfo>
					</UserProfile>
				
					<LikeBtn
						productId={product.id}
						isFavorite={product.isFavorite}
						favoriteCount={product.favoriteCount}
					/>
				</ButtomSection>
			</ItemDetailSection>
		</Container>
	)
}

export default ItemProfile;