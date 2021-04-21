module.exports = {
  siteMetadata: {
    title: `Elementary Elementary`,
    description: `Web関連の公開学習ノート`,
    lang: `ja`,
    siteUrl: `https://elel-jp.com`
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
        path: `${__dirname}/src/images/`
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
