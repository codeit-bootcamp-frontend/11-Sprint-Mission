'use client'
import React, { useEffect } from 'react'
import { Button, UserIconInfo } from '@/components/index'
import '@/styles/css/style.css'
import Comments from '@/components/Comments'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ic_heart, ic_X } from '@/public/common'
import { useSelector } from 'react-redux'
import { getProduct, useAppDispatch } from '@/service/reducerSlice'
import { InitialStateType } from '@/store/store'

function Products() {
  const getParams = useParams()
  const id = getParams.id ? +getParams.id : 0
  const dispatch = useAppDispatch()
  const productData = useSelector((state: InitialStateType) => state.data.product)

  const handleImageClick = () => {
    console.log('구현중')
  }

  useEffect(() => {
    dispatch(getProduct({ id: id }))
  }, [productData, id])

  return (
    productData && (
      <main>
        <section className='section'>
          <div className='productsContents'>
            <div className='image'>
              <Image fill className='productImg' src={productData.images[0] || ic_X} alt='itemImg' />
            </div>
            <div className='productDetail'>
              <h2>{productData.name}</h2>
              <h2>{productData.price}</h2>
              <div className='line' />
              <span className='productDescTitle'>상품 소개</span>
              <span className='productDesc'>{productData.description}</span>
              <span className='productDescTitle'>상품 태그</span>
              <div className='productTag'>
                {productData.tags.map((tag, idx) => {
                  return (
                    <button key={`tagButton${idx}`} className='tagButton'>
                      {tag}
                    </button>
                  )
                })}
              </div>
              <div className='spaceBetween'>
                <UserIconInfo image={null} nickname={productData.ownerNickname} desc={productData.updatedAt} />
                <Button className='heartButton' onClick={handleImageClick}>
                  <Image src={ic_heart || ic_X} alt='heart' />
                  {productData.favoriteCount}
                </Button>
              </div>
            </div>
          </div>
          <div className='line' />
          <Comments id={id} />
        </section>
      </main>
    )
  )
}

export default Products
