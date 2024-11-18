// 가격을 포맷팅하는 함수
export const formatPrice = (price?: number | null): string => {
  if (price == null || isNaN(price)) {
    return '0';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 등록 날짜를 포맷팅하는 함수
export const formatRegistrationDate = (dateString: string): string => {
  const registrationDate = new Date(dateString);
  const currentDate = new Date();

  // 날짜가 유효한지 체크
  if (isNaN(registrationDate.getTime())) {
    return '날짜 정보 없음';
  }

  const timeDifference = currentDate.getTime() - registrationDate.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  if (hoursDifference < 24) {
    const roundedHours = Math.floor(hoursDifference);
    return roundedHours < 1 ? '방금 전' : `${roundedHours}시간 전`;
  } else {
    const year = registrationDate.getFullYear();
    const month = String(registrationDate.getMonth() + 1).padStart(2, '0');
    const day = String(registrationDate.getDate()).padStart(2, '0');
    return `${year} .${month} .${day}`;
  }
};
