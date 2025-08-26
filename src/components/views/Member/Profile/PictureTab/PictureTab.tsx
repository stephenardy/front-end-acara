import InputFile from "@/components/ui/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import usePictureTab from "./usePictureTab";
import { IProfile } from "@/types/Auth";
import { resolveImagePath } from "@/utils/resolveImagePath";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = (props: PropTypes) => {
  const { currentPicture, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,

    preview,
  } = usePictureTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdatePicture();
    }
  }, [isSuccessUpdate]);

  const imageSrc = resolveImagePath(currentPicture);

  return (
    <Card className="w-full p-4 lg:w-1/3">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile Picture</h1>
        <p className="w-full text-small text-default-400">
          Manage picture for your profile
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Profile Picture
            </p>
            <Skeleton
              isLoaded={!isPendingUpdate}
              className="aspect-square w-full rounded-lg"
            >
              <Avatar
                src={imageSrc}
                alt="picture"
                showFallback
                className="aspect-square h-full w-full"
              />
            </Skeleton>
          </div>
          <Controller
            name="profilePicture"
            control={controlUpdatePicture}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeletePicture(onChange)}
                onUpload={(files) => handleUploadPicture(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                errorMessage={errorsUpdatePicture.profilePicture?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Picture
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default PictureTab;
