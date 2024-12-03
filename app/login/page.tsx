'use client'
import React, { ChangeEvent, FocusEvent, useCallback, useEffect, useState } from 'react'
import * as validation from '@/components/Validation'
import '@/styles/css/style.css'
import Image from 'next/image'
import Link from 'next/link'
import { TextInput } from '@/components/index'
import { useRouter } from 'next/navigation'
import { Button } from '@headlessui/react'
import { panda, ic_google, ic_kakao } from '@/public/common'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginDisabled, setLoginDisabled] = useState<boolean>(true)
  const [emailNotice, setEmailNotice] = useState<string>('')
  const [pwdNotice, setPwdNotice] = useState<string>('')
  const [passwordType, setPasswordType] = useState<string>('password')
  const { emailValidationMsg, inputEmptyCheck } = validation
  const router = useRouter()

  const showPassword = () => {
    const returnType = passwordType.length > 0 ? '' : 'password'
    setPasswordType(returnType)
  }

  const handleInputBlur = useCallback(
    (inputType: string) => (e: FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      let noticeMsg = ''
      if (inputType === 'email') {
        noticeMsg = emailValidationMsg(inputValue)
        setEmailNotice(noticeMsg)
      } else {
        noticeMsg = validation.pwdValidationMsg({ pwd: inputValue })
        setPwdNotice(noticeMsg)
      }

      // 알림 활성화
      if (noticeMsg.length > 0) {
        e.target.classList.add('input-notice')
      } else {
        e.target.classList.remove('input-notice')
      }
    },
    [emailValidationMsg]
  )

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value)
  }

  const handleMovePage = (value: string) => {
    router.push(value)
  }

  useEffect(() => {
    const checkInput = inputEmptyCheck([email, password])
    const checkNotice = inputEmptyCheck([emailNotice, pwdNotice])
    if (checkInput && !checkNotice) {
      setLoginDisabled(true)
    } else {
      setLoginDisabled(false)
    }
  }, [email, emailNotice, inputEmptyCheck, password, pwdNotice])

  return (
    <div className='login-body'>
      <div className='login-form'>
        <header className='login-header'>
          <div className='login-title'>
            <Image src={panda} alt='panda' />
            <Link href={'/'}>판다마켓</Link>
          </div>
        </header>
        <main>
          <TextInput
            className='inputBox'
            type='email'
            placeholder='이메일을 입력해주세요'
            onChange={handleEmailChange}
            onBlur={handleInputBlur('email')}
          >
            <h3>이메일</h3>
          </TextInput>
          <span id='message' className='notice-email'>
            {emailNotice}
          </span>
          <div className='inputBox-eye'>
            <TextInput
              id='password'
              className='inputBox'
              type='password'
              placeholder='비밀번호를 입력해주세요'
              onChange={handlePasswordChange}
              onBlur={handleInputBlur('pwd')}
            >
              <h3>비밀번호</h3>
              <Button className='eye' onClick={showPassword} />
            </TextInput>
            <span id='message' className='notice-password'>
              {pwdNotice}
            </span>
          </div>
          <div className='content'>
            <Button className='login-btn' disabled={loginDisabled} onClick={() => handleMovePage('/items')}>
              로그인
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
              <span className='left'>판다마켓이 처음이신가요?</span>
              <Link className='right' href={'/signup'}>
                회원가입
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default Login
