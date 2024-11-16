import { styled } from 'styled-components';

const StyledEditForm = styled.form`
  display: flex;
  flex-direction: column;
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
