//눈 모양 아이콘 클릭시 비밀번호의 문자열 및 사진 변경하는 함수
//parameter : 눈 모양 아이콘 img document

export function activePasswordVisibility(visibilityToggle) {
  const img = visibilityToggle.getAttribute('src');
  const newImg = img === 'img/btn_visibility_off.svg' ? 'img/btn_visibility_on.svg' : 'img/btn_visibility_off.svg';
  const newInput = newImg.includes('on') ? 'text' : 'password';

  visibilityToggle.setAttribute('src', newImg);
  visibilityToggle.previousElementSibling.setAttribute('type', newInput);
}