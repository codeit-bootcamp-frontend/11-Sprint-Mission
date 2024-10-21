import React from "react";
import styled from "styled-components";

const baseOptions = [
  { value: "update", name: "수정" },
  { value: "delete", name: "삭제" },
];

function VerticalSelect({ onChange, options = baseOptions }) {
  const handleSelectChagne = (e) => {
    onChange(e.target.value);
  };
  return (
    <SelectWrap id="select" onChange={handleSelectChagne} value="default">
      <OptionWrap key="" value="default" disabled hidden>
        ⋮
      </OptionWrap>
      {options.map((option, idx) => {
        return (
          <option key={`${option.value}${idx}`} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </SelectWrap>
  );
}

const SelectWrap = styled.select`
  width: 139px;
  border: 0;
  appearance: none;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
const OptionWrap = styled.option`
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: var(--gray500);
`;
export default VerticalSelect;
