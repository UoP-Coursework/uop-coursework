import { Modal } from "@mantine/core";

const UserModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose(): void;
}) => {
  return (
    <>
      <Modal.Root
        opened={opened}
        onClose={onClose}
        className="bg-zinc-100 text-slate-300 selection:bg-zinc-200/30 dark:bg-zinc-900"
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className="bg-zinc-100 selection:bg-zinc-200/30 dark:bg-zinc-900">
            <Modal.Title>Modal Title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className="bg-zinc-100 selection:bg-zinc-200/30 dark:bg-zinc-900">
            Modal Content
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default UserModal;
