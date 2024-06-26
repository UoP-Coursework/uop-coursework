import { useState } from "react";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const TestPage = () => {
  const { mutate } = api.user.addProfileUsername.useMutation();

  const [input, setInput] = useState("");

  return (
    <Layout description="changeUsername">
      <div className="m-0 h-screen w-full p-0">
        <input
          placeholder="type a username"
          className="grow bg-transparent outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (input !== "") {
                mutate({ username: input });
              }
            }
          }}
        />
      </div>
    </Layout>
  );
};

export default TestPage;
