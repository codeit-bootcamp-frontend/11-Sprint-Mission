const inputs = document.querySelectorAll('input');
const btn = document.querySelector('button');

// input 필드 체크 --> input값이 빈 문자열이 아닐 때 true 반환
/** 
 * @todo 입력값 검증
 */
function checkInputs(inputs) {
    for (const input of inputs) {
        if (input.value === '') {
            return false;
        }
    }
    return true;
}

// btn 업데이트
function updateButton(){
    checkInputs(inputs) ? btn.classList.add('active') : btn.classList.remove('active');
}

// 이벤트 리스너 (input필드에 입력이 발생할 때)
inputs.forEach (input => input.addEventListener('input', updateButton));