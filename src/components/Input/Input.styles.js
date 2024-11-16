import styled from 'styled-components';
import font from '../../styles/fontStyle.styled';

const StyledInputContainer = styled.div`
  width: 100%;
`;

const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !['isError'].includes(prop),
})`
  width: 100%;
  border-radius: 1.2rem;
  background-color: var(--gray-100);
  padding: 1.6rem 2.4rem 1.4rem;
  border: 1px solid;
  border-color: ${({ isError }) => (isError ? 'var(--red)' : 'transparent')};
  resize: none;
  ${font('16')}
  &::placeholder {
    color: var(--gray-400);
  }
  &:focus {
    outline: none;
    border-color: ${({ isError }) =>
      isError ? 'var(--red)' : 'var(--blue-300)'};
  }
`;

const StyledErrorText = styled.p`
  ${font('14sb')}
  color: var(--red);
  padding: 0.8rem 0 0 1.6rem;
`;

export { StyledInputContainer, StyledInput, StyledErrorText };
