import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { z } from "zod";
import { api } from "~/utils/api";

const LandingPage = () => {
  const { data: SessionData, status } = useSession();
  const router = useRouter();
  const { mutate, isSuccess } = api.user.addProfileInfo.useMutation();

  const form = useForm({
    initialValues: {
      username: "",
      address: "",
      address2: "",
      town_city: "",
      postcode: "",
      country: "",
    },
    validate: zodResolver(
      z.object({
        username: z.string().min(4).max(20),
        address: z.string().min(1).max(40),
        address2: z.string().max(40),
        town_city: z.string().min(1).max(40),
        postcode: z.string().min(1).max(15),
        country: z.string().min(1).max(60),
      }),
    ),
  });
  if (status === "loading") return null;

  return (
    <main className="font-clash max-h-auto relative flex min-h-screen flex-col items-center overflow-x-hidden bg-zinc-100 selection:bg-zinc-200/30 dark:bg-zinc-900">
      <div className="lg:w flex h-full w-full md:w-2/5">
        <div className="m-0 h-screen w-screen p-0">
          <h1 className="pt-10 text-center text-4xl font-bold leading-tight tracking-tight text-slate-700 md:text-5xl dark:text-slate-300">
            Welcome {SessionData?.user.name}!
          </h1>

          <form
            onSubmit={form.onSubmit((values) => {
              mutate({ ...values });
              console.log(isSuccess);
              if (isSuccess) {
                void router.push("/");
              }
            })}
            className="flex flex-col gap-2 text-slate-700 dark:text-slate-300"
          >
            <TextInput
              required
              label="Username"
              placeholder="Username"
              {...form.getInputProps("username")}
            />
            <div className="flex flex-row items-center gap-4">
              <TextInput
                required
                label="Address"
                placeholder="Address"
                className="flex-auto basis-4"
                {...form.getInputProps("address")}
              />
              <TextInput
                label="Address 2 (Optional)"
                placeholder="Apt, Street"
                className="flex-auto basis-4"
                {...form.getInputProps("address2")}
              />
            </div>
            <TextInput
              required
              label="City"
              placeholder="City"
              {...form.getInputProps("town_city")}
            />
            <TextInput
              required
              label="Postal Code"
              placeholder="Postcode"
              {...form.getInputProps("postcode")}
            />
            <TextInput
              required
              label="Country"
              placeholder="Country"
              {...form.getInputProps("country")}
            />
            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
          {/* <div className="flex min-h-screen flex-row items-center justify-center text-slate-700 dark:text-slate-300">
            <button onClick={() => router.push("/")}>Home</button>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
