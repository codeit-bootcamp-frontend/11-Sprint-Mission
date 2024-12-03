'use client'
import React, { ChangeEvent } from 'react'

const baseOptions = [
  { value: 'update', name: '수정' },
  { value: 'delete', name: '삭제' },
]

interface VerticalSelectType {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function VerticalSelect({ onChange }: VerticalSelectType) {
  const handleSelectChagne = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e)
  }
  return (
    <select className='selectWrap' id='select' onChange={handleSelectChagne} value='default'>
      <option className='optionWrap' key='' value='default' disabled hidden>
        ⋮
      </option>
      {baseOptions.map((option, idx) => {
        return (
          <option key={`${option.value}${idx}`} value={option.value}>
            {option.name}
          </option>
        )
      })}
    </select>
  )
}

export default VerticalSelect
