;(function() {
  /**
   * 폼 필수 input 체크
   * - 필수 input 이 전부 빈값이면 서브밋 버튼 비활성화
   */
  const fmLogin = document.getElementById('form-login');
  const btn = document.getElementById('btn-login');
  const reqs = document.querySelectorAll('#form-login [required]');

  function chkRequired () {
    // console.log('fn:chkInput');

    for (let input of reqs) {
      if (input.value.trim() === '') {
        btn.disabled = true;
        return ;
      }
    }
    btn.disabled = false;
  }

  fmLogin.addEventListener('input', chkRequired);
}());