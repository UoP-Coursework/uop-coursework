import { MantineProvider } from "@mantine/core";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextNProgress from "nextjs-progressbar";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <NextNProgress
          color={"#a1a1aa"}
          options={{ showSpinner: false, easing: "ease" }}
        />
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
