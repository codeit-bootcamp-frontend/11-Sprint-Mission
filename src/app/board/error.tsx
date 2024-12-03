'use client';

export default function Error({ error }: { error: string | Error }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="h2 mb-2 mt-10">에러가 발생했습니다.</h2>
      <p>잠시 후 다시 시도해주세요.</p>
      <span className="mt-10 text-gray-500 text-sm">
        (Error: {typeof error === 'string' ? error : error.message})
      </span>
    </div>
  );
}
