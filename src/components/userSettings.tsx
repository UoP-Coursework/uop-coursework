import { api } from "~/utils/api";
import CustomModal from "./customModal";

const UserSettings = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose(): void;
}) => {
  const { data } = api.user.getProfileInfo.useQuery();

  return (
    <>
      <CustomModal opened={opened} onClose={onClose} title="User Settings">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </CustomModal>
    </>
  );
};

export default UserSettings;
