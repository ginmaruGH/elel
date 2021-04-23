const { createFilePath } = require("gatsby-source-filesystem")
const path = require( "path" )

// ======================================================================================
// Slug
// ======================================================================================

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const article = path.resolve("./src/templates/article.js")

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___modDate, order: DESC }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`GraphQLのクエリーでエラーが発生！`)
    return
  }

  // ====================================================================================
  // Page
  // ====================================================================================

  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/blog/pages${node.fields.slug}`,
      component: article,
      context: {
        id: node.id,
        next,
        previous,
      },
    })
  })
}
