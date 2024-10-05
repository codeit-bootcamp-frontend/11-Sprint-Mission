function Dropdown({ onSelect }) {
  const handleSelect = (e) => {
    onSelect(e.target.textContent);
  };

  return (
    <ul>
      <li onClick={handleSelect}>최신순</li>
      <li onClick={handleSelect}>좋아요순</li>
    </ul>
  );
}

export default Dropdown;
