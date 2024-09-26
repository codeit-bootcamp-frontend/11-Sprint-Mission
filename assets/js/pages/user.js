import { initFormValidation } from '../utils/formValidation.js';
import togglePasswordVisibility from '../utils/passwordToggle.js';

const privateToggleIcons = document.querySelectorAll('.toggle-icon'); 

// userForm 유효성 검사
initFormValidation('userForm');
// 프라이빗 토글 아이콘 이벤트 함수
togglePasswordVisibility(privateToggleIcons);

