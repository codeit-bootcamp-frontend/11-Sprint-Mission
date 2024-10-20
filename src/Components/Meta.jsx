import { Helmet } from 'react-helmet';
import { TITLE } from '../info';

function Meta({ title = TITLE, description, url, image }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image || window.location.origin + '/favicon.svg'} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default Meta;
