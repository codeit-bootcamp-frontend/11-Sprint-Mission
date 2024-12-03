'use client'
import React, { ReactNode } from 'react'
interface ButtonStyle {
  className: string
  disabled?: boolean
  onClick?: () => void
  children?: ReactNode
}

const Button = ({ className, disabled = false, onClick, children, ...props }: ButtonStyle) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
