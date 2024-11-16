import styled from 'styled-components';
import font from '../../styles/fontStyle.styles';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

const ComentContainer = styled.div`
  position: relative;
`;

const ComentDropDown = styled(DropDownMenu)`
  position: absolute;
`;

const ComentText = styled.p`
  ${font('14')}
  margin-bottom: 1.6rem;
  padding-right: 2.8rem;
`;

export { ComentContainer, ComentDropDown, ComentText };
