export const FormatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-kr", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const FormatDateAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDiffer = now - date;

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
