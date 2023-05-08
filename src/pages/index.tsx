import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col justify-between">
      <Head>
        <title>Tier List of Snuggles | Home A Snuggler</title>
        <meta
          name="description"
          content="A tier list to determine who the most and least snuggly folks are"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-center gap-10 px-8 py-5">
        <h1 className="text-4xl font-bold">Snuggler Tier List</h1>
        <Link
          href="/create"
          className="rounded-full bg-black px-4 py-2 text-center text-white"
        >
          Add a Snuggler
        </Link>
      </header>
      <TierList />
      <SnugglerSelectionField />
    </div>
  );
};

export default Home;

const TierList = () => {
  return (
    <div className="flex flex-grow flex-col">
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
    <div className={`${className} flex flex-grow items-center justify-start`}>
      <p className="inline border-r-2 border-black px-8 text-xl font-bold">
        {tier}
      </p>
    </div>
  );
};

const SnugglerSelectionField = () => {
  const { data: snugglers } = api.entry.get.useQuery();
  return (
    <div className="flex gap-2 p-4">
      {snugglers &&
        snugglers?.map((snuggler) => (
          <div key={snuggler.id}>
            <div className="relative items-center justify-center">
              <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex h-40 w-40 flex-col items-center justify-center rounded-full bg-black bg-opacity-0 p-3 text-center text-white opacity-0 transition-all hover:bg-opacity-75 hover:opacity-100">
                <div className="text-2xl font-bold">{snuggler.name}</div>
                <p>{snuggler.description}</p>
              </div>
              <Image
                width={300}
                height={300}
                src={snuggler?.imageUrl}
                alt={snuggler.name}
                className="h-40 w-40 rounded-full object-cover"
                draggable="false"
              />
            </div>
          </div>
        ))}
    </div>
  );
};
