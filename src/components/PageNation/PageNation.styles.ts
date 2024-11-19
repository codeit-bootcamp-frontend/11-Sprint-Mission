import styled from 'styled-components';

import ICON_ARROW from '/ic-arrow.svg';

const StyledPagination = styled.div`
  display: flex;
  gap: 0.4rem;
  margin: 4rem 0;
  justify-content: center;

  .pagination {
    &-item {
      cursor: pointer;
      width: 4rem;
      height: 4rem;
      text-align: center;
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 4rem;
      color: var(--gray-500);
      background-color: #fff;
      border: 1px solid var(--gray-200);
      border-radius: 50rem;
      &.active {
        background-color: #2f80ed;
        border: none;
        color: #fff;
      }
    }
  }

  [class*='arrow-'] {
    background-image: url(${ICON_ARROW});
    background-repeat: no-repeat;
    background-size: 1.6rem;
    background-position: center;
  }
  .arrow {
    &-next {
      transform: rotate(180deg);
    }
  }
`;

export default StyledPagination;
