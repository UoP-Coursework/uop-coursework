import { Center, Tooltip } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Tb123,
  TbAbacus,
  TbGauge,
  TbHome,
  TbLogin,
  TbLogout,
} from "react-icons/tb";

const NavbarData = [
  {
    icon: TbHome,
    label: "Home",
    slug: "/",
  },
  {
    icon: TbAbacus,
    label: "test",
    slug: "/test",
  },
  {
    icon: TbGauge,
    label: "Dashboard",
    slug: "/dashboard",
  },
  {
    icon: Tb123,
    label: "Leaderboard",
    slug: "/leaderboard",
  },
];

const NavBar = ({ path }: { path: string }) => {
  const router = useRouter();
  const { data: SessionData } = useSession();

  return (
    <div className="border-r-1.5 flex h-full w-20 flex-col p-4">
      <Center>
        <Image
          src="/favicon.ico"
          alt="favicon"
          height={128}
          width={128}
          className="h-12 w-12"
        />
      </Center>

      <div className="mt-8 flex h-full flex-1 flex-col items-center justify-start">
        <div className="flex flex-col gap-4">
          {NavbarData.map((item, index) => {
            return (
              <div key={item.slug}>
                {path === item.slug ? (
                  <Tooltip
                    label={item.label}
                    position="right"
                    transitionProps={{ duration: 100 }}
                  >
                    <button
                      key={index}
                      className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800 bg-opacity-10 shadow duration-300 ease-in-out hover:scale-110 hover:bg-sky-800 hover:shadow-xl focus:bg-sky-800 dark:bg-green-500 dark:bg-opacity-10 dark:hover:bg-sky-700 dark:focus:bg-sky-700"
                    >
                      <div className="p-2">
                        <item.icon
                          size="1.25rem"
                          className="text-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip
                    label={item.label}
                    position="right"
                    transitionProps={{ duration: 100 }}
                  >
                    <button
                      key={index}
                      // className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-sky-700 shadow duration-300 ease-in-out hover:scale-110 hover:bg-sky-800 hover:shadow-xl focus:bg-sky-800 dark:bg-sky-800 dark:hover:bg-sky-700 dark:focus:bg-sky-700"
                      className="relative flex h-12 w-12 items-center justify-center rounded-lg shadow duration-300 ease-in-out hover:scale-110 hover:bg-sky-800 hover:shadow-xl focus:bg-sky-800 dark:hover:bg-sky-700 dark:focus:bg-sky-700"
                      onClick={() => router.push(item.slug)}
                    >
                      <div className="p-2">
                        <item.icon
                          size="1.25rem"
                          className="text-zinc-800 dark:text-zinc-100"
                        />
                      </div>
                    </button>
                  </Tooltip>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {SessionData == null ? (
        <Tooltip
          label="Login"
          position="right"
          transitionProps={{ duration: 100 }}
        >
          <button
            className="relative flex h-12 w-12 items-center justify-center rounded-lg shadow duration-300 ease-in-out hover:scale-110 hover:bg-sky-800 hover:shadow-xl focus:bg-sky-800 dark:hover:bg-sky-700 dark:focus:bg-sky-700"
            onClick={() => signIn()}
          >
            <div className="p-2">
              <TbLogin className="text-zinc-100" />
            </div>
          </button>
        </Tooltip>
      ) : (
        <>
          <Tooltip
            label="Logout"
            position="right"
            transitionProps={{ duration: 100 }}
          >
            <button
              className="relative flex h-12 w-12 items-center justify-center rounded-lg duration-300 ease-in-out hover:scale-110"
              onClick={() =>
                console.log("this should show the user modal (WIP)")
              }
            >
              <div className="p-2">
                <Image
                  src={SessionData.user.image ?? "no-user.png"}
                  alt="no-user"
                  height={128}
                  width={128}
                  className="h-10 min-w-10 rounded-md"
                />
              </div>
            </button>
          </Tooltip>
          <Tooltip
            label="Logout"
            position="right"
            transitionProps={{ duration: 100 }}
          >
            <button
              className="relative flex h-12 w-12 items-center justify-center rounded-lg shadow duration-300 ease-in-out hover:scale-110 hover:bg-sky-800 hover:shadow-xl focus:bg-sky-800 dark:hover:bg-sky-700 dark:focus:bg-sky-700"
              onClick={() => signOut()}
            >
              <div className="p-2">
                <TbLogout
                  size="1.25rem"
                  className="text-zinc-800 dark:text-zinc-100"
                />
              </div>
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default NavBar;
