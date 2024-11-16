import styled from 'styled-components';

const StyledProfileContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['imageSize'].includes(prop),
})`
  ${({ imageSize }) => {
    if (imageSize === 'big') {
      return 'width: 4rem; height: 4rem;';
    } else {
      return 'width: 3.2rem; height: 3.2rem;';
    }
  }}
`;

export default StyledProfileContainer;
