import styled from 'styled-components';

const StyledComentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6.4rem;
  width: 100%;
  .coment {
    &-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
    }

    &-item {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
  }
`;

const IconReturn = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

export { StyledComentListContainer, IconReturn };
