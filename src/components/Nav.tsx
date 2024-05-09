import { Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  TbAbacus,
  TbBook2,
  TbGauge,
  TbHome,
  TbNumber123,
} from "react-icons/tb";
import LoginLogout from "./LoginLogout";
import UserModal from "./userModal";

const NavbarData = [
  {
    icon: TbHome,
    label: "Home",
    slug: "/",
  },
  {
    icon: TbGauge,
    label: "Dashboard",
    slug: "/dashboard",
  },
  {
    icon: TbNumber123,
    label: "Leaderboard",
    slug: "/leaderboard",
  },
  {
    icon: TbBook2,
    label: "Frequently Asked Questions",
    slug: "/faq",
  },
  {
    icon: TbAbacus,
    label: "Testing Pages",
    slug: "/test",
  },
];

const NavBar = ({ path }: { path: string }) => {
  const router = useRouter();
  const { data: SessionData, status } = useSession();
  const [opened, { open, close }] = useDisclosure();

  return (
    <div className="border-r-1.5 flex h-full w-full flex-col p-4">
      <Image
        src="/favicon.ico"
        alt="favicon"
        height={128}
        width={128}
        className="h-12 w-12"
      />

      <div className="mt-8 flex-1">
        <div className="flex flex-col gap-4">
          {NavbarData.map((item, index) => {
            if (item.slug === "/test") {
              if (SessionData?.user.role !== "admin") {
                return null;
              }
            }
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
                      className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-green-800 bg-opacity-10 shadow duration-300 ease-in-out hover:scale-110 hover:bg-green-800 hover:shadow-xl focus:bg-green-800 dark:bg-green-500 dark:bg-opacity-10 dark:hover:bg-green-700 dark:focus:bg-green-700"
                    >
                      <div className="p-2">
                        <item.icon className="h-5 w-5 text-zinc-800 dark:text-zinc-100" />
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
                      className="relative flex h-12 w-12 items-center justify-center rounded-lg shadow duration-300 ease-in-out hover:scale-110 hover:bg-green-800 hover:shadow-xl focus:bg-green-800 dark:hover:bg-green-700 dark:focus:bg-green-700"
                      onClick={() => router.push(item.slug)}
                    >
                      <div className="p-2">
                        <item.icon className="h-5 w-5 text-zinc-800 dark:text-zinc-100" />
                      </div>
                    </button>
                  </Tooltip>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {status === "loading" ? (
        <></>
      ) : (
        <LoginLogout session={SessionData} open={open} />
      )}
      <UserModal opened={opened} onClose={close} />
    </div>
  );
};

export default NavBar;
