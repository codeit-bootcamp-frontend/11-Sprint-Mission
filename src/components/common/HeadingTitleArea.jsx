import React from "react";
import styles from "./HeadingTitleArea.module.scss";
import classNames from "classnames";

let headingStyle = "";

function HeadingTitleArea({ children }) {
  // HeadingTitleArea components children 순회
  React.Children.forEach(children, (child) => {
    // 조건 여부 체크
    if (React.isValidElement(child)) {
      if (child.type === "h2") {
        headingStyle = styles.h2Margin;
      } else if (child.type === "h3") {
        headingStyle = styles.h3Margin;
      }
    }
  });

  return (
    <div className={classNames(styles.heading, headingStyle)}>{children}</div>
  );
}

export default HeadingTitleArea;
