import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo";

const NotFoundPage = ({ location }) => {

  const pageNode = {
    pagePath: location.pathname,
    pageTitle: "ごめんなさい。ページが見つかりません。",
    pageDesc: "Page 404",
  };

  return (
    <Layout>
      <Seo pageSEO={pageNode} />
      <h1 style={{ padding: "20vh 0", textAlign: "center" }}>
        お探しのページは見つかりませんでした。
        </h1>
    </Layout>
  )
}
export default NotFoundPage
