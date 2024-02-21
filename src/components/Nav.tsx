import { 
    FiHome
} from "react-icons/fi";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const NavItems = [
    {
        name: "Home",
        slug: "/",
        icon: FiHome,
    }
]

export default function NavBar({
    path
}: {
    path: string;
}) {
    const router = useRouter();
    const [_mounted, setMounted] = useState(false);
    const [tooltipVisibility, setTooltipVisibility] = useState(Array<boolean>(NavItems.length).fill(false));

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full min-h-full h-full flex flex-col justify-start items-center pt-6">
            <div className="flex flex-col gap-4">
                {NavItems.map((item, index) => {
                    return (
                        <div key={item.slug}>
                            {path === item.slug ? (
                                <button
                                    key={index}
                                    className="w-full flex justify-center items-center dark:bg-zinc-700 bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-zinc-800 focus:bg-zinc-800 shadow hover:shadow-xl rounded hover:scale-110 duration-300 ease-in-out dark:focus:bg-zinc-700 relative"
                                    onMouseLeave={() => {
                                        const temp = [...tooltipVisibility];
                                        temp[index] = false;
                                        setTooltipVisibility(temp);
                                    }}
                                    onMouseEnter={() => {
                                        const temp = [...tooltipVisibility];
                                        temp[index] = true;
                                        setTooltipVisibility(temp);
                                    }}
                                    onClick={() => router.push(item.slug)}
                                >
                                    <div className="p-2">
                                        <item.icon size="1rem" className="text-zinc-100" />
                                    </div>
                                    {tooltipVisibility[index] && (
                                        <span className="absolute min-w-full text-[0.75rem] leading-none left-10 p-[0.62rem] rounded shadow-xl text-zinc-200 dark:bg-zinc-700 bg-zinc-800">
                                            {item.name}
                                        </span>
                                    )}
                                </button>
                            ) : (
                                <button
                                    key={index}
                                    className="w-full flex justify-center items-center dark:bg-zinc-800 dark:hover:bg-zinc-700 shadow hover:shadow-xl rounded hover:scale-110 duration-300 ease-in-out dark:focus:bg-zinc-700 bg-zinc-700 hover:bg-zinc-800 focus:bg-zinc-800 relative"
                                    onMouseLeave={() => {
                                        const temp = [...tooltipVisibility];
                                        temp[index] = false;
                                        setTooltipVisibility(temp);
                                    }}
                                    onMouseEnter={() => {
                                        const temp = [...tooltipVisibility];
                                        temp[index] = true;
                                        setTooltipVisibility(temp);
                                    }}
                                    onClick={() => router.push(item.slug)}
                                    >
                                    <div className="p-2">
                                        <item.icon size="1rem" className="text-zinc-100" />
                                    </div>
                                    {tooltipVisibility[index] && (
                                        <span className="absolute text-[0.75rem] leading-none left-10 p-[0.62rem] rounded shadow-xl text-zinc-200 dark:bg-zinc-700 bg-zinc-800">
                                            {item.name}
                                        </span>
                                    )}
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
};