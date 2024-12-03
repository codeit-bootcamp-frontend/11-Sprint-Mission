'use client'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { VerticalSelect, Textarea, Button, UserIconInfo } from '@/components/index'
import { getAxios } from '@/utils/api'
import { ic_return } from '@/public/common'
import Link from 'next/link'
import Image from 'next/image'

interface CommentsType {
  id: number
  limit?: number
}

interface CommentsDataType {
  list: Array<{ id: number; content: string; writer: { image: string; nickname: string }; updatedAt: string }>
  nextCursor: 0
}
function Comments({ id, limit = 10 }: CommentsType) {
  const [commentData, setCommentData] = useState<CommentsDataType>({ list: [], nextCursor: 0 })
  const [inquiry, setInquiry] = useState<string>('')

  const getComments = useCallback(async () => {
    const res = await getAxios({
      path: `${process.env.NEXT_PUBLIC_API_URL}/${id}/comments`,
      params: { limit },
    })

    const response = res as { status: number; data: CommentsDataType }
    if (response.status === 200) {
      setCommentData(response.data)
    } else {
      alert('댓글 조회 오류!!')
    }
  }, [id, limit])

  const handleSelectChagne = (e: ChangeEvent<HTMLSelectElement>) => {
    // 코멘트 수정 및 삭제 기능 추가 예정
    console.log(e.target.value, inquiry)
  }
  const handleInquiryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInquiry(e.target.value)
  }
  const handleItamSubmit = () => {
    console.log('문의글 저장 기능 추가 예정')
  }

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <>
      <h4>문의하기</h4>
      <Textarea
        id='itemInquiryInput'
        className='inputBox textarea'
        placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
        onChange={handleInquiryChange}
      />
      <div className='flexEnd'>
        <Button className='itemSubmit' onClick={handleItamSubmit}>
          등록
        </Button>
      </div>
      <div>
        {commentData.list.map(comment => {
          return (
            <div key={comment.id}>
              <div className='spaceBetween'>
                <span className='commentText'>{comment.content}</span>
                <VerticalSelect onChange={handleSelectChagne} />
              </div>
              <UserIconInfo image={comment.writer.image} nickname={comment.writer.nickname} desc={comment.updatedAt} />
              <div className='line' />
            </div>
          )
        })}
      </div>

      <button className='BackButton'>
        <Link className='navLink' href={'/items'}>
          목록으로 돌아가기
          <div className='commentImage'>
            <Image fill src={ic_return} alt='return' />
          </div>
        </Link>
      </button>
    </>
  )
}

export default Comments
