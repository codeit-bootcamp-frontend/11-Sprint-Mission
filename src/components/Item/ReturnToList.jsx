import { Link } from "react-router-dom";

const ReturnToList = ({ className }) => {
  return (
    <div className={className}>
      <Link to="/items">목록으로 돌아가기</Link>
    </div>
  );
};

export default ReturnToList;
