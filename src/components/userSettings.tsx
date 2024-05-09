import { Loader } from "@mantine/core";
import { useState } from "react";
import { api } from "~/utils/api";
import {
  EditableAddress,
  EditableField,
  EditableSelect,
} from "./EditableField";

const redact = (data: string) => {
  if (data.includes("@")) {
    const [username, emailSuffix] = data.split("@", 2);
    if (!username) return data;
    return `${"*".repeat(username.length)}@${emailSuffix}`;
  }
};

const UserSettings = () => {
  const { data, isLoading, refetch } = api.user.getProfileInfo.useQuery();
  const { mutate: mutateUsername } = api.user.setProfileUsername.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  const { mutate: mutateEmail } = api.user.setProfileEmail.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  const { mutate: mutateAddress } = api.user.setProfileAddress.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  const { mutate: mutatePreferredTravelType } =
    api.user.setPreferredTravelType.useMutation({
      onSuccess: () => {
        void refetch();
      },
    });
  const [emailVisible, setEmailVisible] = useState(false);

  if (isLoading) {
    return (
      <div className="m-0 h-full w-full p-0 text-center">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="m-0 h-full w-full p-0 text-center">
        Something went wrong!
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <EditableField
          label="Username"
          value={data.username}
          mutate={(data: string) => {
            mutateUsername({ username: data });
          }}
        />
        <EditableField
          label="Email"
          value={data.email}
          child={
            <div className="flex">
              <p className="pr-2">
                {emailVisible ? data.email : redact(data.email)}
              </p>
              <button
                className="text-blue-600"
                onClick={() => setEmailVisible(!emailVisible)}
              >
                {emailVisible ? "hide" : "show"}
              </button>
            </div>
          }
          mutate={(data: string) => {
            mutateEmail({ email: data });
          }}
        />
        <EditableAddress
          label="Address"
          value={{
            address: data.address,
            address2: data.address2,
            town_city: data.town_city,
            postcode: data.postcode,
          }}
          mutate={(data: {
            address: string;
            address2: string;
            town_city: string;
            postcode: string;
          }) => {
            mutateAddress(data);
          }}
        />
        <EditableSelect
          label="Preferred Travel Type"
          value={data.preferred_travel_type}
          mutate={(data: string) => {
            mutatePreferredTravelType({ preferred_travel_type: data });
          }}
        />
        <div>
          <p className="font-bold">Carbon Footprint:</p>
          <p>{data.carbon_footprint ?? 0}</p>
        </div>
        <div>
          <p className="font-bold">Carbon Offset:</p>
          <p>{data.carbon_offset ?? 0}</p>
        </div>
      </div>
    </>
  );
};

export default UserSettings;
