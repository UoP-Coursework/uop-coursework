import { useState } from "react";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const TestPage = () => {
  const { mutate } = api.user.addProfileInfo.useMutation();
  const [username, setusername] = useState("");
  const [address, setaddress] = useState("");
  const [address2, setaddress2] = useState("");
  const [country, setcountry] = useState("");
  const [postcode, setpostcode] = useState("");
  const [town_city, settown_city] = useState("");

  return (
    <Layout description="changeUserInfo">
      <div className="flex min-h-screen flex-row items-center justify-center text-slate-700 dark:text-slate-300">
        <div className="m-0 h-screen w-full p-0 text-center">
          <input
            placeholder="type a username"
            className="grow bg-transparent text-white outline-none"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <br />
          <input
            placeholder="type ur address"
            className="grow bg-transparent text-white outline-none"
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
          <br />
          <input
            placeholder="type ur address x2"
            className="grow bg-transparent text-white outline-none"
            type="text"
            value={address2}
            onChange={(e) => setaddress2(e.target.value)}
          />
          <br />
          <input
            placeholder="type ur country"
            className="grow bg-transparent text-white outline-none"
            type="text"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
          />
          <br />
          <input
            placeholder="type ur postcode"
            className="grow bg-transparent text-white outline-none"
            type="text"
            value={postcode}
            onChange={(e) => setpostcode(e.target.value)}
          />
          <br />
          <input
            placeholder="type ur town/city"
            className="grow bg-transparent text-white outline-none"
            type="text"
            value={town_city}
            onChange={(e) => settown_city(e.target.value)}
          />
          <br />

          <button
            className="text-white"
            onClick={() =>
              mutate({
                username: username,
                address: address,
                address2: address2,
                country: country,
                postcode: postcode,
                town_city: town_city,
                preferred_travel_type: "Bicycling",
              })
            }
          >
            Update Info
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
