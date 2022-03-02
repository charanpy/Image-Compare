import Head from 'next/head';

const Seo = ({
  ogTitle = 'Face Compare',
  description = 'Detect and compare images',
  ogImage = '/vercel.svg',
}) => {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Face Compare</title>
      <meta name='robots' content='index, follow' />
      <link rel='icon' href='/vercel.svg' />
      <meta name='author' content='Charan' />
      <meta name='description' content='Detect and compare images' />
      <meta
        name='keyword'
        content='face recognition,face detection,aws rekognition,code example,face compare,Image recognition,Image detection'
      />
      <meta property='og:title' content={ogTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:url' content='' />
      <meta property='og:type' content='website' />

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={ogTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={ogImage} />
    </Head>
  );
};

export default Seo;
