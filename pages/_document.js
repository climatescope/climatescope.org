import Document, { Html, Head, Main, NextScript } from "next/document"
import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()
const googleAnalyticsId = publicRuntimeConfig.googleAnalyticsId

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html charSet="utf-8">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Sans:wght@400;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
            rel="stylesheet"
          ></link>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
