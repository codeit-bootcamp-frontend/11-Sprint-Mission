import styled from "styled-components";
import ProfileImage from "./ProfileImage";

function UserInfo({ size, sort }) {
  return (
    <Container size={size}>
      <ProfileImage imageSize={size} />
      <Details sort={sort} size={size}>
        <Name>총명한판다</Name>
        <Date>2024. 01. 02</Date>
      </Details>
    </Container>
  );
}

export default UserInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ size }) => {
    switch (size) {
      case "big":
        return "1.6rem";
      case "small":
        return "0.8rem";
      default:
        return "1.6rem";
    }
  }};
`;

const Details = styled.div`
  display: flex;
  flex-direction: ${({ sort }) => {
    switch (sort) {
      case "column":
        return "column";
      case "row":
        return "row";
      default:
        return "column";
    }
  }};
  gap: ${({ sort }) => {
    switch (sort) {
      case "column":
        return "0";
      case "row":
        return "0.8rem";
      default:
        return "0";
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "big":
        return "1.4rem";
      case "small":
        return "1.2rem";
      default:
        return "1.4rem";
    }
  }};
  line-height: ${({ size }) => {
    switch (size) {
      case "big":
        return "2.4rem";
      case "small":
        return "1.8rem";
      default:
        return "2.4rem";
    }
  }};
`;

const Name = styled.p`
  color: var(--gray-600);
  font-weight: 500;
`;

const Date = styled.span`
  font-weight: 400;
  color: var(--gray-400);
`;
