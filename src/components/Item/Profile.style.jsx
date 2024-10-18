import styled from "styled-components";

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.div`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  margin-left: 16px;

  p {
    font-size: 14px;
    font-weight: 500;
    color: #4b5563;
  }

  span {
    font-size: 14px;
    color: #9ca3af;
  }
`;

export { ProfileWrapper, Img, Info };
