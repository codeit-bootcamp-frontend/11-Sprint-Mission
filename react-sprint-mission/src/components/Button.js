import styled from "styled-components";

const Button = styled.button`
  &:hover,
  &active {
    background : ${ props => props.bg };
  }
`;

export default Button;
