// import { signIn, signOut, useSession } from "next-auth/react";

// import { api } from "~/utils/api";
import Layout from "../components/Layout";
import { Center } from "@mantine/core";

export default function Home() {
  return (
    <Layout
      description=""
      emoji=""
    >
      <div className="w-full h-full p-8 flex flex-col justify-center items-center relative">
        <Center className="text-slate-300">
          new site :D
        </Center>
        {/* <AuthShowcase /> */}
      </div>
    </Layout>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
