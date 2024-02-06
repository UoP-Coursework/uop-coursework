import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { createTheme, MantineProvider } from '@mantine/core';

import { api } from "~/utils/api";

import "~/styles/globals.css";
import '@mantine/core/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
