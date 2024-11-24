/**
 * 좋아요 수 포맷
 * @param {number} likeCount 좋아요 수
 * @param {number} maxLike 최대 좋아요 수
 * @returns {string} 포맷된 좋아요 수
 */
const formatMaxCount = (likeCount: number, maxLike: number = 9999): string => {
  return likeCount > maxLike ? maxLike.toLocaleString() + '+' : likeCount.toLocaleString();
};

export default formatMaxCount;
