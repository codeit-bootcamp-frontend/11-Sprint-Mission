import Image from 'next/image';

export default function PasswordEyeVisibility({
  passwordVisible,
  setPasswordVisible,
}: {
  passwordVisible: boolean;
  setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handlePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <Image
        className="cursor-pointer"
        src={passwordVisible ? '/images/eye-off.png' : '/images/eye-on.png'}
        alt="눈 모양"
        width={24}
        height={24}
        onClick={handlePasswordVisibility}
      />
    </>
  );
}
