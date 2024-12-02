interface ButtonProps {
  buttonName: string;
}

export default function Button({ buttonName }: ButtonProps) {
  return <button>{buttonName}</button>;
}
