import { Tab, Tabs } from "@nextui-org/react";

import useProfile from "./useProfile";
import PictureTab from "./PictureTab";
import InfoTab from "./InfoTab";
import SecurityTab from "./SecurityTab";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useProfile();

  return (
    <Tabs aria-label="Options">
      <Tab key="Picture" title="Picture">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="Info" title="Info">
        <InfoTab
          dataProfile={dataProfile}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="Security" title="Security">
        <SecurityTab />
      </Tab>
    </Tabs>
  );
};

export default Profile;
