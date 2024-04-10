import { useRouter } from "next/router";
import Layout from "~/components/Layout";

const TestPage = () => {
  const router = useRouter();

  return (
    <Layout description="" emoji="">
      <div className="flex min-h-screen flex-row items-center justify-center text-slate-700 dark:text-slate-300">
        <div className="m-0 h-screen w-screen p-0 text-center text-white">
          <button onClick={() => router.push("test/changeUserInfo")}>
            changeUserInfo
          </button>
          <br />
          <button onClick={() => router.push("test/changeUsername")}>
            changeUsername
          </button>
          <br />
          <button onClick={() => router.push("test/getUserInfo")}>
            getUserInfo
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
