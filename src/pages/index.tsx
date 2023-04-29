import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const filename = file?.name;
    const fileType = file?.type;
    if (!file || !filename || !fileType) throw new Error("No file selected.");
    const res = await fetch(
      `/api/upload?file=${filename}&fileType=${fileType}`
    );
    const { url } = (await res.json()) as { url: string };
    const upload = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": fileType },
    });
    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
    const s3FileUrl = `https://<S3_BUCKET_NAME>.s3.us-west-2.amazonaws.com/${filename}`;
    console.log("File URL", s3FileUrl);
  };
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
