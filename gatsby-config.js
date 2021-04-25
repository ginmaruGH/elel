module.exports = {
  siteMetadata: {
    lang: `ja`,
    locale: `ja_JP`,
    title: `Elementary Elementary`,
    description: `Web関連の公開学習ノート`,
    siteUrl: `https://elel-jp.com`,
    fbAppID: `xxxxxxxxxxxxxxxxxxxxx`,
  },
  plugins: [
    // ==================================================================================
    // Gatsby Cloud Hosting
    // ==================================================================================

    `gatsby-plugin-gatsby-cloud`,

    // ==================================================================================
    // Meta
    // ==================================================================================

    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Elementary Elementary`,
        short_name: `elel`,
        start_url: `/`,
        background_color: `white`,
        theme_color: `#477294`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,

    // ===================================================================================
    // Image and Static
    // ===================================================================================

    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/content`,
      },
    },

    // ==================================================================================
    // Markdown
    // ==================================================================================

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-autolink-headers",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: "root",
                host: "localhost",
                global: true,
              },
            },
          },
        ],
      },
    },

    // ==================================================================================
    // Style
    // ==================================================================================

    `gatsby-plugin-sass`,
  ],
};
