import styled from "styled-components";

const Inner = styled.div`
  width: 1200px;
  margin: 29px auto 0 auto;
`;

const ProductContainer = styled.div`
  display: flex;
`;

const ProductImg = styled.div`
  border-radius: 16px;
  width: 486px;
  height: 486px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductDetails = styled.div`
  flex-grow: 1;
  margin-left: 24px;
`;

const Title = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
  }

  p {
    font-size: 40px;
    font-weight: 600;
    color: #1f2937;
    margin-top: 16px;
  }
`;

const ProductIntroduction = styled.div`
  margin-top: 24px;

  h3 {
    font-weight: 600;
    color: #4b5563;
  }

  p {
    color: #4b5563;
    line-height: 26px;
    margin-top: 16px;
  }
`;

const ProductTag = styled.div`
  margin-top: 24px;

  h3 {
    font-weight: 600;
    color: #4b5563;
  }

  ul {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }

  li {
    border-radius: 26px;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    color: #1f2937;
    padding: 0 16px;
  }
`;

const UserStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 62px;

  .profile {
    display: flex;
    align-items: center;
  }

  .profile-img {
    width: 40px;
    height: 40px;
  }

  .profile > div:not(.profile-img) {
    margin-left: 16px;
  }

  .profile > div:not(.profile-img) p {
    font-size: 14px;
    font-weight: 500;
    color: #4b5563;
  }

  .profile > div:not(.profile-img) span {
    font-size: 14px;
    color: #9ca3af;
  }

  .likes {
    border: 1px solid #e5e7eb;
    border-radius: 35px;
    display: flex;
    align-items: center;
    height: 40px;
    font-weight: 500;
    color: #6b7280;
    padding: 0 12px;
    position: relative;
  }

  .likes i {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }

  .likes::before {
    content: "";
    background: #e5e7eb;
    display: inline-block;
    width: 1px;
    height: 34px;
    position: absolute;
    top: 50%;
    left: -24px;
    transform: translateY(-50%);
  }
`;

export {
  Inner,
  ProductContainer,
  ProductImg,
  ProductDetails,
  Title,
  ProductIntroduction,
  ProductTag,
  UserStats,
};
