export const formatDate = (dateString) => {
  return new Date(dateString)
    .toLocaleDateString("ko-KR")
    .replace(/\./g, "")
    .trim()
    .replace(/\s/g, ".");
};

export const timeDifference = (receivedTime) => {
  const currentTime = new Date(); // 현재 시간
  const pastTime = new Date(receivedTime); // 받은 시간 (ISO 형식)

  const timeDifference = currentTime - pastTime; // 밀리초 단위로 시간 차이 계산

  // 밀리초를 초, 분, 시간, 일로 변환
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // 적절한 시간 단위로 반환
  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
};
