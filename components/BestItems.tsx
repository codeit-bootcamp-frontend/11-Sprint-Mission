'use client'
import { getBestItem, useAppDispatch } from '@/service/reducerSlice'
import React, { useEffect } from 'react'
import { deviceBestItemCount } from '@/utils/initialDevice'
import { useSelector } from 'react-redux'
import { InitialStateType } from '@/store/store'
import { useRouter } from 'next/navigation'
import { ic_heart, ic_X } from '@/public/common'
import Image from 'next/image'

const BestItemDetail = () => {
  const dispatch = useAppDispatch()
  const bestItems = useSelector((state: InitialStateType) => state.data.bestItems || [])
  const router = useRouter()

  const handleDetail = (id: number) => {
    router.push(`/items/${id}`)
  }

  useEffect(() => {
    dispatch(getBestItem({ page: '1', pageSize: deviceBestItemCount().toString(), orderBy: 'favorite' }))
  }, [dispatch])

  return (
    <>
      <div className='itemContentsTitle'>
        <h3>베스트 상품</h3>
      </div>
      <div className='itemcontents'>
        {bestItems.list.map(item => (
          <div className='itemContentsForm' key={`bestItem${item.id}`}>
            <div className='bestItemDetail'>
              <div className='image'>
                <Image fill className='bestItemImg' src={item.images[0]} alt='itemImg' onClick={() => handleDetail(item.id)} />
              </div>
              <span className='itemName'>{item.name}</span>
              <span className='itemPrice'>{`${item.price.toLocaleString()}원`}</span>
              <div className='favoriteCount'>
                <Image src={ic_heart || ic_X} alt='heart' />
                {item.favoriteCount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default BestItemDetail
