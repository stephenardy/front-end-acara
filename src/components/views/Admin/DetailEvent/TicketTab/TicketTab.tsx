import DropdownAction from "@/components/commons/DropdownAction";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Key, ReactNode, useCallback, useState } from "react";
import { COLUMN_LISTS_TICKET } from "./ticket.constants";
import DataTable from "@/components/ui/DataTable";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import { ITicket } from "@/types/Ticket";
import UpdateTicketModal from "./UpdateTicketModal";

const TicketTab = () => {
  const { dataTicket, isPendingTicket, isRefetchingTicket, refetchTicket } =
    useTicketTab();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(
    null,
  );

  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                setSelectedDataTicket(ticket as ITicket);
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <>
      <Card className="w-full p-4">
        <CardHeader className="items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Event Ticket</h1>
            <p className="w-full text-small text-default-400">
              Manage ticket of this event
            </p>
          </div>
          <Button color="secondary" onPress={addTicketModal.onOpen}>
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-8">
          <DataTable
            columns={COLUMN_LISTS_TICKET}
            data={dataTicket || []}
            emptyContent="Ticket is empty"
            isLoading={isPendingTicket || isRefetchingTicket}
            renderCell={renderCell}
            showSearch={false}
            showLimit={false}
            totalPages={1}
          />
        </CardBody>
      </Card>

      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />

      <UpdateTicketModal
        {...updateTicketModal}
        refetchTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
      />

      <DeleteTicketModal
        {...deleteTicketModal}
        refetchTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
      />
    </>
  );
};

export default TicketTab;
