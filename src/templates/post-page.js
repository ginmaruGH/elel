import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { slugify } from "../utils/helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faUpload,
  faEdit,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const pageTemplate = ({ data, pageContext, location }) => {

  const remark = data.markdownRemark;
  const frontmatter = remark.frontmatter;
  const pageNode = {
    pagePath: location.pathname,
    pageTitle: frontmatter.title,
    pageDesc: remark.excerpt,
    pageImgSrc: frontmatter.thumbnail.childImageSharp.original.src,
    pageImgWidth: frontmatter.thumbnail.childImageSharp.original.width,
    pageImgHeight: frontmatter.thumbnail.childImageSharp.original.height,
  };
  const thumbnail = frontmatter.thumbnail.childImageSharp.gatsbyImageData;
  const thumbnailAlt = frontmatter.description;

  let prev = {};
  if (pageContext.previous) {
    prev = {
      link: `/blog/pages${pageContext.previous.fields.slug}`,
      title: pageContext.previous.frontmatter.title,
    };
  } else {
    prev = null;
  }
  let next = {};
  if (pageContext.next) {
    next = {
      link: `/blog/pages${pageContext.next.fields.slug}`,
      title: pageContext.next.frontmatter.title,
    };
  } else {
    next = null;
  }

  return (
    <Layout>
      <Seo pageSEO={pageNode} />
      <div className="eyecatch">
        <figure>
          <GatsbyImage
            image={thumbnail}
            alt={thumbnailAlt}
            style={{ height: "100%" }}
          />
        </figure>
      </div>

      <article className="content">
        <div className="container">
          <h1 className="bar">{frontmatter.title}</h1>

          <aside className="info">
            <div className="datetime">
              <time dateTime={frontmatter.pubDate}>
                <FontAwesomeIcon icon={faUpload} />
                {frontmatter.pubDateJP}
              </time>

              <time dateTime={frontmatter.modDate}>
                <FontAwesomeIcon icon={faEdit} />
                {frontmatter.modDateJP}
              </time>
            </div>

            <div className="cat">
              <FontAwesomeIcon icon={faTag} />
              <ul>
                {frontmatter.tags.map((tag) => (
                  <li className={tag} key={tag}>
                    <Link to={`/tags/${slugify(tag)}/`}>
                    {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div
            className="postbody"
            dangerouslySetInnerHTML={{ __html: remark.html }}
          />

          <ul className="postlink">
            {prev && (
              <li className="prev">
                <Link to={prev.link} rel="prev">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>Previous : </span>
                  {prev.title}
                </Link>
              </li>
            )}
            {next && (
              <li className="next">
                <Link to={next.link} rel="next">
                  {next.title}
                  <span> : Next</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </article>
    </Layout>
  );
};
export default pageTemplate;

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(format: PLAIN, pruneLength: 60, truncate: true)
      frontmatter {
        pubDateJP: pubDate(formatString: "YYYY-MM-DD")
        pubDate
        modDateJP: modDate(formatString: "YYYY-MM-DD")
        modDate
        title
        description
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
            original {
              src
              width
              height
            }
          }
        }
      }
    }
  }
`;
