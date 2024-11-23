import styled from "styled-components";
 
type ProductSortOption = "recent" | "favorite";

interface DropDownListProps {
  onSortCard: (sortOption: ProductSortOption) => void;
}

const DropDownList: React.FC<DropDownListProps> = ({ onSortCard}) => {
  return (
    <DropdownList>
      <DropdownItem onClick={() => onSortCard("recent")}>
        최신순
      </DropdownItem>
      <DropdownItem onClick={() => onSortCard("favorite")}>
        좋아요순
      </DropdownItem>
    </DropdownList>
  );
}

const DropdownList = styled.div`
  position: absolute;
  right: 0;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 12px 44px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 16px;
  cursor: pointer;
`;


export default DropDownList;
