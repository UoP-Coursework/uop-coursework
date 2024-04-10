import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const TestPage = () => {
  const { data: userProfileInfo } = api.user.getProfileInfo.useQuery();

  return (
    <Layout description="" emoji="">
      <div className="m-0 h-screen w-screen p-0">
        {
          userProfileInfo ?
          (
            <div>
              <span>{userProfileInfo.username}</span>
              <span>{userProfileInfo.carbon_footprint}</span>
              <span>{userProfileInfo.carbon_offset}</span>
            </div>
          ): 
          (
            <span>
              No Info Available
            </span>
          )
        }
      </div>
    </Layout>
  )
}

export default TestPage