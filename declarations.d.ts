declare module "*.svg" {
  import * as React from "react";

  // ReactComponent는 SVG를 React 컴포넌트로 사용할 수 있게함
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  // ReactComponent와 SVG 파일의 경로(src)를 함께 export
  const src: string;
  export default src;
}

declare module "*.png" {
  const value: string;
  export default value;
}
