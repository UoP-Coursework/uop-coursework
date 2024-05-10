import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Leaderboard = () => {
  const { data: leaderboard } = api.user.getLeaderboardStats.useQuery();

  if (!leaderboard) {
    return <></>;
  }

  return (
    <Layout description="Leaderboard">
      <div className="m-0 h-full w-full p-0">
        <h1 className="py-10 text-center text-4xl font-bold leading-tight tracking-tight text-slate-700 md:text-5xl dark:text-slate-300">
          Leaderboard
        </h1>
        <h3></h3>
        <div className="flex flex-col items-center justify-center">
          <ul className="flex list-decimal flex-col gap-4 text-slate-700 dark:text-slate-300">
            {leaderboard
              .sort((a, b) => {
                return (
                  // prettier-ignore
                  ((b.carbon_offset ?? 0) - (b.carbon_footprint ?? 0)) - ((a.carbon_offset ?? 0) - (a.carbon_footprint ?? 0))
                );
              })
              .map((item, index) => {
                return (
                  <li key={index}>
                    <p className="font-bold">{item.username ?? item.name}</p>
                    <p>
                      Carbon Footprint:{" "}
                      {item.carbon_footprint ?? "No Carbon Footprint"}
                    </p>
                    <p>
                      Carbon Offset: {item.carbon_offset ?? "No Carbon Offset"}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
