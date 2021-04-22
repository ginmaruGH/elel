module.exports = {
  siteMetadata: {
    title: `Elementary Elementary`,
    description: `Web関連の公開学習ノート`,
    lang: `ja`,
    locale: `ja_JP`,
    siteUrl: `https://elel-jp.com`,
    fbappid: `xxxxxxxxxxxxxxxxxxxxx`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Elementary Elementary`,
        short_name: `elel`,
        start_url: `/`,
        background_color: `#e1e1e1`,
        theme_color: `#477294`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
