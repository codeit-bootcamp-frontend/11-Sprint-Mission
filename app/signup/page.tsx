'use client'
import React, { ChangeEvent, FocusEvent, useCallback, useState } from 'react'
import '@/styles/css/style.css'
import * as validation from '@/components/Validation'
import Link from 'next/link'
import Image from 'next/image'
import { Button, TextInput } from '@/components/index'
import { useRouter } from 'next/navigation'
import { panda, ic_google, ic_kakao } from '@/public/common'
import Password from '@/components/Password'

type PasswordType = { password: string; pwdConfirm: string; pwdNotice: string; pwdConfirmNotice: string }

function Signup() {
  const router = useRouter()
  const { emailValidationMsg, inputEmptyCheck } = validation
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [pwdConfirm, setPwdConfirm] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [loginDisabled, setLoginDisabled] = useState<boolean>(true)
  const [emailNotice, setEmailNotice] = useState<string>('')
  const [nicknameNotice, setNicknameNotice] = useState<string>('')
  const [pwdNotice, setPwdNotice] = useState<string>('')
  const [pwdConfirmNotice, setPwdConfirmNotice] = useState<string>('')

  const loginButtonState = useCallback(() => {
    const checkInput = inputEmptyCheck([email, nickname, password, pwdConfirm])
    const checkNotice = inputEmptyCheck([emailNotice, nicknameNotice, pwdNotice, pwdConfirmNotice])
    const newLoginDisabled = !(checkInput && !checkNotice)

    // 상태 변경이 필요할 때만 setLoginDisabled 호출
    if (newLoginDisabled !== loginDisabled) {
      setLoginDisabled(newLoginDisabled)
    }
  }, [email, emailNotice, inputEmptyCheck, loginDisabled, nickname, nicknameNotice, password, pwdConfirm, pwdConfirmNotice, pwdNotice])

  const handleInputBlur = useCallback(
    (inputType: string) => (e: FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      let noticeMsg = ''
      if (inputType === 'email') {
        noticeMsg = emailValidationMsg(inputValue)
        setEmailNotice(noticeMsg)
      } else {
        if (inputValue.length < 1) noticeMsg = '닉네임을 입력해주세요'
        setNicknameNotice(noticeMsg)
      }

      // 알림 활성화
      if (noticeMsg.length > 0) {
        e.target.classList.add('input-notice')
      } else {
        e.target.classList.remove('input-notice')
      }
      loginButtonState()
    },
    [emailValidationMsg, loginButtonState]
  )

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
  }
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNickname(e.target.value)
  }

  const handlePwdChange = useCallback(
    ({ password, pwdConfirm, pwdNotice, pwdConfirmNotice }: PasswordType) => {
      setPassword(password)
      setPwdConfirm(pwdConfirm)
      setPwdNotice(pwdNotice)
      setPwdConfirmNotice(pwdConfirmNotice)
      loginButtonState()
    },
    [loginButtonState]
  )

  const loginClick = () => {
    router.push('/signin')
  }

  return (
    <div className='signup-body'>
      <div className='signup-form'>
        <header className='signup-header'>
          <div className='signup-title'>
            <Image src={panda} alt='panda' />
            <Link href='/'>판다마켓</Link>
          </div>
        </header>
        <main>
          <TextInput
            className='inputBox'
            type='email'
            placeholder='이메일을 입력해주세요'
            onChange={handleEmailChange}
            onBlur={() => handleInputBlur('email')}
          >
            <h3>이메일</h3>
          </TextInput>
          <span id='message' className='notice-email'>
            {emailNotice}
          </span>
          <TextInput
            className='inputBox'
            type='text'
            placeholder='닉네임을 입력해주세요'
            onChange={handleNicknameChange}
            onBlur={() => handleInputBlur('nickname')}
          >
            <h3>닉네임</h3>
          </TextInput>
          <span id='message' className='notice-nickname'>
            {nicknameNotice}
          </span>
          <Password onChange={handlePwdChange} />
          <div className='content'>
            <Button className={`signup-btn ${loginDisabled ?? 'signup-btn-active'}`} disabled={loginDisabled} onClick={loginClick}>
              회원가입
            </Button>
          </div>
          <div className='content'>
            <div className='easy-login'>
              <span>간편 로그인하기</span>
              <div>
                <Link href='https://www.google.com'>
                  <Image src={ic_google} alt='google' />
                </Link>
                <Link href='https://www.kakaocorp.com/page'>
                  <Image src={ic_kakao} alt='kakao' />
                </Link>
              </div>
            </div>
          </div>
          <footer className='login-footer'>
            <div>
              <span className='left'>이미 회원이신가요?</span>
              <Link href='/Login' className='right'>
                로그인
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default Signup
