import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/DetailTransaction";

const DetailTransactionAdminPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Information for specific transaction"
      type="admin"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default DetailTransactionAdminPage;
