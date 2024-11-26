type RemoveButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
};

function RemoveButton({ onClick, className }: RemoveButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      X
    </button>
  );
}

export default RemoveButton;
