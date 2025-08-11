import { ToasterContext } from "@/context/ToasterContext";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  // Get Event By Id
  const getEventById = async (id: string) => {
    const { data } = await eventServices.getEventById(id);
    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: () => getEventById(`${query.id}`),
    enabled: isReady,
  });

  // Update Event Detail
  const updateEvent = async (payload: IEvent) => {
    const { data } = await eventServices.updateEvent(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: (payload: IEvent) => updateEvent(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: (result) => {
      refetchEvent();
      setToaster({
        type: "success",
        message: "Success update event",
      });
    },
  });

  // untuk update generic, Tab Cover pakai ini
  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  // untuk Tab Info
  const handleUpdateInfo = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: Boolean(data.isFeatured), // karena di form tipenya string
      isPublished: Boolean(data.isPublished),
      startDate: data.startDate ? toDateStandard(data.startDate) : "",
      endDate: data.endDate ? toDateStandard(data.endDate) : "",
    };

    mutateUpdateEvent(payload);
  };

  // untuk Tab Location
  const handleUpdateLocation = (data: IEventForm) => {
    const payload = {
      isOnline: Boolean(data.isOnline),
      location: {
        region: `${data.region}`,
        coordinate: [Number(data.latitude), Number(data.longitude)],
      },
    };

    mutateUpdateEvent(payload);
  };

  // Find regency by Id

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion"],
      queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region),
      enabled: !!dataEvent?.location?.region,
    });

  return {
    dataEvent,
    handleUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    dataDefaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailEvent;
