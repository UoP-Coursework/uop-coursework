import Layout from "~/components/Layout";
import Geolocate from "~/components/geolocate";

const Dashboard = () => {
  return (
    <Layout description="dashboard" emoji="">
      <div className="h-full w-screen">
        <Geolocate />
      </div>
    </Layout>
  );
};

export default Dashboard;
