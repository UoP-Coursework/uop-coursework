import { TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState, type ReactNode } from "react";
import { z } from "zod";
import { CustomModal } from "../userModal";

const EditableField = ({
  label,
  value,
  child,
  mutate,
}: {
  label: string;
  value: string | null;
  child?: ReactNode;
  mutate: (data: string) => void;
}) => {
  const [opened, { open, close }] = useDisclosure();
  const [inputValue, setInputValue] = useState<string>(value ?? "");

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div>
        <p className="font-bold">{label}:</p>
        {child ? child : <p>{value}</p>}
      </div>
      <button
        className="h-10 w-16 rounded-lg bg-zinc-600 p-1"
        onClick={() => open()}
      >
        Edit
      </button>

      <CustomModal opened={opened} onClose={close} title="Edit">
        <div>
          <p className="font-bold">{label}:</p>
          <TextInput
            placeholder={label}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div>
            <button
              className="rounded-md bg-mantine-blue p-2 text-white"
              onClick={() => {
                mutate(inputValue);
                close();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

const EditableAddress = ({
  label,
  value,
  mutate,
}: {
  label: string;
  value: {
    address: string | null;
    address2: string | null;
    town_city: string | null;
    postcode: string | null;
  };
  mutate: (data: {
    address: string;
    address2: string;
    town_city: string;
    postcode: string;
  }) => void;
}) => {
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      address: value.address ?? "",
      address2: value.address2 ?? "",
      town_city: value.town_city ?? "",
      postcode: value.postcode ?? "",
    },
    validate: zodResolver(
      z.object({
        address: z.string().max(40),
        address2: z.string().max(40),
        town_city: z.string().max(40),
        postcode: z.string().max(15),
      }),
    ),
  });

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div>
        <p className="font-bold">{label}:</p>
        <div>
          <p>{value.address}</p>
          <p>{value.address2}</p>
          <p>{value.town_city}</p>
          <p>{value.postcode}</p>
        </div>
      </div>
      <button
        className="h-10 w-16 rounded-lg bg-zinc-600 p-1"
        onClick={() => open()}
      >
        Edit
      </button>

      <CustomModal opened={opened} onClose={close} title="Edit">
        <div>
          <form
            onSubmit={form.onSubmit((values) => {
              mutate(values);
              close();
            })}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-row items-center justify-between gap-4 selection:bg-blue-600">
              <TextInput
                placeholder="Address"
                label="Address"
                className="flex-auto basis-4"
                {...form.getInputProps("address")}
              />
              <TextInput
                placeholder="Address 2"
                label="Address 2 (Optional)"
                className="flex-auto basis-4"
                {...form.getInputProps("address2")}
              />
            </div>
            <TextInput
              placeholder="Town/City"
              label="Town/City"
              className="flex-auto basis-4"
              {...form.getInputProps("town_city")}
            />
            <TextInput
              placeholder="Postal Code"
              label="Postal Code"
              className="flex-auto basis-4"
              {...form.getInputProps("postcode")}
            />
            <div className="flex justify-end pt-4">
              <button
                className="rounded-md bg-mantine-blue p-2 text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
};

export { EditableAddress, EditableField };
