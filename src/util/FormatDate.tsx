export const FormatDate = (date: Date | string): string => {
  const validDate = date instanceof Date ? date : new Date(date);
  return validDate.toLocaleDateString("ko-kr", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const FormatDateAgo = (date: Date | string): string => {
  const validDate = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const timeDiffer = now.getTime() - validDate.getTime();

  const seconds = Math.floor(timeDiffer / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return "방금 전";
  }
};
