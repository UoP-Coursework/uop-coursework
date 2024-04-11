import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  });
  console.log(isSuccess);
  if (status === "loading") return null;

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <main className="font-clash max-h-auto relative flex min-h-screen flex-col items-center overflow-x-hidden bg-zinc-100 selection:bg-zinc-200/30 dark:bg-zinc-900">
      <div className="lg:w flex h-full w-full md:w-2/3">
        <div className="m-0 h-screen w-screen p-0">
          <h1 className="pt-10 text-center text-4xl font-bold leading-tight tracking-tight text-slate-700 md:text-5xl dark:text-slate-300">
            Welcome {SessionData?.user.name}!
          </h1>

          <form
            onSubmit={form.onSubmit((values) => {
              mutate({ ...values });
              console.log(isSuccess);
            })}
            className="text-slate-700 dark:text-slate-300"
          >
            <TextInput
              withAsterisk
              label="Username"
              placeholder="Username"
              {...form.getInputProps("username")}
            />
            <TextInput
              withAsterisk
              label="Address"
              placeholder="First line of address"
              {...form.getInputProps("address")}
            />
            <TextInput
              label="Second line of address"
              placeholder="Second line of address"
              {...form.getInputProps("address2")}
            />
            <TextInput
              withAsterisk
              label="City"
              placeholder="City"
              {...form.getInputProps("city")}
            />
            <TextInput
              withAsterisk
              label="Postcode"
              placeholder="Postcode"
              {...form.getInputProps("postcode")}
            />
            <TextInput
              withAsterisk
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
