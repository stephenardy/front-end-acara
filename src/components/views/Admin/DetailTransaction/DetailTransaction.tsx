import { Button, Card, CardBody, Chip, Skeleton } from "@nextui-org/react";
import useDetailTransaction from "./useDetailTransaction";
import { convertIDR } from "@/utils/currency";
import { QRCodeSVG } from "qrcode.react";
import { convertTime } from "@/utils/date";
import Link from "next/link";
import Script from "next/script";
import environment from "@/config/environtment";

const DetailTransaction = () => {
  const { dataEvent, dataTicket, dataTransactions } = useDetailTransaction();
  return (
    <Card className="px-5 py-4">
      <CardBody className="gap-8">
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">Order</h4>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold">Order ID:</p>
              <Skeleton
                isLoaded={!!dataTransactions?.orderId}
                className="h-4 rounded-md"
              >
                <p className="text-sm">{dataTransactions?.orderId}</p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm font-semibold">Ticket:</p>
              <Skeleton
                isLoaded={!!dataTicket?.name}
                className="h-4 rounded-md"
              >
                <p className="text-sm">{`${dataTicket?.name} (${convertIDR(dataTicket?.price)}) x ${dataTransactions?.quantity}`}</p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm font-semibold">Total:</p>
              <Skeleton
                isLoaded={!!dataTransactions?.total}
                className="h-4 rounded-md"
              >
                <p className="text-sm">{convertIDR(dataTransactions?.total)}</p>
              </Skeleton>
            </div>
            <div>
              <p className="text-sm font-semibold">Status:</p>
              <Skeleton
                isLoaded={!!dataTransactions?.status}
                className="h-4 rounded-md"
              >
                <Chip
                  className="capitalize"
                  color={
                    dataTransactions?.status === "completed"
                      ? "success"
                      : "warning"
                  }
                  variant="flat"
                  size="sm"
                >
                  {dataTransactions?.status}
                </Chip>
              </Skeleton>
            </div>
          </div>
        </div>
        {dataTransactions.status === "completed" && (
          <div className="flex flex-col gap-2">
            <h4 className="font-bold">Ticket:</h4>
            <div className="mt-2 flex flex-col gap-4">
              {dataTransactions?.vouchers.map(
                (voucher: { voucherId: string }) => (
                  <Card
                    shadow="sm"
                    className="p-4 pt-6 lg:p-2"
                    key={`voucher-${voucher.voucherId}`}
                  >
                    <CardBody className="gap-8 lg:flex-row">
                      <div className="mx-auto mb-4 w-2/3 lg:m-0 lg:w-1/5">
                        <QRCodeSVG
                          value={voucher.voucherId}
                          className="!h-full !w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xxl font-bold text-danger">
                          {dataEvent?.name}
                        </h2>
                        <div className="font-bold">
                          <p className="text-foreground-500">Date</p>
                          <p className="text-danger">{`${convertTime(dataEvent?.startDate)} - ${convertTime(dataEvent?.endDate)}`}</p>
                        </div>
                        <div className="font-bold">
                          <p className="text-foreground-500">Location</p>
                          <p className="text-danger">
                            {dataEvent?.isOnline ? "Online" : "Offline"}
                          </p>
                        </div>
                        {dataEvent?.isOnline && (
                          <Button
                            as={Link}
                            href={`${dataEvent?.location?.address}`}
                            variant="bordered"
                            color="danger"
                            className="w-fit"
                          >
                            Join Now
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ),
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DetailTransaction;
