import { ToasterContext } from "@/context/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  price: yup.string().required("Please input name"),
  quantity: yup.string().required("Please input name"),
});

const useUpdateTicketModal = (id: string) => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset, // reset isi form
    setValue: setValueUpdateTicket,
  } = useForm({ resolver: yupResolver(schema) });

  // Add Ticket
  const updateTicket = async (payload: ITicket) => {
    const res = await ticketServices.updateTicket(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingMutateUpdateTicket,
    isSuccess: isSuccessMutateUpdateTicket,
  } = useMutation({
    mutationFn: updateTicket,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "success update a ticket",
      });
      reset();
    },
  });

  const handleUpdateTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateUpdateTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateTicket,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    setValueUpdateTicket,
  };
};

export default useUpdateTicketModal;
