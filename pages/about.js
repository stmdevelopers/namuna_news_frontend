import Head from "next/head";

export default function About() {
  return (
    <React.Fragment>
      <Head>
        <title>About - Namuna News</title>
        <meta title="description" content="This is a meta description for the About page." />
      </Head>
      <section>
        <h1>This is the About page</h1>
        <p>This is a dummy content.</p>
      </section>
    </React.Fragment>
  );
}