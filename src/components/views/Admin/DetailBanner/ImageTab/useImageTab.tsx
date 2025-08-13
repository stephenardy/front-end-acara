import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateImage = yup.object().shape({
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useImageTab = () => {
  const {
    handleDeleteFile,
    handleUploadFile,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateImage,
    handleSubmit: handleSubmitUpdateImage,
    formState: { errors: errorsUpdateImage },
    reset: resetUpdateImage,
    watch: watchUpdateImage,
    getValues: getValuesUpdateImage,
    setValue: setValueUpdateImage,
  } = useForm({ resolver: yupResolver(schemaUpdateImage) });

  const preview = watchUpdateImage("image");
  const fileUrl = getValuesUpdateImage("image");

  // Upload Image
  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateImage("image", fileUrl);
      }
    });
  };

  // Delete Image
  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    resetUpdateImage,

    preview,
  };
};

export default useImageTab;
