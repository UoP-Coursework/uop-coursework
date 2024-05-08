import { type inferProcedureInput } from "@trpc/server";
import { expect, test } from "vitest";

import { appRouter, type AppRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

test("user addProfileInfo", async () => {
  const ctx = createInnerTRPCContext({
    session: {
      user: {
        id: "clv55vhk50000129k3x9pnh2r",
        role: "admin",
      },
      expires: "30000",
    },
  });

  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["user"]["addProfileInfo"]>;

  const input: Input = {
    address: "test input",
    address2: "test input",
    country: "test input",
    postcode: "test input",
    town_city: "test input",
    username: "test input",
  };

  const example = await caller.user.addProfileInfo(input);
  expect(example).contain(input);
});

test("user addProfileUsername", async () => {
  const ctx = createInnerTRPCContext({
    session: {
      user: {
        id: "clv55vhk50000129k3x9pnh2r",
        role: "admin",
      },
      expires: "30000",
    },
  });

  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["user"]["addProfileUsername"]>;

  const input: Input = {
    username: "testing username",
  };

  const example = await caller.user.addProfileUsername(input);
  expect(example).contain(input);
});

test("user getLeaderboardStats", async () => {
  const ctx = createInnerTRPCContext({
    session: {
      user: {
        id: "clv55vhk50000129k3x9pnh2r",
        role: "admin",
      },
      expires: "30000",
    },
  });

  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["user"]["getLeaderboardStats"]>;

  const input: Input = {
    address: "test input",
    address2: "test input",
    country: "test input",
    postcode: "test input",
    town_city: "test input",
    username: "test input",
  };

  const example = await caller.user.getLeaderboardStats(input);
  expect(example).contain(input);
});
