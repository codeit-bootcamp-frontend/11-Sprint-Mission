'use client'
import React, { ChangeEvent, KeyboardEvent, ReactNode, useState } from 'react'
import { ic_X } from '@/public/common'
import Image from 'next/image'

type TagType = {
  key: number
  value: string
}
interface TagInputType {
  onChange: (value: Array<string>) => void
  children: ReactNode
}

function TagInput({ children, onChange }: TagInputType) {
  const [inputTagValue, setInputTagValue] = useState<string[]>([])
  const [tagArr, setTagArr] = useState<TagType[]>([])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTagValue([...inputTagValue, e.target.value])
  }

  const handleOnchange = (data: TagType[]) => {
    const newTagArr = data.reduce<string[]>((acc, cur) => {
      acc.push(cur.value)
      return acc
    }, [])
    onChange(newTagArr)
  }

  const handleTagBtnDelete = (key: number) => {
    const filterTagArr = tagArr.filter(tag => tag.key !== key)
    setTagArr(filterTagArr)
    handleOnchange(filterTagArr)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.length > 0) {
      const addTagArr = [...tagArr, { key: tagArr.length, value: e.currentTarget.value }]
      setTagArr(addTagArr)
      setInputTagValue([])
      handleOnchange(addTagArr)
    }
  }

  return (
    <>
      <label>{children}</label>
      <input className='inputBox' placeholder='태그를 입력해주세요' value={inputTagValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <div className='tagCollect'>
        {tagArr.map(tag => {
          return (
            <button id={`tagButton${tag.key}`} key={`tagButton${tag.key}`} className='tagButton' onClick={() => handleTagBtnDelete(tag.key)}>
              {`#${tag.value}`}
              <Image id={`tagButtonCancel${tag.key}`} src={ic_X} alt='cancel' />
            </button>
          )
        })}
      </div>
    </>
  )
}

export default TagInput
