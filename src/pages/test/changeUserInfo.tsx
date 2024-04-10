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
    <Layout description="" emoji="">
      <div className="m-0 h-screen w-screen p-0">
        <input
            placeholder="type a username"
            className="grow bg-transparent outline-none"
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
        />
        <input
            placeholder="type ur address"
            className="grow bg-transparent outline-none"
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
        />
        <input
            placeholder="type ur address x2"
            className="grow bg-transparent outline-none"
            type="text"
            value={address2}
            onChange={(e) => setaddress2(e.target.value)}
        />
        <input
            placeholder="type ur contry"
            className="grow bg-transparent outline-none"
            type="text"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
        />
        <input
            placeholder="type ur postcode"
            className="grow bg-transparent outline-none"
            type="text"
            value={postcode}
            onChange={(e) => setpostcode(e.target.value)}
        />
        <input
            placeholder="type ur town/city"
            className="grow bg-transparent outline-none"
            type="text"
            value={town_city}
            onChange={(e) => settown_city(e.target.value)}
        />

        <button
          onClick={() =>
            mutate({
              username: username,
              address: address,
              address2: address2,
              country: country,
              postcode: postcode,
              town_city: town_city,
            })
          }
        >
          Update Info
        </button>
      </div>
    </Layout>
  );
};

export default TestPage;
