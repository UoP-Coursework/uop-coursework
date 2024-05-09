import { useSession } from "next-auth/react";
import router from "next/router";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

export default function Home() {
  const { data: SessionData } = useSession();
  const { data, isLoading } = api.user.getProfileUsename.useQuery();

  const userLoggedIn = () => {
    if (isLoading) {
      return <></>;
    }

    if (SessionData?.user) {
      return (
        <>
          <h3 className="pb-4 text-center text-3xl font-bold leading-tight tracking-tight text-slate-700 dark:text-slate-300">
            Welcome, {data?.username}!
          </h3>
          <div className="flex flex-col justify-center gap-4 text-center">
            <button
              className="text-slate-700 dark:text-slate-300"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="text-slate-700 dark:text-slate-300"
              onClick={() => router.push("/faq")}
            >
              Frequently Asked Questions
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <Layout description="Home">
      <div className="m-0 h-full w-full p-0">
        <h1 className="py-10 text-center text-4xl font-bold leading-tight tracking-tight text-slate-700 md:text-5xl dark:text-slate-300">
          <span>Find your closest </span>
          <span className="bg-gradient-to-r from-yellow-600 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            Recycling Plant
          </span>
          <span> with us</span>
        </h1>
        {userLoggedIn()}
      </div>
    </Layout>
  );
}
