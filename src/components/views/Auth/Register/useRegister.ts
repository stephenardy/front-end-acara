import React from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your fullname"),
  username: yup.string().required("Please input your username"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .min(8, "Password must be 8 charaters or more")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not match")
    .required("Please confirm your password"),
});

const useRegister = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState({
    password: false,
    passwordConfirmation: false,
  });

  const handleVisiblePassword = (key: "password" | "passwordConfirmation") => {
    setIsVisible({ ...isVisible, [key]: !isVisible[key] });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    isVisible,
    handleVisiblePassword,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
    control,
  };
};

export default useRegister;
