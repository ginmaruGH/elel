const path = require( "path" )
const { createFilePath } = require("gatsby-source-filesystem")

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

// ======================================================================================
// Page, Blog,
// ======================================================================================

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const page = path.resolve("./src/templates/page.js")
  const blog = path.resolve("./src/templates/blog.js")

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

  // ------------------------------------------------------------------------------------
  // Page
  // ------------------------------------------------------------------------------------

  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/blog/pages${node.fields.slug}`,
      component: page,
      context: {
        id: node.id,
        next,
        previous,
      },
    })
  })
}

// --------------------------------------------------------------------------------------
// Blog
// --------------------------------------------------------------------------------------


