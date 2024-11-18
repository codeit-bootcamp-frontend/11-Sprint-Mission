import styled from 'styled-components';
import { media } from '../../styles/media.styles';
import ICON_SEARCH from '../../assets/ic_search.svg';

const StyledForm = styled.form`
  width: 32.5rem;

  input {
    width: 100%;
    font-size: 1.6rem;
    line-height: 2.6rem;
    font-weight: 400;
    padding: 0.9rem 1.6rem 0.9rem 4.4rem;
    background-color: var(--gray-100);
    border-radius: 1.2rem;
    background-image: url(${ICON_SEARCH});
    background-size: 2.4rem;
    background-repeat: no-repeat;
    background-position: 1.6rem center;
  }
  input::placeholder {
    color: var(--gray-400);
  }

  ${media.ta`
    width: 24.2rem;
  `}

  ${media.mo`
    order: 3;
    width: 28.8rem;
  `}
`;

export default StyledForm;
