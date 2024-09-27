//눈 모양 아이콘 클릭시 비밀번호의 문자열 및 사진 변경하는 함수
//parameter : 눈 모양 아이콘 img document

export function activePasswordVisibility(visibilityToggle) {
  const img = visibilityToggle.getAttribute('src');
  const newImg = img === 'img/btn_visibility_off.svg' ? 'img/btn_visibility_on.svg' : 'img/btn_visibility_off.svg';
  const newInput = newImg.includes('on') ? 'text' : 'password';

  visibilityToggle.setAttribute('src', newImg);
  visibilityToggle.previousElementSibling.setAttribute('type', newInput);
}

//input 값 올바른지 확인 후, 빨간색 아웃라인을 추가하는 함수 

export function checkInputFormat(event, passwordInput) {
  const input = event.target;
  console.log(input);
  const hasValue = event.target.value.length > 0; //기본적으로 label에 값이 있는지 확인하기

  const checkInputRules = {
    email : {
      hasValueError: '이메일을 입력해주세요',
      formatError: '잘못된 이메일 형식입니다',
      validate: (value) => checkEmailFormat(value),
    },
    password : {
      hasValueError: '비밀번호를 입력해주세요',
      formatError: '비밀번호를 8자 이상 입력해주세요.',
      validate: (value) => value.length >= 8,
    },
    nickname : {
      hasValueError: '닉네임을 입력해주세요',
      validate: (value) => value.length >= 1,
    },
    checkpassword : {
      formatError: '비밀번호가 일치하지 않습니다.',
      validate: (value) => passwordInput === value,
    }

  }

  const inputType = input.name.includes('email') ? 'email' : 
                    input.name.includes('check') ? 'checkpassword' :
                    input.name.includes('password') ? 'password' : 
                    input.name.includes('nickname') ? 'nickname' : 
                    null;

  if(inputType == 'password') {
    passwordInput = input.value;
  }

  if(inputType) {
    const { hasValueError, formatError, validate} = checkInputRules[inputType];

    console.log('password: ' + passwordInput);

    if(!hasValue) {
      input.classList.toggle('error', true);
      console.log(hasValueError);
      return [inputType, false];
    } else if(!validate(input.value)) {
      input.classList.toggle('error', true);
      console.log(formatError);
      return [inputType, false];
    } else {
      input.classList.toggle('error', false);
      return [inputType, true];
    }

  }
  return [inputType, false];
}


function updateSignUpValidity(inputType, isValid) {
  switch (inputType) {
    case 'email':
      let isEmailValid = isValid;
      break;
    case 'password':
      let isPasswordValid = isValid;
      break;
    case 'nickname':
      let isNicknameValid = isValid;
      break;
    case 'checkpassword':
      let isCheckPasswordValid = isValid;
      break;
  }
}

//input에 이메일 형식을 test하는 함수 

function checkEmailFormat(input){
  let email_format = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  //console.log('test: ' + email_format.test(input))

  return email_format.test(input);
}