import { useState } from "react";
import { Inner, Label, Textarea, Button } from "./ContactUs.style";

const ContactUs = () => {
  const [textarea, setTextarea] = useState("");

  const onChange = (e) => {
    setTextarea(e.target.value);
  };

  return (
    <Inner>
      <Label htmlFor="contactUs">문의하기</Label>

      <Textarea
        id="contactUs"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        value={textarea}
        onChange={onChange}
      ></Textarea>

      <Button disabled={textarea === ""}>등록</Button>
    </Inner>
  );
};

export default ContactUs;
