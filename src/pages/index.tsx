import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tier List of Snuggles | Home A Snuggler</title>
        <meta
          name="description"
          content="A tier list to determine who the most and least snuggly folks are"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-start">
        <header className="flex items-center justify-center gap-10 py-5">
          <h1 className="text-4xl font-bold">Snuggler Tier List</h1>
          <Link
            href="/create"
            className="rounded-full bg-black px-4 py-2 text-white"
          >
            Add a Snuggler
          </Link>
        </header>
        <main className="w-full">
          <TierList />
          <SnugglerSelectionField />
        </main>
      </div>
    </>
  );
};

export default Home;

const TierList = () => {
  return (
    <div className="w-full">
      <TierRow tier="S" className="bg-red-400" />
      <TierRow tier="A" className="bg-orange-400" />
      <TierRow tier="B" className="bg-amber-400" />
      <TierRow tier="C" className="bg-yellow-400" />
      <TierRow tier="D" className="bg-green-300" />
      <TierRow tier="F" className="bg-green-400" />
    </div>
  );
};

const TierRow = ({ tier, className }: { tier: string; className: string }) => {
  return (
    <div className={`py-8 ${className}`}>
      <p className="inline border-r-2 border-black px-8 py-2 text-xl font-bold">
        {tier}
      </p>
    </div>
  );
};

const SnugglerSelectionField = () => {
  const { data: snugglers } = api.entry.get.useQuery();
  return (
    <div className="w-full">
      {snugglers?.map((snuggler) => (
        <div key={snuggler.id}>
          <div>{snuggler.name}</div>
          <p>{snuggler.description}</p>
          <Image src={snuggler?.imageUrl} alt={snuggler.name} />
        </div>
      ))}
    </div>
  );
};
