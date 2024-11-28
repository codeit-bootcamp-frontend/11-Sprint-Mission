import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import './AddItemInfo.css';

interface addItemInfoProps<T> {
  children?: ReactNode;
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  data?: T;
  setData?: Dispatch<SetStateAction<T>>;
}

function AddItemInfo<T>({
  children,
  label,
  name,
  rows = 1,
  placeholder = '',
  data,
  setData,
}: addItemInfoProps<T>) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '' && setData) {
      e.preventDefault();

      setData((prevTags) => {
        if (Array.isArray(prevTags)) {
          return [...prevTags, inputValue] as T;
        }
        return prevTags;
      });

      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (name !== 'tag' && setData) {
      setData(e.target.value as T);
    } else {
      setInputValue(e.target.value);
    }
  };

  return (
    <section className='add-item-info'>
      <label className='add-item-label' htmlFor={name}>
        {label}
      </label>

      {children && name !== 'tag' ? (
        children
      ) : (
        <textarea
          className='add-item-description'
          name={name}
          id={name}
          rows={rows}
          placeholder={placeholder}
          value={
            name === 'tag' ? inputValue : (data as string | number | undefined)
          }
          onChange={handleInputChange}
          onKeyDown={name === 'tag' ? handleKeyDown : undefined}
        />
      )}

      {name === 'tag' && children}
    </section>
  );
}

export default AddItemInfo;
