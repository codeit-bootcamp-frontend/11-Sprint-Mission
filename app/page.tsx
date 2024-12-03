'use client'
import React from 'react'
import '@/styles/css/style.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { logo_pc, login_bt, since, privacy_policy, ic_faq, ic_facebook, ic_instagram, ic_twitter, ic_youtube } from '@/public/common'
import { pc_content_hot_item, pc_content_search, pc_content_register } from '@/public/main'

function Home() {
  const router = useRouter()

  const handleMovePage = (path: string) => {
    router.push(path)
  }

  return (
    <>
      <header>
        <div className='header'>
          <Image className='logo' src={logo_pc} alt='Home' onClick={() => handleMovePage('/')} />
          <Image className='login' src={login_bt} alt='로그인' onClick={() => handleMovePage('/login')} />
        </div>
      </header>
      <main>
        <div className='banner-header'>
          <div className='banner-header-info'>
            <h1 className='banner-header-txt'>
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <button className='bannerButton' onClick={() => handleMovePage('/items')}>
              구경하러 가기
            </button>
          </div>
        </div>
        <section>
          <div className='contents'>
            <div className='contentsForm'>
              <Image className='contents-home-img' src={pc_content_hot_item} alt='hotItem' />
              <div className='contents-detail'>
                <h2 className='contents-detail-top'>Hot item</h2>
                <h1 className='contents-detail-mid'>
                  인기 상품을
                  <br className='detail-break-top' />
                  확인해 보세요
                </h1>
                <p className='contents-detail-bottom'>
                  가장 HOT한 중고거래 물품을
                  <span className='detail-break-bottom'>
                    <br />
                  </span>
                  판다 마켓에서 확인해 보세요
                </p>
              </div>
            </div>
          </div>
          <div className='contents'>
            <div className='contentsForm'>
              <div className='contents-detail'>
                <h2 className='contents-detail-top'>Search</h2>
                <h1 className='contents-detail-mid'>
                  구매를 원하는
                  <span className='break-on-desktop'>
                    <br />
                  </span>
                  상품을 검색하세요
                </h1>
                <p className='contents-detail-bottom'>
                  구매하고 싶은 물건은 검색해서
                  <span className='break'>
                    <br />
                  </span>
                  쉽게 찾아보세요
                </p>
              </div>
              <Image className='contentsSearch-img' src={pc_content_search} alt='search' />
            </div>
          </div>
          <div className='contents'>
            <div className='contentsForm'>
              <Image className='contents-register-img' src={pc_content_register} alt='register' />
              <div className='contents-detail'>
                <h2 className='contents-detail-top'>Register</h2>
                <h1 className='contents-detail-mid'>
                  판매를 원하는
                  <span className='break-on-desktop'>
                    <br />
                  </span>
                  상품을 등록하세요
                </h1>
                <p className='contents-detail-bottom'>
                  어떤 물건이든 판매하고 싶은 상품을
                  <span className='break'>
                    <br />
                  </span>
                  쉽게 등록하세요
                </p>
              </div>
            </div>
          </div>
          <div className='banner-footer'>
            <div className='banner-footer-info'>
              <div className='banner-bottom-txt'>
                믿을 수 있는
                <span className='break'>
                  <br />
                </span>
                판다마켓 중고 거래
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='home-footer'>
        <div className='since'>
          <div className='imageContainer'>
            <div className='image'>
              <Image src={since} alt='since' />
            </div>
          </div>
        </div>
        <div className='info'>
          <div className='imageContainer gap-1'>
            <Image src={privacy_policy} alt='policy' onClick={() => handleMovePage('/Privacy')} />
            <Image src={ic_faq} alt='faq' onClick={() => handleMovePage('/Fqa')} />
          </div>
        </div>
        <div className='platforms'>
          <div className='imageContainer gap-1'>
            <Image src={ic_facebook} alt='facebook' />
            <Image src={ic_instagram} alt='instagram' />
            <Image src={ic_twitter} alt='twitter' />
            <Image src={ic_youtube} alt='youtube' />
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
