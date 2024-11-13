import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import airbnbConfig from 'eslint-config-airbnb';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  airbnbConfig, // Airbnb 규칙 추가
  prettierConfig,
  {
    rules: {
      // Airbnb 기본 규칙에서 커스텀 규칙 설정
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.js'] },
      ],
      'react/react-in-jsx-scope': 'off', // React 17+에서는 필요 없음
      'no-console': 'warn', // console.log 사용 시 경고
      'import/prefer-default-export': 'off', // named export 허용
      'react/prop-types': 'off', // PropTypes 사용하지 않을 경우
    },
  },
];
