function getHeaderTemplate(){
  return `
      <div class="container">
        <h1 class="logo">
          <a href="/">
            <picture>
              <source srcset="assets/images/mobiles/logo.png" media="(max-width: 767px)">
              <img src="assets/images/logo.png" alt="��다마�� 로고">
            </picture>
          </a>
        </h1>
        <div class="btn-login">
          <a href="/login.html" class="button square blue">로그인</a>
        </div>
      </div>
    `;
}
function getHeaderRender(){
  const headerEl = document.getElementById('header');
  if(headerEl){
    headerEl.innerHTML = getHeaderTemplate();
  }
}
export default getHeaderRender;