import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
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
      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-purple-500">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-xl font-bold text-default-500">
          {status === "success"
            ? "Thank you for register account in KarcisHub"
            : "Confirmation Code is invalid"}
        </p>
        <Button
          className="w-fit"
          variant="bordered"
          color="secondary"
          onPress={() => router.push("/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default Activation;
