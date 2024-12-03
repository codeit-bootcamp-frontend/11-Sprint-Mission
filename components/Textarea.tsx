'use client'
import React, { useState, ReactNode, ChangeEvent, TextareaHTMLAttributes } from 'react'

interface TextAreaType extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  className: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  children?: ReactNode
}

function Textarea({ id = 'textareaID', className = 'textareaClassName', placeholder = '', onChange, children, ...props }: TextAreaType) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
    onChange(e)
  }

  return (
    <div className='textareaWrap'>
      <label htmlFor={id}>{children}</label>
      <textarea id={id} className={className} placeholder={placeholder} value={inputValue} onChange={handleInputChange} {...props} />
    </div>
  )
}

export default Textarea
