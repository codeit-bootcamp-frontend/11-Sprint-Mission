;(function() {
  /**
   * 로그인 폼
   * - 아이디와 패스워드가 빈값이면 버튼 비활성화
   */
  const fmLogin = document.getElementById('form-login');
  const id = document.getElementById('email');
  const pw = document.getElementById('pw');
  const btn = document.getElementById('btn-login');

  function chkInput () {
    // console.log('fn:chkInput');
    if (id.value.trim() && pw.value.trim()) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  }

  fmLogin.addEventListener('input', chkInput);
}());