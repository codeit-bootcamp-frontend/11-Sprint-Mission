'use client'
import React, { ChangeEvent, useState } from 'react'
import TextInput from './TextInput'
import Button from './Button'
import { pwdValidationMsg } from './Validation'
interface PasswordType {
  onChange: (values: { password: string; pwdConfirm: string; pwdNotice: string; pwdConfirmNotice: string }) => void
}
function Password({ onChange }: PasswordType) {
  const [password, setPassword] = useState<string>('')
  const [pwdConfirm, setPwdConfirm] = useState<string>('')
  const [passwordType, setPasswordType] = useState<string>('password')
  const [pwdConfirmType, setPwdConfirmType] = useState<string>('password')
  const [pwdNotice, setPwdNotice] = useState<string>('')
  const [pwdConfirmNotice, setPwdConfirmNotice] = useState<string>('')

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value)
  }
  const handlePwdConfirmChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPwdConfirm(e.target.value)
  }

  const showPassword = (type: string) => {
    if (type === 'pwd') {
      const returnType = passwordType.length > 0 ? '' : 'password'
      setPasswordType(returnType)
    } else {
      const returnType = pwdConfirmType.length > 0 ? '' : 'password'
      setPwdConfirmType(returnType)
    }
  }

  const handleInputBlur = (type: string) => {
    const checkType = type !== 'pwd'
    let noticeMsg = ''
    noticeMsg = pwdValidationMsg({ pwd: password, comfirm: pwdConfirm })
    if (checkType) {
      setPwdConfirmNotice(noticeMsg)
    } else {
      setPwdNotice(noticeMsg)
    }
    onChange({
      password: password,
      pwdConfirm: pwdConfirm,
      pwdNotice: pwdNotice,
      pwdConfirmNotice: pwdConfirmNotice,
    })
  }

  return (
    <>
      <div className='inputBox-eye'>
        <TextInput
          id='password'
          className='inputBox'
          type={passwordType}
          placeholder='비밀번호를 입력해주세요'
          onChange={handlePasswordChange}
          onBlur={() => handleInputBlur('pwd')}
        >
          <h3>비밀번호</h3>
          <Button className='eye' onClick={() => showPassword('pwd')} />
        </TextInput>
        <span id='message' className='notice-password'>
          {pwdNotice}
        </span>
      </div>
      <div className='inputBox-eye'>
        <TextInput
          className='inputBox'
          type={pwdConfirmType}
          placeholder='비밀번호를 확인을 위해 다시 입력해주세요'
          onChange={handlePwdConfirmChange}
          onBlur={() => handleInputBlur('pwdConfirm')}
        >
          <h3>비밀번호 확인</h3>
          <Button className='eye' onClick={() => showPassword('pwdConfirm')} />
        </TextInput>
        <span id='message' className='notice-password-confirm'>
          {pwdConfirmNotice}
        </span>
      </div>
    </>
  )
}

export default Password
