import { Modal } from "@mantine/core";
import type { ReactElement } from "react";
import UserSettings from "./userSettings";

const UserModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose(): void;
}) => {
  return (
    <CustomModal opened={opened} onClose={onClose} title="User Settings">
      <UserSettings />
    </CustomModal>
  );
};

const CustomModal = ({
  children,
  opened,
  onClose,
  title,
}: {
  children: ReactElement;
  opened: boolean;
  onClose(): void;
  title: string;
}) => {
  const className =
    "bg-zinc-100 text-slate-700 selection:bg-zinc-200/30 dark:bg-zinc-900 dark:text-slate-300";

  return (
    <Modal.Root opened={opened} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content className="[&>section]:flex-none [&>section]:basis-[55rem] [&>section]:bg-inherit">
        <Modal.Header className={className}>
          <Modal.Title className={`${className} text-lg font-bold`}>
            {title}
          </Modal.Title>
          <Modal.CloseButton
            className={`${className} hover:bg-slate-300 dark:hover:bg-zinc-200/30`}
          />
        </Modal.Header>
        <Modal.Body className={className}>{children}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export { CustomModal };
export default UserModal;
