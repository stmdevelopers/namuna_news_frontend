import Head from "next/head";
import Error from "next/error";

export default function Custom500() {
  return (
    <React.Fragment>
      <Head>
        <title>500 - Internal Server Error</title>
      </Head>

      <Error statusCode="500" />
    </React.Fragment>
  )
}