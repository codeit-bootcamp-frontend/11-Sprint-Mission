'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ic_logo_item_pc, ic_user } from '@/public/common'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  const activeButton = pathName.indexOf('items')
  return (
    <html lang='ko'>
      <body>
        <div className='navHeader'>
          <div className='navigation'>
            <div className='itemLogo'>
              <Link href={'/'}>
                <Image src={ic_logo_item_pc} alt='pandaLogo' />
              </Link>
            </div>
            <Link href={'/NoticeBoard'} className={!activeButton ? 'activeNav' : 'inactiveNav'}>
              자유 게시판
            </Link>
            <Link href={'/items'} className={activeButton ? 'activeNav' : 'inactiveNav'}>
              중고 마켓
            </Link>
          </div>
          <div className='userInfo'>
            <Link href={'/userInfo'} className='navMarket'>
              <Image src={ic_user} alt='userInfo' />
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
