import { Loader, Stack } from "@mantine/core";
import { useState } from "react";
import { api } from "~/utils/api";

const redact = (data: string) => {
  if (data.includes("@")) {
    const [first, last] = data.split("@", 2);
    return `${"*".repeat(first?.length!)}@${last}`;
  }
};

const UserSettings = () => {
  const { data, isLoading: dataLoading } = api.user.getProfileInfo.useQuery();
  const [emailVisible, setEmailVisible] = useState(false);

  if (dataLoading) {
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
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Stack>
        <p>Username: {data.username}</p>
        <div className="flex">
          <p className="pr-2">
            Email: {emailVisible ? data.email : redact(data.email)}
          </p>
          <button
            className="text-blue-600"
            onClick={() => setEmailVisible(!emailVisible)}
          >
            {emailVisible ? "hide" : "show"}
          </button>
        </div>
        <p>
          Address: {data.address}, {data.address2}, {data.town_city},{" "}
          {data.postcode}
        </p>
        {data.carbon_offset}
        <p>Carbon Footprint: {data.carbon_footprint}</p>
        <p>Carbon Offset: {data.carbon_offset}</p>
      </Stack>
    </>
  );
};

export default UserSettings;
