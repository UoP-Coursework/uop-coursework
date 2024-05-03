import { useState, type JSX } from "react";
import { TbChevronDown } from "react-icons/tb";

const Accordian = ({
  header,
  content,
}: {
  header: string;
  content: string | JSX.Element;
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="flex w-4/6 flex-col rounded-lg bg-zinc-700 p-2 text-slate-700 dark:text-slate-300">
      <h1
        className="flex w-full cursor-pointer flex-row items-center justify-between gap-4 p-2 text-center text-3xl font-bold"
        onClick={() => setOpen(!isOpen)}
      >
        {header}{" "}
        <TbChevronDown
          className={`${isOpen ? "rotate-180" : ""} duration-150`}
        />
      </h1>
      <div className={`${isOpen ? `` : "hidden"} overflow-hidden px-2`}>
        {content}
      </div>
    </div>
  );
};

export default Accordian;
