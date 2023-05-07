import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import CreateEntryForm from "~/components/CreateEntryForm";
const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tier List of Snuggles | Create A Snuggler</title>
        <meta
          name="description"
          content="A tier list to determine who the most and least snuggly folks are"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <header className="pb-4">
          <Link href="/" className="rounded-full bg-black px-4 py-2 text-white">
            Back to Tier List
          </Link>
        </header>
        <main className="w-full">
          <CreateEntryForm />
        </main>
      </div>
    </>
  );
};

export default Create;
