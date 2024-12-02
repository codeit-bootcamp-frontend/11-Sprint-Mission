export default function getElapsedTime(ios) {
  const begin = new Date(ios);
  const end = new Date();
  const diff = end - begin;

  return Math.floor(diff / 1000);
}
