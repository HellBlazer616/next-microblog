import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/inter-var-latin-webfont.woff2"
            crossOrigin="anonymous"
          />

          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: ` 
              @font-face {
              font-display: optional;
              font-family: 'Inter';
              src: local(''), url('/fonts/inter-var-latin-webfont.woff2') format('woff2'),
                url('/fonts/inter-var-latin-webfont.woff') format('woff');
              
            }`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
