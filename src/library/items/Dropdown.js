function Dropdown({ onSelect }) {
  const handleSelect = (e) => {
    onSelect(e.target.textContent);
  };

  return (
    <ul onClick={handleSelect}>
      <li>최신순</li>
      <li>좋아요순</li>
    </ul>
  );
}

export default Dropdown;
