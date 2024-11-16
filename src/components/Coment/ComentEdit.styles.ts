import { styled } from 'styled-components';
import { flexColumn } from '../../styles/layout.styles';

const StyledEditForm = styled.form`
  ${flexColumn}
  gap: 1.6rem;

  .coment {
    &-edit {
      display: flex;
      align-items: center;
    }

    &-btnArea {
      display: flex;
    }
  }
`;

export { StyledEditForm };
