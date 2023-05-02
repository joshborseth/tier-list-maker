import { type NextPage } from "next";
import Head from "next/head";
import CreateEntryForm from "~/components/CreateEntryForm";
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
      <main className="flex h-full min-h-screen w-full items-center  justify-center">
        <CreateEntryForm />
      </main>
    </>
  );
};

export default Home;
