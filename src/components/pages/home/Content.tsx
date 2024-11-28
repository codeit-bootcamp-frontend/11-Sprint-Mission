import { renderLines } from "@utills";

interface ContentProps {
  title: string;
  description: string;
  imageSrc: string;
  caption: string;
  alignRight?: Boolean;
}

function Content({
  title,
  description,
  imageSrc,
  caption,
  alignRight,
}: ContentProps) {
  return (
    <section className='main-content'>
      <div className={`contents-item ${alignRight ? 'align-right' : ''}`}>
        <img className='content-image' src={imageSrc} alt='' />
        <div className='content-text'>
          <div className='caption'>{caption}</div>
          <div className='description'>
            <h2 className='description-main'>
              <h2 className='description-main'>{renderLines(title)}</h2>
            </h2>
            <p className='description-additional'>{renderLines(description)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
