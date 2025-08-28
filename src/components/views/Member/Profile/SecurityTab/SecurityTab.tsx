import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@nextui-org/react";
import { Controller } from "react-hook-form";
import useSecurityTab from "./useSecurityTab";

const SecurityTab = () => {
  const {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,
    handleUpdatePassword,
    isPendingUpdatePassword,
  } = useSecurityTab();

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Security</h1>
        <p className="w-full text-small text-default-400">
          Update your account security
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
        >
          <Controller
            name="oldPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Old Password"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Input your old password"
                type="password"
                isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                errorMessage={errorsUpdatePassword.oldPassword?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="New Password"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Input your new password"
                type="password"
                isInvalid={errorsUpdatePassword.password !== undefined}
                errorMessage={errorsUpdatePassword.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm New Password"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Confirm your new password"
                type="password"
                isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                errorMessage={errorsUpdatePassword.confirmPassword?.message}
              />
            )}
          />

          <Button
            color="secondary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdatePassword}
          >
            {isPendingUpdatePassword ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SecurityTab;
