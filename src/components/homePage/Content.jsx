import React from 'react';

function Content({ title, description, imageSrc, caption, alignRight, brClassName }) {
  return (
    <section className="main-content">
      <div className={`contents-item ${alignRight ? 'align-right' : ''}`}>
        <img className="content-image" src={imageSrc} alt="" />
        <div className="content-text">
          <div className="caption">{caption}</div>
          <div className="description">
            <h2 className="description-main">
              {title.split('<br />').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br className={brClassName ? brClassName : ''} />
                </React.Fragment>
              ))}
            </h2>
            <p className="description-additional">
            {description.split('<br />').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
                </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
