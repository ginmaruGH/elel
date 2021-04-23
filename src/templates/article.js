import React from "react"
import { graphql,Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
  faUpload,
  faEdit,
  faTag,
} from "@fortawesome/free-solid-svg-icons"


const pageTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter
  const prev = pageContext.next
  const next = pageContext.previous
  const prevLink = prev && `/blog/pages${prev.fields.slug}`
  const nextLink = next && `/blog/pages${next.fields.slug}`

  return (
    <Layout>
      <div className="eyecatch">
        <figure>
          <GatsbyImage
            image={post.thumbnail.childImageSharp.gatsbyImageData}
            alt={post.description}
            style={{ height: "100%" }}
          />
        </figure>
      </div>

      <article className="content">
        <div className="container">
          <h1 className="bar">{post.title}</h1>

          <aside className="info">
            <div className="datetime">
              <time dateTime={post.pubDate}>
                <FontAwesomeIcon icon={faUpload} />
                {post.pubDateJP}
              </time>

              <time dateTime={post.modDate}>
                <FontAwesomeIcon icon={faEdit} />
                {post.modDateJP}
              </time>
            </div>

            <div className="cat">
              <FontAwesomeIcon icon={faTag} />
              <ul>
                {post.tags.map((tag) => (
                  <li className={tag} key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="postbody"
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          />


          <ul className="postlink">
            {prev && (
              <li className="prev">
                <Link to={prevLink} rel="prev">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>Previous : </span>
                  {prev.frontmatter.title}
                </Link>
              </li>
            )}
            {next && (
              <li className="next">
              <Link to={nextLink} rel="next">
                {next.frontmatter.title}
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
}

export default pageTemplate

export const query = graphql`
  query($id: String!) {
    markdownRemark( id: { eq: $id } ) {
      html
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
          }
        }
      }
    }
  }
`;
