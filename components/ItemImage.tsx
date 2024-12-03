'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ic_X, ic_add_image } from '@/public/common'
import Image from 'next/image'

interface ItemImageType {
  onChange: (value: string) => void
}

function ItemImage({ onChange }: ItemImageType) {
  const inputRef = useRef<HTMLInputElement>(null!)
  const [preview, setPreview] = useState<string>('')

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length < 1) return
    const path = URL.createObjectURL(e.target.files[0])
    setPreview(path)
    onChange(path)
  }

  const handleImgClear = () => {
    setPreview('')
    onChange('')
    inputRef.current.value = ''
  }

  const PrevImage = () => {
    if (preview.length < 1) return null

    return (
      <div className='prevImageForm'>
        <Image src={preview} style={{ width: '100%' }} alt='previewImage' />
        <Image className='clearImg' src={ic_X} alt='cancel' onClick={handleImgClear} />
      </div>
    )
  }
  useEffect(() => {
    if (preview === null) {
      URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className='addItemWrap'>
      <label className='addItemIC' htmlFor='imgInput'>
        <Image src={ic_add_image} alt='addImg' />
        <input id='imgInput' className='addItemInput' type='file' accept='image/*' multiple ref={inputRef} onChange={handleImageChange} />
      </label>
      <PrevImage />
    </div>
  )
}

export { ItemImage }
