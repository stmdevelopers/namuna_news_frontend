import Head from "next/head";
import Error from "next/error";

export default function Custom404() {
  return (
    <React.Fragment>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>

      <Error statusCode="404" />
    </React.Fragment>
  )
}