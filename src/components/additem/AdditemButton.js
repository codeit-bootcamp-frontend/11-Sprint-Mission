function AdditemButton({ onSubmit, disabled }) {
  return (
    <button
      className={`upButton ${disabled ? 'disabled' : 'active'}`}
      onClick={onSubmit}
      disabled={disabled}
    >
      등록
    </button>
  );
}

export default AdditemButton;
