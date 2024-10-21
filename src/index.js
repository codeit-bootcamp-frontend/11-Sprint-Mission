import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import './index.css';

// dayjs 설정을 위한 import
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
// dayjs 플러그인 및 언어 등록
dayjs.extend(relativeTime);
dayjs.extend(isLeapYear);
dayjs.locale('ko');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
