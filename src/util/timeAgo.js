
export function timeAgo(updatedAt) {
  const now = new Date();
  const updatedTime = new Date(updatedAt);
  const diffInSeconds = Math.floor((now - updatedTime) / 1000);

  const timeIntervals = {
    year: 60 * 60 * 24 * 365,
    month: 60 * 60 * 24 * 30,
    week: 60 * 60 * 24 * 7,
    day: 60 * 60 * 24,
    hour: 60 * 60,
    minute: 60,
  };

  if (diffInSeconds >= timeIntervals.year) {
    const years = Math.floor(diffInSeconds / timeIntervals.year);
    return `${years}년 전`;
  } else if (diffInSeconds >= timeIntervals.month) {
    const months = Math.floor(diffInSeconds / timeIntervals.month);
    return `${months}달 전`;
  } else if (diffInSeconds >= timeIntervals.week) {
    const weeks = Math.floor(diffInSeconds / timeIntervals.week);
    return `${weeks}주 전`;
  } else if (diffInSeconds >= timeIntervals.day) {
    const days = Math.floor(diffInSeconds / timeIntervals.day);
    return `${days}일 전`;
  } else if (diffInSeconds >= timeIntervals.hour) {
    const hours = Math.floor(diffInSeconds / timeIntervals.hour);
    return `${hours}시간 전`;
  } else if (diffInSeconds >= timeIntervals.minute) {
    const minutes = Math.floor(diffInSeconds / timeIntervals.minute);
    return `${minutes}분 전`;
  } else {
    return `방금 전`;
  }
}
