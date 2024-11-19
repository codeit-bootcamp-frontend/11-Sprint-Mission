import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export default function Meta({
  title = '판다마켓',
  description = '판다마켓에 오신걸 환영합니다.',
  url = window.location.href,
  image = window.location.origin + '/favicon.svg',
}: Props) {
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
