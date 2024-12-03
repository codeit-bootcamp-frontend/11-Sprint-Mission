'use client'
import React, { ChangeEvent, useState } from 'react'
import '@/styles/css/style.css'
import { TextInput, ItemImage, TagInput, Textarea } from '@/components/index'

function AddItem() {
  const [itemName, setItemName] = useState<string>('')
  const [itemDetail, setItemDetail] = useState<string>('')
  const [itemPrice, setItemPrice] = useState<string>('')
  const [itemTagArr, setItemTagArr] = useState<Array<string>>([])
  const [addItemImageURL, setAddItemImageURL] = useState<Array<string>>([])

  const handleItemNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItemName(e.target.value)
  }
  const handleItemDetailChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setItemDetail(e.target.value)
  }

  const handleItemPriceChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItemPrice(e.target.value)
  }

  const handleTagChange = (value: Array<string>) => {
    setItemTagArr(value)
  }

  const handleImageChange = () => {
    setAddItemImageURL([])
  }

  const handleItamSubmit = async () => {
    if (addItemImageURL.length < 1) return alert('상품 이미지를 입력해주세요.')
    if (itemName.length < 1) return alert('상품명을 입력해주세요.')
    if (itemDetail.length < 1) return alert('상품 소개를 입력해주세요.')
    if (itemPrice.length < 1) return alert('상품 가격을 입력해주세요.')
    if (itemTagArr.length < 1) return alert('상품 태그를 입력해주세요.')
    console.log('postAxios')
  }

  return (
    <main>
      <section className='section'>
        <div className='contentsTopTitle'>
          <h3>상품 등록하기</h3>
          <button className='itemSubmit' type='button' onClick={handleItamSubmit}>
            등록
          </button>
        </div>
        <div className='addItemContents column'>
          <h4>상품 이미지</h4>
          <ItemImage onChange={handleImageChange} />
        </div>
        <TextInput id='itemNameInput' className='inputBox' type='text' placeholder='상품명을 입력해주세요' onChange={handleItemNameChange}>
          <h4>상품명</h4>
        </TextInput>
        <Textarea id='itemDetailInput' className='inputBox textarea' placeholder='상품 소개를 입력해주세요' onChange={handleItemDetailChange}>
          <h4>상품 소개</h4>
        </Textarea>
        <TextInput id='itemPriceInput' className='inputBox' type='number' placeholder='판매 가격을 입력해주세요' onChange={handleItemPriceChange}>
          <h4>판매 가격</h4>
        </TextInput>
        <TagInput onChange={handleTagChange}>
          <h4>태그</h4>
        </TagInput>
      </section>
    </main>
  )
}

export default AddItem
