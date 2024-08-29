import { useCreateWorkspaceValues } from "@/hooks/create-work-space";
import { UploadDropzone } from "@/lib/Uploadthing";
import Image from "next/image";
import { ImCancelCircle } from "react-icons/im";

const ImageUpload = () => {
  const { imageUrl, updateImageUrl } = useCreateWorkspaceValues();

  if (imageUrl) {
    return (
      <div className="relative flex h-32 w-32 items-center justify-center">
        <Image
          src={imageUrl}
          className="h-full w-full rounded-full object-cover"
          alt="workspace"
          width={320}
          height={320}
        />
        <ImCancelCircle
          size={30}
          onClick={() => updateImageUrl("")}
          className="absolute -right-2 -top-2 z-10 cursor-pointer hover:scale-110"
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint="workspaceImage"
      onClientUploadComplete={(res) => {
        updateImageUrl(res?.[0].url);
      }}
      onUploadError={(err) => console.log(err)}
    />
  );
};

export default ImageUpload;
