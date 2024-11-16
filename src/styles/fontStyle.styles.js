import { css } from 'styled-components';

const baseFont = {
  12: { fontSize: '1.2rem', lineHeight: '1.8rem' },
  13: { fontSize: '1.3rem', lineHeight: '2.2rem' },
  14: { fontSize: '1.4rem', lineHeight: '2.4rem' },
  16: { fontSize: '1.6rem', lineHeight: '2.6rem' },
  18: { fontSize: '1.8rem', lineHeight: '2.6rem' },
  20: { fontSize: '2rem', lineHeight: '3.2rem' },
  24: { fontSize: '2.4rem', lineHeight: '3.2rem' },
  32: { fontSize: '3.2rem', lineHeight: '4.2rem' },
  40: { fontSize: '4rem', lineHeight: '4.8rem' },
};

const fontWeights = {
  r: 400,
  m: 500,
  sb: 600,
  b: 700,
};

// 기본 fontWeight를 400으로 설정하고, 키에 따라 가변적으로 폰트를 가져올 수 있도록 수정
const font = (size) => {
  const [fontSize, weight = 'r'] = size.match(/\d+|[a-z]+/g); // 숫자와 문자를 분리하여 배열로 반환
  const base = baseFont[fontSize];

  if (!base) {
    console.warn(`Font size ${fontSize} is not defined.`);
    return css``; // 정의되지 않은 경우 빈 스타일 반환
  }

  return css`
    font-size: ${base.fontSize};
    line-height: ${base.lineHeight};
    font-weight: ${fontWeights[weight] || fontWeights.r};
  `;
};

export default font;
