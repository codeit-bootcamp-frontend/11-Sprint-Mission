'use client';

import Image from 'next/image';

export default function FileUploadInput({
  image,
  setImage,
}: {
  image: string | null;
  setImage: (image: string) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  return (
    <>
      <div className="flex gap-6">
        <div>
          <label
            htmlFor="image"
            className="w-[282px] h-[282px] bg-gray-100 block flex flex-col gap-2 items-center justify-center rounded-lg cursor-pointer mt-3 text-gray-500"
          >
            <div className="w-[48px] h-[48px] relative">
              <Image
                fill
                src="/images/plus.png"
                alt="이미지 등록"
                sizes="(max-width: 640px) 48px 48px"
              />
            </div>
            이미지 등록
          </label>
          <input
            id="image"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        {image && (
          <div className="relative overflow-hidden w-[282px] h-[282px] bg-gray-100 block flex flex-col gap-2 items-center justify-center rounded-lg mt-3 border">
            <Image
              fill
              src={image}
              alt="이미지"
              objectFit="cover"
              sizes="(max-width: 640px) 282px 282px"
            />
          </div>
        )}
      </div>
    </>
  );
}
