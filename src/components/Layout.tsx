import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import NavBar from "./Nav";

export default function Layout({
  children,
  description,
  emoji,
}: {
  children: ReactElement;
  description: string;
  emoji: string;
}) {
  const currentRoute = useRouter().pathname;

  return (
    <div>
      <Head>
        <title>
          {currentRoute === "/"
            ? "thingy"
            : `thingy // ${currentRoute.slice(1)}`}
        </title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#27272a" />
        <meta property="og:site_name" content="" />
        <meta
          property="og:title"
          content={`thingy${
            currentRoute.slice(1).length > 1
              ? ` // ${currentRoute.slice(1)}`
              : ``
          }`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta
          property="twitter:title"
          content={`thingy${
            currentRoute.slice(1).length > 1
              ? ` // ${currentRoute.slice(1)}`
              : ``
          }`}
        />
        <meta property="twitter:description" content={description} />
      </Head>
      <main className="max-h-auto relative flex min-h-screen flex-row items-center justify-between overflow-x-hidden bg-zinc-100 selection:bg-zinc-200/30 dark:bg-zinc-900">
        <div className="sticky left-0 top-0 z-50 flex h-screen w-[6%]">
          <NavBar path={currentRoute} />
        </div>
        <div className="flex h-screen w-full">{children}</div>
      </main>
    </div>
  );
}
