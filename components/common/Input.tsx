import { ReactNode, useState } from 'react';
import styles from './Input.module.css';
import Image from 'next/image';

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (query: string) => void;
  image?: boolean;
  addClassName?: string | string[];
  placeholder: string;
  children?: ReactNode;
  name: string;
}

const Input = ({
  onInput,
  onChange,
  image,
  addClassName,
  placeholder,
  name,
  children,
}: InputProps) => {
  const inputClass = Array.isArray(addClassName)
    ? addClassName.join(' ')
    : addClassName || '';

  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (onChange) onChange(event);
    if (onInput) onInput(value);
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
        name={name}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles['input-input']}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
