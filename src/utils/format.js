export const formatPrice = (price) => {
  if (price == null) {
    return '0';
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatRegistrationDate = (isDate) => {
  const registrationDate = new Date(isDate);
  const currentDate = new Date();
  const timeDifference = currentDate - registrationDate;
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
