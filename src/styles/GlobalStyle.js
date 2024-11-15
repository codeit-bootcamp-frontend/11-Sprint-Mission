import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --blue-100: #3692ff;
    --blue-200: #1967d6;
    --blue-300: #1251aa;

    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;

    --red: #f74747;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body > *,
  textarea {
    font-family: 'Pretendard', sans-serif;
  }

  h1, h2, h3, h4, h5, p {
    color: var(--gray-800);
  }
`;

export default GlobalStyle;
