import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const TestPage = () => {
  const { data: userProfileInfo } = api.user.getProfileInfo.useQuery();

  return (
    <Layout description="getUserInfo">
      <div className="m-0 h-screen w-full p-0">
        <div className="flex min-h-screen flex-row items-center justify-center text-slate-700 dark:text-slate-300">
          {userProfileInfo ? (
            <pre className="">{JSON.stringify(userProfileInfo, null, 2)}</pre>
          ) : (
            <span>No Info Available</span>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
