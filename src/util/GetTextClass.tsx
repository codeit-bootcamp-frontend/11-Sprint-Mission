const GetTextClass = (sectionHead: string): string => {
  switch (sectionHead) {
    case "Hot item":
      return "main-first-texts";
    case "Search":
      return "main-second-texts";
    case "Register":
      return "main-third-texts";
    default:
      return ""; // 기본 클래스명
  }
};

export default GetTextClass;
