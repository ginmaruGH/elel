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
// Post-page, Tag-page,
// ======================================================================================

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const postPage = path.resolve("./src/templates/post-page.js")
  const tagPage = path.resolve("./src/templates/tag-page.js")

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
        tagsGroup: group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`GraphQLクエリー実行中にエラーが発生！＞＜；`)
    return
  }

  // ------------------------------------------------------------------------------------
  // Post-page
  // ------------------------------------------------------------------------------------
  // oder:DESC(new ->(previous <- current -> next)-> old)
  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/blog/pages${node.fields.slug}`,
      component: postPage,
      context: {
        id: node.id,
        next: previous,
        previous: next,
      },
    });
  })

  // --------------------------------------------------------------------------------------
  // Tags-page
  // --------------------------------------------------------------------------------------

  const tags = result.data.allMarkdownRemark.tagsGroup;

  tags.forEach(( tag ) => {
    createPage({
      path: `/tags/${slugify(tag.fieldValue)}/`,
      component: tagPage,
      context: {
        tag: tag.fieldValue,
      },
    });
  })

} //exports.createPages


// Helpers
function slugify(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}
