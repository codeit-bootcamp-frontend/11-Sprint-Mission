/**
 * 갯수 출력 포맷
 * @param {number} count 갯수
 * @param {number} maxCount 최대 갯수
 * @returns {string} 포맷된 갯수
 */
const formatMaxCount = (count: number, maxCount: number = 9999): string => {
  return count > maxCount ? maxCount.toLocaleString() + '+' : count.toLocaleString();
};

export default formatMaxCount;
