import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePicture = yup.object().shape({
  profilePicture: yup.mixed<FileList | string>().required("Please input cover"),
});

const usePictureTab = () => {
  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorsUpdatePicture },
    reset: resetUpdatePicture,
    watch: watchUpdatePicture,
    getValues: getValuesUpdatePicture,
    setValue: setValueUpdatePicture,
  } = useForm({ resolver: yupResolver(schemaUpdatePicture) });

  const preview = watchUpdatePicture("profilePicture");
  const fileUrl = getValuesUpdatePicture("profilePicture");

  // Upload Picture
  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdatePicture("profilePicture", fileUrl);
      }
    });
  };

  // Delete Picture
  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdatePicture,

    preview,
  };
};

export default usePictureTab;
