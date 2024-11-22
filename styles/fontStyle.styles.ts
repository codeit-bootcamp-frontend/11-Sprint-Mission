import { css } from 'styled-components';

type BaseFont = {
  [key: number]: {
    fontSize: string;
    lineHeight: string;
  };
};

type FontWeights = {
  [key: string]: number;
};

const baseFont: BaseFont = {
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

const fontWeights: FontWeights = {
  r: 400,
  m: 500,
  sb: 600,
  b: 700,
};

const font = (size: string): ReturnType<typeof css> => {
  const matches = size.match(/\d+|[a-z]+/g);

  if (!matches) {
    console.warn(`Invalid font size format: ${size}`);
    return css``; // 빈 스타일 반환
  }

  const [fontSizeStr, weight = 'r'] = matches;
  const fontSize = parseInt(fontSizeStr, 10);
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
