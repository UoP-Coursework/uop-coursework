import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import {
  TbHome,
  TbGauge,
  TbSwitchHorizontal,
  Tb123,
  TbLogout,
  TbLogin,
} from "react-icons/tb";
import type { IconType } from "react-icons/lib";
import classes from "../styles/navbarmin.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Session } from "next-auth";
import React from "react";

interface NavbarLinkProps {
  icon: IconType | JSX.Element;
  label: string;
  active?: boolean;
  slug?: string;
  onClick?(): void;
}

const isIconType = (x: any): x is IconType => !React.isValidElement(x);

function genUserIcon(session: Session) {
  return <Image src={session.user.image || "no-user.png"} alt="no-user" height={128} width={128} className="rounded-md w-8 h-8"/>
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active ? active : undefined}
      >
        {
          isIconType(Icon)
          ?
          <Icon/>
          :
          Icon
        }
      </UnstyledButton>
    </Tooltip>
  );
}

const navData = [
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
    icon: Tb123,
    label: "Leaderboard",
    slug: "leaderboard",
  },
];

export default function NavbarMinimal() {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { data: sessionData } = useSession();

  const handleOnClick = (index: number, slug: string) => {
    setActive(index);
    void router.push(slug);
  };

  const links = navData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => handleOnClick(index, link.slug)}
    />
  ));

  console.log("sessiondata:", sessionData)

  return (
    <nav className="border-r-1.5 flex h-full w-20 flex-col p-4">
      <Center>
        <Image src="/favicon.ico" alt="favicon" height={32} width={32} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
      <Stack justify="center" gap={0}>
        {sessionData == null ? (
          <NavbarLink 
            icon={TbLogin} 
            label="Login" 
            onClick={() => signIn()} 
          />
        ) : (
          <>
            <NavbarLink icon={genUserIcon(sessionData)} label="Change Account" />
            <NavbarLink
              icon={TbLogout}
              label="Logout"
              onClick={() => signOut()}
            />
          </>
        )}
      </Stack>
    </nav>
  );
}
