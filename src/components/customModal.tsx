import { Modal } from "@mantine/core";
import { ReactElement } from "react";

const UserModal = ({
  children,
  opened,
  onClose,
  className,
}: {
  children: ReactElement;
  opened: boolean;
  onClose(): void;
  className: string;
}) => {
  return (
    <>
      <Modal.Root opened={opened} onClose={onClose} className="">
        <Modal.Overlay />
        <Modal.Content className="[&>section]:bg-inherit">
          <Modal.Header className={className}>
            <Modal.Title className={className}>Modal Title</Modal.Title>
            <Modal.CloseButton className={className} />
          </Modal.Header>
          <Modal.Body className={className}>{children}</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
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
  return (
    <Modal.Root opened={opened} onClose={onClose} className="">
      <Modal.Overlay />
      <Modal.Content className="[&>section]:bg-inherit">
        <Modal.Header className="bg-zinc-100 text-slate-700 selection:bg-zinc-200/30 dark:bg-zinc-900 dark:text-slate-300">
          <Modal.Title className="bg-zinc-100 text-slate-700 selection:bg-zinc-200/30 dark:bg-zinc-900 dark:text-slate-300">
            {title}
          </Modal.Title>
          <Modal.CloseButton className="bg-zinc-100 text-slate-700 selection:bg-zinc-200/30 dark:bg-zinc-900 dark:text-slate-300" />
        </Modal.Header>
        <Modal.Body className="bg-zinc-100 text-slate-700 selection:bg-zinc-200/30 dark:bg-zinc-900 dark:text-slate-300">
          {children}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
export default CustomModal;
