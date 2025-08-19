import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import usePayment from "./usePayment";
import { useEffect } from "react";

const Payment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;
  const { mutateUpdateOrderStatus } = usePayment();

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [mutateUpdateOrderStatus]);

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustrations/success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold capitalize text-danger-500">
          Transaction {status}
        </h1>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
          onPress={() => router.push(`/member/transaction/${order_id}`)}
        >
          Check your transaction here
        </Button>
      </div>
    </div>
  );
};

export default Payment;
