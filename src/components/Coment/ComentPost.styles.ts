import styled from 'styled-components';
import font from '../../styles/fontStyle.styles';
import Button from '../Button/Button';
import { StyledInput } from '../Input/Input.styles';
import { media } from '../../styles/media.styles';
import { flexColumn } from '../../styles/layout.styles';

const ComentPostForm = styled.form`
  ${flexColumn}
  align-items: flex-end;
  width: 100%;
`;

const StyledPostInputContainer = styled(StyledInput)`
  height: 10.4rem;
  ${media.mo`
  height: 12.9rem;
  ${font('14')}
  `}
`;

const ComentButton = styled(Button)`
  margin-top: 1.6rem;
`;

const ComentPostTitle = styled.h3`
  width: 100%;
  ${font('16sb')}
  margin-bottom: 0.9rem;
`;

export {
  ComentPostForm,
  ComentPostTitle,
  StyledPostInputContainer,
  ComentButton,
};
