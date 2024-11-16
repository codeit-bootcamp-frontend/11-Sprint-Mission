import { Helmet } from 'react-helmet-async';
import { TITLE } from '../info';

function Meta({
  title = TITLE,
  description = `${TITLE}에 오신걸 환영합니다.`,
  url = window.location.href,
  image = window.location.origin + '/favicon.svg',
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default Meta;
