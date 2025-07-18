import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";

const LoginPage = () => {
  return (
    <AuthLayout title="ACARA | Login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
