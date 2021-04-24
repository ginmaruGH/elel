import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ pageSEO }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          lang
          title
          description
          siteUrl
          locale
          fbAppID
        }
      }
    }
  `);

  const configMeta = data.site.siteMetadata;

  let url;
  if (pageSEO.pagePath) {
    url = `${configMeta.siteUrl}${pageSEO.pagePath}`;
  } else {
    url = configMeta.siteUrl;
  }
  let title;
  if (pageSEO.pageTitle) {
    title = `${pageSEO.pageTitle} | ${configMeta.title}`;
  } else {
    title = configMeta.title;
  }
  let imgUrl;
  if (pageSEO.pageImgSrc) {
    imgUrl = `${configMeta.siteUrl}${pageSEO.pageImgSrc}`;
  } else {
    imgUrl = `${configMeta.siteUrl}/thumb.jpg`;
  }
  const description = pageSEO.pageDesc || configMeta.description;
  const imgWidth = pageSEO.pageImgWidth || 1280;
  const imgHeight = pageSEO.pageImgHeight || 640;

  return (
    <Helmet>
      <html lang={configMeta.lang} />
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content={configMeta.locale} />
      <meta property="og:site_name" content={configMeta.title} />
      <meta property="og:fb:app_id" content={configMeta.fbAppID} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={imgWidth} />
      <meta property="og:image:height" content={imgHeight} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default Seo;
