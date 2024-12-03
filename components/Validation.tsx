// 이메일 조건 체크
const emailValidationMsg = (emailValue: string) => {
  let massage = ''
  const emailStrimValue = emailValue.trim()
  if (emailStrimValue.length < 1) {
    massage = '이메일을 입력해주세요.'
  } else {
    const refEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i

    if (!refEx.test(emailStrimValue)) {
      massage = '잘못된 이메일 형식입니다.'
    }
  }

  return massage
}

interface PwdValidationMsgType {
  pwd: string
  comfirm?: string
}

// 비밀번호 조건 체크
const pwdValidationMsg = ({ pwd, comfirm }: PwdValidationMsgType) => {
  let massage = ''
  const pwdTrim = pwd.trim()

  if (comfirm) {
    const comfirmTrim = comfirm.trim()
    if (pwdTrim !== comfirmTrim) {
      massage = '비밀번호가 일치하지 않습니다.'
    }
  } else {
    if (pwdTrim.length < 1) {
      massage = '비밀번호를 입력해주세요.'
      return massage
    }

    if (pwdTrim.length < 8) {
      massage = '비밀번호를 8자 이상 입력해주세요.'
    }
  }

  return massage
}

const inputEmptyCheck = (inputArr: Array<string>) => {
  return inputArr.every(input => input.trim() !== '')
}

export { emailValidationMsg, pwdValidationMsg, inputEmptyCheck }
