import { useRef } from "react";
import { api } from "~/utils/api";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
export default function CreateEntryForm() {
  //TODO: Refactor to upload image on submit instead of onChange
  const entryMutation = api.entry.create.useMutation();
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
      if (!process.env.NEXT_PUBLIC_S3_URL) throw new Error("No S3 URL");
      const s3FileUrl = `${process.env.NEXT_PUBLIC_S3_URL}${filename}`;
      entryMutation.mutate({
        name: "test",
        imageUrl: s3FileUrl,
        description: "test",
      });
    } else {
      throw new Error("Upload failed.");
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <form>
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-md border border-gray-100 bg-white p-4 shadow-md"
          onClick={() => fileInputRef.current?.click()}
        >
          <label
            htmlFor="file"
            className="cursor-pointer text-sm font-bold uppercase"
          >
            Upload
          </label>
          <FileUploadSharpIcon />
        </button>
        <input
          id="file"
          ref={fileInputRef}
          hidden
          type="file"
          accept="image/png, image/jpeg, application/pdf"
          onChange={(e) => void uploadPhoto(e)}
        />
      </div>
    </form>
  );
}
