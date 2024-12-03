'use client'
import React, { ChangeEvent, FocusEvent, ReactNode, useState } from 'react'

interface TextInputType {
  id?: string
  className: string
  type: string
  placeholder: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  children: ReactNode
}

function TextInput({
  id = 'inputBoxID',
  className = 'inputBoxClassName',
  type = 'text',
  placeholder = '',
  onChange,
  onBlur,
  children,
  ...props
}: TextInputType) {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const targetValue = e.target.value
    if (type === 'number') {
      if (targetValue.length < 1) return
      const value = Number(targetValue.replaceAll(',', ''))
      if (!isNaN(value)) {
        const formatValue = value.toLocaleString('ko-KR')
        setInputValue(formatValue)
        if (onChange) onChange(e)
      }
    } else {
      setInputValue(targetValue)
      if (onChange) onChange(e)
    }
  }

  return (
    <div className='inputWrap'>
      <label htmlFor={id}>{children}</label>
      {type === 'textarea' ? (
        <textarea id={id} className={className} placeholder={placeholder} value={inputValue} onChange={handleInputChange} {...props} />
      ) : (
        <>
          <input
            id={id}
            type={type === 'number' ? 'text' : type}
            className={className}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={onBlur}
            {...props}
          />
        </>
      )}
    </div>
  )
}

export default TextInput
