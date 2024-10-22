import "./Dropdown.css";
import Arrow from "../../assets/icons/ic_arrow_down.svg";
import Sort from "../../assets/icons/ic_sort.svg";
import useWindowWidth from "../../hooks/useWindowWidth";

function Dropdown({ list, onChange }) {
  const windowWidth = useWindowWidth();

  return (
    <div className="Dropdown">
      <div className="Dropdown__container">
        <select onChange={onChange} className="Dropdown__select">
          {list.map((item, index) => (
            <option value={item.value} key={index}>
              {item.text}
            </option>
          ))}
        </select>
        <img
          src={windowWidth < 767 ? Sort : Arrow}
          alt="Arrow"
          className="Dropdown_img"
        />
      </div>
    </div>
  );
}

export default Dropdown;
