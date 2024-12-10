import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import { Auth } from '@/types/auth';

export default function AuthInput({
  name,
  id,
  type,
  errors,
  register,
  validate = {},
}: Readonly<{
  name: string;
  id: keyof Auth;
  type: string;
  errors: FieldErrors<Auth>;
  register: UseFormRegister<Auth>;
  validate?: RegisterOptions<Auth>;
}>) {
  // value 값에 공백이 들어가지 않도록 처리
  const preventSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s/g, '');
  };

  // 스페이스바 입력 후 focus 이벤트 발생 방지
  const handlePreventSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  return (
    <>
      <div>
        <label htmlFor={id} className="text-gray-900 text-lg font-semibold">
          {name}
        </label>
        <input
          id={id}
          type={type}
          className="input mt-4 mb-6"
          placeholder={`${name === '비밀번호' ? '비밀번호를' : name + '을'} 입력해주세요.`}
          onInput={preventSpace}
          onKeyDown={handlePreventSpace}
          {...register(id, validate)}
        />
        {errors[id] && (
          <span className="text-red-600 mb-5 mt-[-10px] block">
            {errors[id].message}
          </span>
        )}
      </div>
    </>
  );
}
