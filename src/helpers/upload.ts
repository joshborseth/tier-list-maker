export const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  const filename = file?.name;
  const fileType = file?.type;
  if (!file || !filename || !fileType) throw new Error("No file selected.");
  const res = await fetch(`/api/upload?file=${filename}&fileType=${fileType}`);
  const { url } = (await res.json()) as { url: string };
  const upload = await fetch(url, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": fileType },
  });
  if (upload.ok) {
    const s3FileUrl = `https://snuggly-folks.s3.us-west-2.amazonaws.com/${filename}`;
    console.log("Upload success!");
  } else {
    console.error("Upload failed.");
  }
};
