import { useSession } from "next-auth/react";

const LandingPage = () => {
  const { data: SessionData, status } = useSession();
  return (
    <main className="font-clash max-h-auto relative flex min-h-screen flex-col items-center overflow-x-hidden bg-zinc-100 selection:bg-zinc-200/30 dark:bg-zinc-900">
      <div className="lg:w flex h-full w-full md:w-2/3">
        <div className="m-0 h-screen w-screen p-0">
          <h1 className="pt-10 text-center text-4xl font-bold leading-tight tracking-tight text-slate-700 md:text-5xl dark:text-slate-300">
            Welcome {SessionData?.user.name}!
          </h1>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
