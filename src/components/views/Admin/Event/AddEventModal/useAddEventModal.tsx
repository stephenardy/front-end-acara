import { ToasterContext } from "@/context/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useDebounce from "@/hooks/useDebounce";
import { DELAY } from "@/constants/list.constants";
import { toDateStandard } from "@/utils/date";
import { IEvent, IEventForm } from "@/types/Event";
import { getLocalTimeZone, now } from "@internationalized/date";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("please select start date"),
  endDate: yup.mixed<DateValue>().required("please select end date"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region"),
  longitude: yup.string().required("Please select longitude coordinate"),
  latitude: yup.string().required("Please select latitude coordinate"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const debounce = useDebounce();

  const {
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  setValue("startDate", now(getLocalTimeZone()));
  setValue("endDate", now(getLocalTimeZone()));

  // Upload Banner
  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      // callback dijalankan setelah upload file (mutate) selesai dijalankan
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  // Delete Banner
  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  // Delete Banner when Close Form Modal
  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  // Get Categories
  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  // Get Regions
  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  // Add Event
  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "success add new event",
      });
      reset();
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: Boolean(data.isFeatured), // karena di form tipenya string
      isPublished: Boolean(data.isPublished),
      isOnline: Boolean(data.isOnline),
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
      location: {
        region: data.region,
        coordinate: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };
    mutateAddEvent(payload);
  };
  // ketika klik submit, maka akan add File Banner dlu baru add Event

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,

    dataCategory,

    searchRegency,
    dataRegion,
    handleSearchRegion,
  };
};

export default useAddEventModal;
