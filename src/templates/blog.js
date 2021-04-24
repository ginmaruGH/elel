import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout";
import Seo from "../components/seo";

const Blog = ({ data, location }) => {
  const pageNode = {
    pagePath: location.pathname,
    pageTitle: "Blog",
    pageDesc: "Elementary Elementary のブログです。 (^ ^)v",
  };
  return (
    <Layout>
      <Seo pageSEO={pageNode} />
      <section className="content bloglist">
        <div className="container">
          <h1 className="bar">RECENT POSTS</h1>

          <div className="posts">
            {data.allMarkdownRemark.nodes.map(({ frontmatter, id, fields }) => (
              <article className="post" key={id}>
                <Link  to={`/blog/pages${fields.slug}`}>
                  <figure>
                    <GatsbyImage
                      image={frontmatter.thumbnail.childImageSharp.gatsbyImageData}
                      alt={frontmatter.description}
                      style={{ height: "100%" }}
                    />
                  </figure>
                  <h3>{frontmatter.title}</h3>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Blog;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___modDate, order: DESC }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 500, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`;
