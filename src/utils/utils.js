/**
 * body 에 gnb 클래스를 이용하여 nav 메뉴 활성 제어
 * @param {string} 'gnb-' 다음에 적을 클래스
 */
function switchGnbClass(navClass) {
  const classHead = 'gnb-';
  const bodyClassList = document.body.classList;
  // gnb- 로 시작하는 클래스 있는지 확인 -> 있으면 삭제
  const r = [...bodyClassList].find((item) => item.startsWith(classHead));
  if (r) bodyClassList.remove(r);
  // navClass 가 있을면 추가
  if (navClass) bodyClassList.add(classHead + navClass);
}

/**
 * 날짜 형식에 맞춰 반환
 * @param {Date} date
 * @return {string} 형식에 맞춘 날짜
 */
function getFormatDate(date) {
  const d = new Date(date);
  return d.toISOString().slice(0, 10).split('-').join('. ');
  // return `${d.getFullYear()}. ${(d.getMonth() + 1).toString().padStart(2, '0')}. ${d.getDate()}`;
}

export { switchGnbClass, getFormatDate };
