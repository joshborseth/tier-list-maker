import { type NextPage } from "next";
import Head from "next/head";
import { uploadPhoto } from "~/helpers/upload";

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
      <div>
        <h1>app</h1>
        <input
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => void uploadPhoto(e)}
        />
      </div>
    </>
  );
};

export default Home;
