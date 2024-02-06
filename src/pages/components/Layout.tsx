import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

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
                    {currentRoute === "/" ? "thingy" : `thingy // ${currentRoute.slice(1)}`}
                </title>
                <meta name="description" content={description} />
                <meta name="theme-color" content="#27272a" />
                <meta property="og:site_name" content="ashish" />
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
            <main className="flex selection:bg-zinc-200/30 flex-col overflow-x-hidden min-h-screen items-center bg-zinc-100 dark:bg-zinc-900 font-clash max-h-auto relative">
                <div className="w-full h-full lg:w-[60%] md:w-2/3">
                    {children}
                </div>
            </main>
        </div>
    )
};