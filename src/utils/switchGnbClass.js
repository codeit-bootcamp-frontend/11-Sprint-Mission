export function switchGnbClass(navClass) {
  const classHead = 'gnb-';
  const bodyClassList = document.body.classList;
  const r = [...bodyClassList].find((item) => item.startsWith(classHead));
  if (r) bodyClassList.remove(r);
  bodyClassList.add(classHead + navClass);
}
