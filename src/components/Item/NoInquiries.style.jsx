import styled from "styled-components";
import NoInquiries from "./NoInquiries";
import NoInquiriesImg from "../../assets/NoInquiries.svg";

const StyledNoInquiries = styled(NoInquiries)`
  color: #9ca3af;
  text-align: center;
  padding-top: 204px;
  margin-bottom: 48px;
  position: relative;

  &::before {
    content: "";
    display: inline-block;
    width: 196px;
    height: 196px;
    background: url(${NoInquiriesImg});
    background-size: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 1200px) {
    padding-top: 148px;

    &::before {
      width: 140px;
      height: 140px;
    }
  }
`;

export default StyledNoInquiries;
