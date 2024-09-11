const inputTags = document.querySelectorAll('#signup-form input')
const submitBtn = document.querySelector('#signup-submit-btn');

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

function comparePassword() {
  const alert = document.querySelector('.repeat-alert');
  const pw = inputTags[2].value;
  const rpw = inputTags[3].value;

  if (pw === rpw) {
    alert.textContent = '비밀번호와 일치합니다.';
    alert.classList.add('correct');
    alert.classList.remove('warning');
  } else {
    alert.textContent = '비밀번호와 일치하지 않습니다.';
    alert.classList.remove('correct');
    alert.classList.add('warning');
  }
}
// 비밀번호 표기 토글 이벤트 핸들러
function togglePasswordVisibility(event) {
  const inputTag = this.previousElementSibling;
  const type = inputTag.getAttribute('type') === 'password' ? 'text' : 'password';

  // 비밀번호(확인) 입력란을 가리킴
  inputTag.setAttribute('type', type);
  for (const icon of this.children) {
    icon.classList.toggle('hide');
  }
}

document.querySelectorAll('.visibility-btn').forEach(btn => {
  btn.addEventListener('click', togglePasswordVisibility)
})
document.addEventListener('input', checkAllInputFill)
document.querySelector('#input-password-repeat')
  .addEventListener('change', comparePassword)