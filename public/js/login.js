const inputTags = document.querySelectorAll('#login-form input')
const submitBtn = document.querySelector('#login-submit-btn');

// 입력란을 모두 채웠는지 확인
function checkAllInputFill() {
  let isAllFill = true; 
  inputTags.forEach(tag => {
    if(tag.value === '') isAllFill = false;
  })
  
  if(isAllFill){
    submitBtn.classList.add('active');
  } else {
    submitBtn.classList.remove('active');
  }
}

// 비밀번호 표기 토글 이벤트 핸들러
function togglePasswordVisibility(event) {
  const inputTag = this.previousElementSibling;
  const type = inputTag.getAttribute('type') === 'password' ? 'text' : 'password';

  // 비밀번호 입력란을 가리킴
  inputTag.setAttribute('type', type);
  for (const icon of this.children) {
    icon.classList.toggle('hide');
  }
}


document.querySelector('.visibility-btn')
  .addEventListener('click', togglePasswordVisibility)
document.addEventListener('input', checkAllInputFill)
