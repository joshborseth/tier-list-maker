import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tier List of Snuggles</title>
        <meta
          name="description"
          content="A tier list to determine who the most and least snuggly folks are"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
