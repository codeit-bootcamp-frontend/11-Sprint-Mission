document.addEventListener('DOMContentLoaded', function (){
  const headerTemplate = `
  <div class="container">
    <h1 class="logo">
      <a href="/">
        <picture>
          <source srcset="assets/images/mobiles/logo.png" media="(max-width: 767px)">
          <img src="assets/images/logo.png" alt="판다마켓 로고">
        </picture>
      </a>
    </h1>
    <div class="btn-login">
      <a href="/login.html" class="button square blue">로그인</a>
    </div>
  </div>
  `;
  const headerEl = document.getElementById('header');
  if(headerEl){
    headerEl.innerHTML = headerTemplate;
  }
});
