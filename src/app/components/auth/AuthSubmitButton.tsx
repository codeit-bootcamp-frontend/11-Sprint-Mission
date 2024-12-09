export default function AuthSubmitButton({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) {
  return (
    <>
      <button
        className="mt-4 rounded-full w-full h-14 bg-blue text-white text-xl font-semibold disabled:bg-gray-400"
        disabled={!isValid}
      >
        {text}
      </button>
    </>
  );
}
