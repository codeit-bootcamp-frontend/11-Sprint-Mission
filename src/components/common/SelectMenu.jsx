import { useState } from "react";
import "./SelectMenu.scss";

function SelectMenu({ children }) {
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleSelectClick = () => {
    setIsOptionVisible(!isOptionVisible);
  };

  const handleOptionClick = (label, value) => {
    setSelectedLabel(label);
    setIsOptionVisible(false);
    if (value?.onSelect) {
      value.onSelect(value.value);
    }
  };

  return (
    <div className="select">
      <button className="select-title" onClick={handleSelectClick}>
        {selectedLabel ||
          children.find((child) => child.type.displayName === "Title")?.props
            .children ||
          "옵션을 선택 해주세요"}
      </button>
      {isOptionVisible && (
        <div className="select-option">
          {children
            .filter((child) => child.type.displayName === "Option")
            .map((child) => (
              <button
                key={child.props.value}
                className="select-option-list"
                onClick={() =>
                  handleOptionClick(child.props.label, child.props)
                }>
                {child.props.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

const Title = ({ children }) => {
  return <>{children}</>;
};

Title.displayName = "Title";

const Option = ({ children }) => {
  return <>{children}</>;
};

Option.displayName = "Option";

SelectMenu.Title = Title;
SelectMenu.Option = Option;

export default SelectMenu;
