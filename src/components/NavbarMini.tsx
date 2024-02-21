import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { 
    TbHome,
    TbGauge,
    TbSwitchHorizontal,
    Tb123,
    TbLogout,
    TbLogin
} from "react-icons/tb";
import type { IconType } from "react-icons/lib";
import classes from "../styles/navbarmin.module.css";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface NavbarLinkProps {
    icon: IconType;
    label: string;
    active?: boolean;
    slug?: string;
    onClick?(): void;
}

function NavbarLink({icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={classes.link} data-active={active ?? undefined}>
                <Icon />
            </UnstyledButton>
        </Tooltip>
    );
}


const navData = [
    {
        icon: TbHome,
        label: "Home",
        slug: "/"
    },
    {
        icon: TbGauge,
        label: "Dashboard",
        slug: "/dashboard"
    },
    {
        icon: Tb123,
        label: "Leaderboard",
        slug: "leaderboard"
    }
]


export default function NavbarMinimal() { 
    const [active, setActive] = useState(0);
    const router = useRouter();
    const { data: sessionData } = useSession();

    const handleOnClick = (index: number, slug: string) => {
        setActive(index);
        void router.push(slug);
    }


    const links = navData.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => handleOnClick(index, link.slug)}
        />
    ));

    console.log('session data is', sessionData)
    return (
        <nav className="flex flex-col w-20 h-full p-4 border-r-1.5">
            <Center>
                <Image src="/favicon.ico" alt="favicon" height={32} width={32}/>
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink icon={TbSwitchHorizontal} label="Change Account" />
                {
                    sessionData ? 
                    (
                        <NavbarLink icon={TbLogout} label="Logout" onClick={() => signOut()}/>
                    ) : 
                    (
                        <NavbarLink icon={TbLogin} label="Login" onClick={() => signIn()}/>
                    )
                }
            </Stack>
        </nav>
    )
}