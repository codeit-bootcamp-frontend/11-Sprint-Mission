import React from 'react';

function Hero({ title, buttonText, imageSrc, altText, isBottom }) {
  return (
    <section className={`hero ${isBottom ? 'hero-bottom' : ''}`}>
      <div className="hero-container">
        <div className={`hero-cta ${isBottom ? 'hero-cta-bottom' : 'hero-cta-top'}`}>
          <h2 className={`description-main ${isBottom ? 'description-main-bottom' : ''}`}>
            {title.split('<br />').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h2>
          {buttonText && <a href="/pages/items.html" className="btn see-more">{buttonText}</a>}
        </div>
        <img id={isBottom ? 'img-home-bottom' : 'img-home-top'} src={imageSrc} alt={altText} />
      </div>
    </section>
  );
}

export default Hero;
