"use client";

import { useState } from "react";
import slugify from "slugify";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
// import { createWorkspace } from "@/actions/create-workspace";
import { useRouter } from "next/navigation";
import { useCreateWorkspaceValues } from "@/hooks/create-work-space";
import ImageUpload from "@/components/ui/workspace/image-upload";
import { createWorkspaceAction } from "@/actions/createWorkspaceAction";

const CreateWorkspace = () => {
  const { currStep } = useCreateWorkspaceValues();

  let stepInView = null;

  switch (currStep) {
    case 1:
      stepInView = <Step1 />;
      break;
    case 2:
      stepInView = <Step2 />;
      break;
    default:
      stepInView = <Step1 />;
  }

  return (
    <div className="grid h-screen w-screen place-content-center bg-neutral-800 text-white">
      <div className="max-w-[550px] p-3">
        <Typography
          text={`step ${currStep} of 2`}
          variant="p"
          className="text-neutral-400"
        />

        {stepInView}
      </div>
    </div>
  );
};

export default CreateWorkspace;

const Step1 = () => {
  const { name, updateValues, setCurrStep } = useCreateWorkspaceValues();

  return (
    <>
      <Typography
        text="What is the name of your company or team"
        className="my-4"
      />

      <Typography
        text="This will be the name of your Slackzz workspace - choose something that your team will recognize."
        className="text-neutral-300"
        variant="p"
      />

      <form className="mt-6">
        <fieldset>
          <Input
            className="border-neutral-600 bg-neutral-700 text-white"
            type="text"
            value={name}
            placeholder="Enter your company name"
            onChange={(event) => updateValues({ name: event.target.value })}
          />
          <Button
            type="button"
            className="mt-10"
            onClick={() => setCurrStep(2)}
            disabled={!name}
          >
            <Typography text="Next" variant="p" />
          </Button>
        </fieldset>
      </form>
    </>
  );
};

const Step2 = () => {
  const { setCurrStep, updateImageUrl, imageUrl, name } =
    useCreateWorkspaceValues();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("imageUrl", imageUrl);
    setIsSubmitting(true);
    const slug = slugify(name, { lower: true });
    const invite_code = uuid();
    const error = await createWorkspaceAction({
      name,
      slug,
      invite_code,
      image_url: imageUrl,
    });
    setIsSubmitting(false);
    if (error?.error) {
      console.log(error);

      toast.error("unable to create workspace please try again");
      return;
    }
    toast.success("workspace created successfully");
    router.push("/");
  };

  return (
    <>
      <Button
        size="sm"
        className="text-white"
        variant="link"
        onClick={() => setCurrStep(1)}
      >
        <Typography text="Back" variant="p" />
      </Button>

      <form>
        <Typography text="Add workspace avatar" className="my-4" />
        <Typography
          text="This image can be changed later in your workspace settings."
          className="text-neutral-300"
          variant="p"
        />

        <fieldset
          disabled={isSubmitting}
          className="mt-6 flex flex-col items-center space-y-9"
        >
          <ImageUpload />
          <div className="space-x-5">
            <Button
              onClick={() => {
                updateImageUrl("");
                handleSubmit();
              }}
            >
              <Typography text="Skip for now" variant="p" />
            </Button>

            {imageUrl ? (
              <Button
                type="button"
                onClick={handleSubmit}
                size="sm"
                variant="destructive"
              >
                <Typography text="Submit" variant="p" />
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                className="bg-gray-500 text-white"
              >
                <Typography text="Select an Image" variant="p" />
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  );
};
