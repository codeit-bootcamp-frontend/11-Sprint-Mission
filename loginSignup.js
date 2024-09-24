// 이메일
const email = document.querySelector('#email');
const emailNull = document.querySelector('.email-null');
const emailCheck = document.querySelector('.email-check');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener('blur', function() {
  const emailValue = email.value;

//   값이 없을 경우
  if (!emailValue) {
    email.classList.add('error');
    emailNull.style.display = 'block';
    emailCheck.style.display = 'none';
  } 

//   이메일 형식에 맞지 않는 경우
  else if (!emailPattern.test(emailValue)) {
    email.classList.add('error');
    emailNull.style.display = 'none';
    emailCheck.style.display = 'block';
  } 

  else {
    email.classList.remove('error');
    emailNull.style.display = 'none';
    emailCheck.style.display = 'none';
  }
});


// 비밀번호
const password = document.querySelector('#password');

const passwordNull = document.querySelector('.password-null');
const passwordCheck = document.querySelector('.password-check');

password.addEventListener('blur',function(){

    //   값이 없을 경우
    if(!password.value){
        password.classList.add('error');
        passwordNull.style.display = 'block';
    }

    // 비밀번호가 8자 미만
    else if(password.value.length < 8){
            password.classList.add('error');
            passwordCheck.style.display = 'block';
        }
    
    else{
        password.classList.remove('error');
        passwordNull.style.display = 'none';
        passwordCheck.style.display = 'none';
    }
}); 

// 비밀번호 확인 일치하지 않는 경우
const passwordVerify = document.querySelector('#password-verify');
const passwordDifferent = document.querySelector('.password-different')

passwordVerify.addEventListener('blur',function(){
    if(password.value != passwordVerify.value){
        passwordVerify.classList.add('error');
        passwordDifferent.style.display = 'block';
    } else{
        passwordVerify.classList.remove('error');
        passwordDifferent.style.display = 'none';
    }
});


// 닉네임
const username = document.querySelector('#username');
const usernameNull = document.querySelector('.username-null');
username.addEventListener('blur',function(){
    if(!username.value){
        username.classList.add('error');
        usernameNull.style.display = 'block';
    }else{
        username.classList.remove('error');
        usernameNull.style.display = 'none';
    }
});

