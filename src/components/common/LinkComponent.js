import React from "react";

const LinkComponent = ({ url, iconSrc, altText, children }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={url}>
      {iconSrc && <img src={iconSrc} alt={altText} />}
      {children}
    </a>
  );
};

export default LinkComponent;
