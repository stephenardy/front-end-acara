import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterPage from "@/components/views/Register";

function Register() {
  return (
    <AuthLayout title="ACARA | Register">
      <RegisterPage></RegisterPage>
    </AuthLayout>
  );
}

export default Register;
