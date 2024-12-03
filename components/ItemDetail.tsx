'use client'
import { getItem, setDeviceItemCount, useAppDispatch } from '@/service/reducerSlice'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { InitialStateType } from '@/store/store'
import { useRouter } from 'next/navigation'
import { Pagenation } from '.'
import { ic_heart, ic_X } from '@/public/common'
import Image from 'next/image'

const ItemDetail = () => {
  const dispatch = useAppDispatch()
  const { items, deviceItemCount } = useSelector((state: InitialStateType) => state.data)
  const router = useRouter()

  const [page, setPage] = useState<string>('1')
  const [search, setSearch] = useState<string>('')
  const [orderBy, setOrderBy] = useState<string>('favorite')

  const handleKeyDown = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.type === 'keydown' && e.target.value === 'Enter') {
      dispatch(getItem({ page: '1', pageSize: deviceItemCount.toString(), orderBy, keyword: search }))
    }
  }

  const handleItemSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleItemTypeSearch = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value)
  }

  const handleChangePage = (pageNum: number) => {
    setPage(pageNum.toString())
  }

  const handleDetailItemPage = (id: number) => {
    router.push(`/items?id=${id}`)
  }

  const handleAddItemPage = () => {
    router.push('addItem')
  }

  useEffect(() => {
    dispatch(getItem({ page: page, pageSize: deviceItemCount.toString(), orderBy, keyword: search }))
    dispatch(setDeviceItemCount('all'))
  }, [deviceItemCount, dispatch, orderBy, page, search])

  return (
    <>
      <div className='itemContentsTitle'>
        <h3>전체 상품</h3>
        <div className='contentsSearch'>
          <input
            className='inputBox'
            type='text'
            placeholder='검색할 상품을 입력해주세요.'
            value={search}
            onChange={handleItemSearch}
            onKeyDown={() => handleKeyDown}
          />
          <button id='addItemBtn' className='addItemBtn' onClick={handleAddItemPage}>
            <a>상품 등록하기</a>
          </button>
          <select id='itemSelect' className='selectBox' value={orderBy} onChange={handleItemTypeSearch}>
            <option value='recent'>최신순</option>
            <option value='favorite'>좋아요순</option>
          </select>
        </div>
      </div>
      <div className='itemcontents'>
        {items.list.map(item => (
          <div key={`item${item.id}`} className='itemContentsFormSmall'>
            <div className='itemDetail'>
              <div className='image'>
                <Image fill className='itemImg' src={item.images[0] || ic_X} alt='itemImg' onClick={() => handleDetailItemPage(item.id)} />
              </div>
              <span className='itemName'>{item.name}</span>
              <span className='itemPrice'>{`${item.price.toLocaleString()}원`}</span>
              <div className='favoriteCount'>
                <Image src={ic_heart} alt='heart' />
                {item.favoriteCount}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagenation totalCount={items.totalCount} deviceItemCount={deviceItemCount} pageChange={handleChangePage} />
    </>
  )
}

export default ItemDetail
