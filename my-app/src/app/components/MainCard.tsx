import Image from "next/image";
import { Mcard } from "../type/type";

export default function MainCard({
  imgSrc,
  alt,
  title,
  description1,
  description2,
  isSpecial,
}: Mcard) {
  return (
    <>
      <div
        className={`flex flex-col lg:flex-row lg:items-center gap-[24px] mb-[40px] lg:mb-0 lg:bg-gray70 ${
          isSpecial ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="w-full h-auto lg:max-w-[579px]">
          <Image
            className="object-contain"
            src={imgSrc}
            alt={alt}
            width={588}
            height={444}
          />
        </div>
        <div className={`${isSpecial ? "text-right" : "text-left"}`}>
          <p className="text-skyblue font-bold">{title}</p>
          <p className="text-foreground text-[24px] font-bold mt-[8px] mb-[16px]">
            {description1}
          </p>
          <p className="text-gray500">{description2}</p>
        </div>
      </div>
    </>
  );
}
