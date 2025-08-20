import { ToasterContext } from "@/context/ToasterContext";
import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailTransaction = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getOrderById = async () => {
    const { data } = await orderServices.getOrderById(`${query.id}`);
    return data.data;
  };

  const { data: dataTransactions } = useQuery({
    queryKey: ["Transaction"],
    queryFn: getOrderById,
    enabled: isReady,
  });

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(
      `${dataTransactions?.events}`,
    );
    return data.data;
  };

  const { data: dataEvent } = useQuery({
    queryKey: ["EventById"],
    queryFn: getEventById,
    enabled: !!dataTransactions?.events,
  });

  const getTicketBytId = async () => {
    const { data } = await ticketServices.getTicketById(
      `${dataTransactions?.ticket}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketBytId,
    enabled: !!dataTransactions?.ticket,
  });

  return {
    dataTransactions,
    dataEvent,
    dataTicket,
  };
};

export default useDetailTransaction;
