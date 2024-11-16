import styled from 'styled-components';
import { flexColumn } from '../../styles/layout.styles';
import font from '../../styles/fontStyle.styles';

const AddProdForm = styled.form`
  ${flexColumn}
  gap: 2.4rem;
  .input {
    &-list {
      ${flexColumn}
      gap: 3.2rem;
    }

    &-tag {
      ${flexColumn}
      gap: 1.4rem;
    }
  }
`;

const AddProdTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    ${font('20b')}
  }
`;

export { AddProdForm, AddProdTitle };
