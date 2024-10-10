import "./Input.scss";

function Input({
  isInput = true,
  type = "text",
  placeholder = null,
  styles = "default",
  inputName = null,
}) {
  return (
    <>
      {isInput ? (
        <input
          type={type}
          placeholder={placeholder}
          className={styles}
          name={inputName}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          className={styles}
          name={inputName}
        />
      )}
    </>
  );
}

export default Input;
