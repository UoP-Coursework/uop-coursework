import { Tooltip } from "@mantine/core";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { TbLogin, TbLogout } from "react-icons/tb";

const LoginLogout = ({
  session: SessionData,
  open,
}: {
  session: Session | null;
  open(): void;
}) => {
  return (
    <>
      {SessionData == null ? (
        <Tooltip
          label="Login"
          position="right"
          transitionProps={{ duration: 100 }}
        >
          <button
            className="relative flex h-12 w-12 items-center justify-center rounded-lg shadow duration-300 ease-in-out hover:scale-110 hover:bg-green-800 hover:shadow-xl focus:bg-green-800 dark:hover:bg-green-700 dark:focus:bg-green-700"
            onClick={() => signIn()}
          >
            <div className="p-2">
              <TbLogin className="h-5 w-5 text-zinc-800 dark:text-zinc-100" />
            </div>
          </button>
        </Tooltip>
      ) : (
        <>
          <Tooltip
            label="Open User Settings"
            position="right"
            transitionProps={{ duration: 100 }}
          >
            <button
              className="relative flex h-12 w-12 items-center justify-center rounded-lg duration-300 ease-in-out hover:scale-110"
              onClick={() => {
                open();
              }}
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
              className="relative flex h-12 w-12 items-center justify-center rounded-lg shadow duration-300 ease-in-out hover:scale-110 hover:bg-green-800 hover:shadow-xl focus:bg-green-800 dark:hover:bg-green-700 dark:focus:bg-green-700"
              onClick={() => signOut()}
            >
              <div className="p-2">
                <TbLogout className="h-5 w-5 text-zinc-800 dark:text-zinc-100" />
              </div>
            </button>
          </Tooltip>
        </>
      )}
    </>
  );
};

export default LoginLogout;
