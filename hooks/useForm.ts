import { useEffect, useState } from 'react';
import { getValidationErrorMessage } from '../utils/formValidation'; // 유효성 검사 함수

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

function useForm(initialValues: FormValues) {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    validateField(name, value);
  };

  // 개별 필드 유효성 검사
  const validateField = (name: string, value: string) => {
    const errorMessage = getValidationErrorMessage({ name, value });

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage || '',
    }));
  };

  // 전체 폼의 유효성 검사
  useEffect(() => {
    const allFieldsValid =
      Object.values(formErrors).every((error) => !error) &&
      Object.values(formValues).every((value) => value.trim() !== '');

    setIsFormValid(allFieldsValid);
  }, [formErrors, formValues]);

  return {
    formValues,
    formErrors,
    isFormValid,
    handleChange,
  };
}

export default useForm;
