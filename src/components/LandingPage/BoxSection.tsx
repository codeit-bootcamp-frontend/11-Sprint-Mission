import React from "react";
import "./Boxsection.css";
import GetTextClass from "../../util/GetTextClass";

interface BoxSectionProps {
  imageSrc: string;
  sectionHead: string;
  bigText1: string;
  bigText2: string;
  smallText1: string;
  smallText2: string;
}

function BoxSection({
  imageSrc,
  sectionHead,
  bigText1,
  bigText2,
  smallText1,
  smallText2,
}: BoxSectionProps) {
  const textClass = GetTextClass(sectionHead);

  return (
    <section className="box">
      <div className="content">
        <img className="box-image" src={imageSrc} alt={sectionHead} />
        <div className={`text ${textClass}`}>
          <p className="section-head">{sectionHead}</p>
          <p className="bigtext first-text">{bigText1}</p>
          <p className="bigtext">{bigText2}</p>
          <p className="smalltext">{smallText1}</p>
          <p className="smalltext">{smallText2}</p>
        </div>
      </div>
    </section>
  );
}

export default BoxSection;
