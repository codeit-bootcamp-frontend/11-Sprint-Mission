'use client'
import React from 'react'
import { ic_user } from '@/public/common'
import Image from 'next/image'

interface UserIconInfoType {
  image: string | null
  nickname: string
  desc: string
}
function UserIconInfo({ image = null, nickname, desc }: UserIconInfoType) {
  return (
    <div className='ownerInfo'>
      <Image src={image ? image : ic_user} alt='productBottom' />
      <div className='ownerWrap'>
        <span className='owner'>{nickname}</span>
        <span className='update'>{desc}</span>
      </div>
    </div>
  )
}

export default UserIconInfo
