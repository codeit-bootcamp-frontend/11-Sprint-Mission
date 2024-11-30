import FileUploadInput from '@/components/board/addboard/FileUploadInput';

export default function Page() {
  return (
    <>
      <div className="mt-10 mb-24 container">
        <div>
          <h2 className="h2 mb-6">게시글 쓰기</h2>
          <form>
            <label htmlFor="title" className="h3">
              *제목
            </label>
            <input
              id="title"
              type="text"
              className="input h-[56px] mb-6 mt-3"
              placeholder="제목을 입력해주세요"
            />
            <label htmlFor="content" className="h3">
              *내용
            </label>
            <textarea
              id="content"
              className="input h-[282px] mb-6 mt-3 resize-none"
              placeholder="내용을 입력해주세요"
            />
            <label className="h3">이미지</label>
            <FileUploadInput />
          </form>
        </div>
      </div>
    </>
  );
}
