import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";

function RegisterPage() {
  return (
    <AuthLayout title="KarcisHub | Register">
      <Register />
    </AuthLayout>
  );
}

export default RegisterPage;
