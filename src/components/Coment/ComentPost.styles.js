import styled from 'styled-components';
import font from '../../styles/fontStyle.styled';
import Button from '../Button/Button';

const ComentPostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const ComentButton = styled(Button)`
  margin-top: 1.6rem;
`;

const ComentPostTitle = styled.h3`
  width: 100%;
  ${font('16sb')}
  margin-bottom: 0.9rem;
`;

export { ComentPostForm, ComentPostTitle, ComentButton };
