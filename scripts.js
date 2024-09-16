const inputs = document.querySelectorAll('input');
const btn = document.querySelector('button');

// input 필드 체크 --> 모든 input값이 빈 문자열이 아닐 때 true 반환
/** 
 * @todo 입력값 검증
 */
function checkInputs(inputs) {
    for (const input of inputs) {
        if (input.value === '') {
            console.log('false')
            return false;
        }
    }
    console.log('true')
    return true;
}

// btn 업데이트
function updateButton(){
    if (checkInputs(inputs)) {
        btn.classList.add('active');
        console.log('add active')
    } else {
        btn.classList.remove('active');
        console.log('remove active');
    }
}


// 이벤트 리스너 (input필드에 입력이 발생할 때)
for (const input of inputs) {
    input.addEventListener('input', updateButton)
}