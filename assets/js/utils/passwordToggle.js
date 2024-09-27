/**
 * 비밀번호 입력 타입을 전환하는 함수
 * @param {string} currentType - 현재 비밀번호 입력 타입 ('password' 또는 'text')
 * @returns {string} - 새로운 비밀번호 입력 타입 ('password' 또는 'text')
 */
function togglePasswordType(currentType) {
  return currentType === 'password' ? 'text' : 'password';
}

/**
 * 패스워드 가시성 전환 토글 아이콘 이벤트 함수
 * @param {NodeList} toggleIcons - 토글 아이콘 요소들
 */
export default function togglePasswordVisibility(toggleIcons) {
  toggleIcons.forEach(toggleIcon => {
    toggleIcon.addEventListener('click', () => {
      const passwordInput = toggleIcon.previousElementSibling;
      const newType = togglePasswordType(passwordInput.type);

      passwordInput.type = newType;
      toggleIcon.classList.toggle('active', newType === 'text');
    });
  });
}