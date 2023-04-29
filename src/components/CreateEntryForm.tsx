import { api } from "~/utils/api";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import { z } from "zod";
import { type SubmitHandler, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  fileList: z.custom<FileList>().refine(
    (fileList) => {
      return Array.from(fileList)[0];
    },
    {
      message: "No file selected",
    }
  ),
});
type FormSchema = z.infer<typeof formSchema>;

export default function CreateEntryForm() {
  const entryMutation = api.entry.create.useMutation();

  const onSubmit: SubmitHandler<FormSchema> = async ({
    description,
    fileList,
    name,
  }) => {
    const file = Array.from(fileList)[0];
    if (!file) throw new Error("No file");
    const filename = file?.name;
    const fileType = file?.type;
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
      if (!process.env.NEXT_PUBLIC_S3_URL) throw new Error("No S3 URL In ENV");
      const s3FileUrl = `${process.env.NEXT_PUBLIC_S3_URL}${filename}`;
      entryMutation.mutate(
        {
          name: name,
          imageUrl: s3FileUrl,
          description: description,
        },
        {
          onSuccess: (data) => {
            console.log("success", data);
          },
        }
      );
    } else {
      throw new Error("Upload failed.");
    }
  };

  const { handleSubmit, register } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitError = (errors: FieldErrors<FormSchema>) => {
    console.log(errors, "error");
  };
  return (
    <form
      className="m-5 flex flex-col items-center justify-center rounded-lg p-10 shadow-md"
      onSubmit={(...args) =>
        void handleSubmit(onSubmit, onSubmitError)(...args)
      }
    >
      <input
        className="border-2 border-gray-700"
        {...register("description")}
      />
      <input className="border-2 border-gray-700" {...register("name")} />
      <div className="flex gap-5 pt-10">
        <label
          htmlFor="file"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-100 bg-white p-4 text-sm font-bold uppercase shadow-md transition-colors duration-200 ease-in-out hover:bg-gray-100"
        >
          <span className="text-gray-700">File Upload</span>
          <FileUploadSharpIcon className="fill-gray-700" />
        </label>
        <input
          hidden
          {...register("fileList")}
          id="file"
          type="file"
          accept={ACCEPTED_FILE_TYPES.join(", ")}
        />
        <button
          type="submit"
          className="rounded-lg border border-gray-100 p-4 text-sm font-bold uppercase text-gray-700 shadow-md transition-colors duration-200 ease-in-out hover:bg-gray-100"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
