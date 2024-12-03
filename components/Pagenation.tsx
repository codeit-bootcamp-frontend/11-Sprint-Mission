'use client'
import React, { useEffect, useState } from 'react'

interface PagenationType {
  totalCount: number
  deviceItemCount: number
  pageChange: (value: number) => void
}

function Pagenation({ totalCount = 0, deviceItemCount = 0, pageChange }: PagenationType) {
  const [page, setPage] = useState<number>(1)
  const [showPage, setShowPage] = useState<number[]>([1, 2, 3, 4, 5])

  const handleChangePage = (pageNum: number) => {
    setPage(pageNum)
    pageChange(pageNum)
  }

  const handlePrevPage = () => {
    if (showPage[0] / 5 > 1) {
      const decreasePagenation = showPage.map(num => num - 5)
      const resultPage = []
      for (let i = 0; i < 5; i++) {
        resultPage.push(decreasePagenation[0] + i)
      }
      setShowPage(resultPage)
      handleChangePage(resultPage[0])
    }
  }

  const handleNextPage = () => {
    const lastPage = showPage[showPage.length - 1]
    if (lastPage * deviceItemCount < totalCount) {
      // totalcount 보다 작은 페이지만 필터링
      const increasePagenation = showPage
        .map(num => num + 5)
        .filter(num => {
          return Math.ceil(totalCount / deviceItemCount) >= num
        })
      setShowPage(increasePagenation)
      handleChangePage(increasePagenation[0])
    }
  }

  useEffect(() => {
    const lastPagenation = Math.ceil(totalCount / deviceItemCount)
    setShowPage(Array.from({ length: lastPagenation > 5 ? 5 : lastPagenation }, (_, i) => i + 1))
  }, [deviceItemCount, totalCount])

  return (
    <div className='pagenation'>
      <button className='prevPageBtn' key={`pevPageBtn`} onClick={handlePrevPage}>
        {`<`}
      </button>
      {showPage.map(num => {
        return (
          <button
            className={`pagenationBtn ${page === num ? 'pagenationBtnSelect' : ''}`}
            id={`pageBtn${num}`}
            key={`pageBtn${num}`}
            onClick={() => {
              handleChangePage(num)
            }}
          >
            {num}
          </button>
        )
      })}
      <button className='nextBtn' key={`nextPageBtn`} onClick={handleNextPage}>
        {`>`}
      </button>
    </div>
  )
}

export default Pagenation
