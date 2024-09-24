;(() => {
  /**
   * 폼 필수 input 체크
   * - 필수 input 이 전부 빈값이면 서브밋 버튼 비활성화
   */
  const fmLogin = document.getElementById('form-login');
  const btn = document.getElementById('btn-login');
  const reqs = document.querySelectorAll('#form-login [required]');

  // 요소 체크
  if (!fmLogin || !btn || reqs.length === 0) {
    console.error('필수 요소가 부족합니다.');
    return;
  }
  
  const chkRequired = () => {
    btn.disabled = Array.from(reqs).some(input => input.value.trim() === '');
  }

  // form 에 이벤트 위임
  fmLogin.addEventListener('input', chkRequired);

  // 초기화
  chkRequired();
})();