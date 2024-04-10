import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import type { IconType } from "react-icons/lib";
import {
  Tb123,
  TbAbacus,
  TbGauge,
  TbHome,
  TbLogin,
  TbLogout,
} from "react-icons/tb";
import UserModal from "~/lib/userModal";
import classes from "../styles/navbarmin.module.css";

interface NavbarLinkProps {
  icon: IconType | JSX.Element;
  label: string;
  active?: boolean;
  slug?: string;
  onClick?(): void;
}

interface UserButtonProps {
  icon: JSX.Element;
  label: string;
  active?: boolean;
}

const isIconType = (x: unknown): x is IconType => !React.isValidElement(x);

function genUserIcon(session: Session) {
  return (
    <Image
      src={session.user.image ?? "no-user.png"}
      alt="no-user"
      height={128}
      width={128}
      className="h-8 w-8 rounded-md"
    />
  );
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active ? active : undefined}
      >
        {isIconType(Icon) ? <Icon /> : Icon}
      </UnstyledButton>
    </Tooltip>
  );
}

function UserButton({ icon: Icon, label, active }: UserButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton
          onClick={open}
          className={classes.link}
          data-active={active ? active : undefined}
        >
          {isIconType(Icon) ? <Icon /> : Icon}
        </UnstyledButton>
      </Tooltip>
      <UserModal opened={opened} onClose={close} />
    </>
  );
}

const navData = [
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

  console.log("sessiondata:", sessionData);

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
          <NavbarLink icon={TbLogin} label="Login" onClick={() => signIn()} />
        ) : (
          <>
            <UserButton
              icon={genUserIcon(sessionData)}
              label="Change Account"
            />
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
