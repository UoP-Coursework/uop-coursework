import { useRouter } from "next/router";
import Layout from "~/components/Layout";

const TestPage = () => {
  const router = useRouter();

  return (
    <Layout description="Test">
      <div className="flex min-h-screen w-full flex-row items-center justify-center text-slate-700 dark:text-slate-300">
        <div className="m-0 flex h-screen w-full flex-col gap-4 p-0 pt-8 text-center ">
          <button onClick={() => router.push("test/changeUserInfo")}>
            changeUserInfo
          </button>
          <button onClick={() => router.push("test/changeUsername")}>
            changeUsername
          </button>
          <button onClick={() => router.push("test/getUserInfo")}>
            getUserInfo
          </button>
          <button onClick={() => router.push("test/setStateTest")}>
            setStateTest
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
