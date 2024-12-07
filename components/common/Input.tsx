import { FormEvent, InputHTMLAttributes, ReactNode, useState } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (query: string) => void;
  image?: boolean;
  addClassName?: string | string[];
  children?: ReactNode;
}

const Input = ({
  onChange,
  image,
  addClassName,
  children,
  onInput,
  ...props
}: InputProps) => {
  const inputClass = Array.isArray(addClassName)
    ? addClassName.join(' ')
    : addClassName || '';

  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (onChange) onChange(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      if (onInput) onInput(query);
    }
  };

  return (
    <div className={`${styles['input-container']} ${inputClass}`}>
      {image && <> {children} </>}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles['input-input']}
        {...props}
      />
    </div>
  );
};

export default Input;
