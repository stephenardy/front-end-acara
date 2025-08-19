import AuthLayout from "@/components/layouts/AuthLayout";
import Payment from "@/components/views/Payment";

const PaymentStatusPage = () => {
  return (
    <AuthLayout title="Ticket Payment Status">
      <Payment />
    </AuthLayout>
  );
};

export default PaymentStatusPage;
