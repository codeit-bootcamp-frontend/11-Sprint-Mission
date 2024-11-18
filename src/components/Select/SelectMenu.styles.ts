import styled from 'styled-components';
import { media } from '../../styles/media.styles';

import ICON_ARROW from '../../assets/ic_arrow_down.svg?url';
import ICON_SORT from '../../assets/ic_sort.svg';
import font from '../../styles/fontStyle.styles';

const StyledSelectContainer = styled.div`
  position: relative;
  order: 4;
  .select {
    &-title {
      width: 13rem;
      height: 4.4rem;
      padding: 1.2rem 2rem;
      ${font('16')}
      color: var(--gray-800);
      text-align: left;
      border: 1px solid var(--gray-200);
      border-radius: 1.2rem;
      background-color: #fff;
      background-image: url(${ICON_ARROW});
      background-size: 2.4rem;
      background-repeat: no-repeat;
      background-position: 8.6rem center;

      ${media.mo`
        width: 4.2rem;
        background-image: url(${ICON_SORT});
        font-size: 0;
        background-position: 0.9rem center;
      `}
    }
    &-option {
      position: absolute;
      left: 0;
      bottom: -10rem;
      display: flex;
      flex-direction: column;
      width: 13rem;
      text-align: center;
      border: 1px solid var(--gray-200);
      border-radius: 1.2rem;
      overflow: hidden;

      ${media.mo`
        left: -8.7rem;
      `}

      &-list {
        height: 4.2rem;
        padding: 0.9rem 0;
        background-color: #fff;
        font-size: 1.6rem;
        font-weight: 400;
        color: var(--gray-800);
        &:not(:last-child) {
          border-bottom: 1px solid var(--gray-200);
        }
      }
    }
  }
`;

export default StyledSelectContainer;
