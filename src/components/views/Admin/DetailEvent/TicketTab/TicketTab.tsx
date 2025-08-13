import DropdownAction from "@/components/commons/DropdownAction";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LISTS_TICKET } from "./ticket.constants";
import DataTable from "@/components/ui/DataTable";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";

const TicketTab = () => {
  const { dataTicket, isPendingTicket, isRefetchingTicket, refetchTicket } =
    useTicketTab();

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
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                // setSelectedId(`${event._id}`);
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
          <Button color="danger" onPress={addTicketModal.onOpen}>Add New Ticket</Button>
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
    </>
  );
};

export default TicketTab;
