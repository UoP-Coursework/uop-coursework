import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getProfileInfo: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        username: true,
        carbon_offset: true,
        carbon_footprint: true,
      },
    });
  }),

  addProfileInfo: protectedProcedure
    .input(
      z.object({
        username: z.string().max(20),
        address: z.string().max(40),
        address2: z.string().max(40),
        town_city: z.string().max(40),
        postcode: z.string().max(15),
        country: z.string().max(60),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        data: {
          username: input.username,
          address: input.address,
          address2: input.address2,
          town_city: input.town_city,
          postcode: input.postcode,
          country: input.country,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
    }),

  addProfileUsername: protectedProcedure
    .input(
      z.object({
        username: z.string().max(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        data: {
          username: input.username,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
    }),

  addUserVehicle: protectedProcedure
    .input(
      z.object({
        vehicle_id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user_Vehicle.create({
        data: {
          owner_id: ctx.session.user.id,
          vehicle_id: input.vehicle_id,
        },
      });
    }),

  getLeaderboardStats: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        username: true,
        carbon_offset: true,
        carbon_footprint: true,
      },
      take: 50,
    });
  }),
});
