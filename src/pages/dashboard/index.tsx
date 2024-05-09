"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "~/components/Layout";
import Geolocate from "~/components/geolocate";

const Dashboard = () => {
  const { data: SessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!SessionData?.user) {
      void router.push("/api/auth/signin");
    }
  }, [SessionData, router, status]);

  return (
    <Layout description="dashboard">
      <div className="h-full w-full">
        <Geolocate />
      </div>
    </Layout>
  );
};

export default Dashboard;
