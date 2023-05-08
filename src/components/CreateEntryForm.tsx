import { api } from "~/utils/api";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
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
  const router = useRouter();
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
          onSuccess: () => {
            reset();
            toast("Successfully submitted form", {
              icon: "✅",
            });
            void router.push("/");
          },
          onError: () => {
            toast("Something went wrong. Please try again.", {
              icon: "❌",
            });
          },
        }
      );
    } else {
      toast("Error uploading file", {
        icon: "❌",
      });
    }
  };

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitError = () => {
    toast("Please ensure you have filled in all fields", {
      icon: "❌",
    });
  };
  return (
    <form
      className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-lg bg-white p-10 shadow-md"
      onSubmit={(...args) =>
        void handleSubmit(onSubmit, onSubmitError)(...args)
      }
    >
      <p className="mb-5 text-2xl font-bold">Add a Snuggler</p>
      <label htmlFor="name">Name:</label>
      <input className="border-2 p-2" id="name" {...register("name")} />
      <FormError error={errors.name?.message} />
      <label htmlFor="description">Description:</label>
      <textarea
        maxLength={50}
        className="resize-none border-2 p-2"
        id="description"
        {...register("description")}
      />
      <FormError error={errors.description?.message} />
      <div className="py-2" />
      <label
        className="flex cursor-pointer items-center justify-center rounded-full bg-black px-4 py-2 text-white"
        htmlFor="file"
      >
        <span>File Upload</span>
        <FileUploadSharpIcon />
      </label>
      <FormError error={errors.fileList?.message} />
      {watch("fileList") && watch("fileList").length > 0 && (
        <p className="text-xs">
          File Selected: {Array.from(watch("fileList"))[0]?.name}
        </p>
      )}
      <input
        hidden
        {...register("fileList")}
        id="file"
        type="file"
        accept={ACCEPTED_FILE_TYPES.join(", ")}
      />

      <button
        disabled={entryMutation.isLoading}
        className="cursor-pointer rounded-full bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
const FormError = ({ error }: { error?: string }) => {
  return <>{error && <p className="text-xs text-red-400">{error}</p>}</>;
};
