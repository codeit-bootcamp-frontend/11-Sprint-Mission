import './AddItemPage.css';
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 70px;

  @media (min-width: 1200px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const TitleSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 11.5px 23px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #1967D6;
  }

  &:focus {
    background-color: #1251AA;
  }

  &:disabled {
    background-color: #3692FF;
    cursor: default;
    pointer-events: none;
  }
`;


function AddItemPage() {
	return (
		<Container>
			<form>
				<TitleSection>
					<Title>상품 등록하기</Title>
					<Button>등록</Button>
				</TitleSection>
			</form>
		</Container>
	);
}

export default AddItemPage;