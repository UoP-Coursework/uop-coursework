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
    });
  }),

  setProfileUsername: protectedProcedure
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

  setProfileEmail: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        data: {
          email: input.email,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
    }),

  setProfileAddress: protectedProcedure
    .input(
      z.object({
        address: z.string().max(40),
        address2: z.string().max(40),
        town_city: z.string().max(40),
        postcode: z.string().max(15),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        data: {
          address: input.address,
          address2: input.address2,
          town_city: input.town_city,
          postcode: input.postcode,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
    }),

  setPreferredTravelType: protectedProcedure
    .input(
      z.object({
        preferred_travel_type: z.string().max(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        data: {
          preferred_travel_type: input.preferred_travel_type,
        },
        where: {
          id: ctx.session.user.id,
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
        preferred_travel_type: z.string().max(20),
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
          preferred_travel_type: input.preferred_travel_type,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
    }),

  addOffsetFootprint: protectedProcedure
    .input(
      z.object({
        travelType: z.string().max(20),
        miles: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let calculation;
      let carbonType;

      switch (input.travelType) {
        case "Bicycling": {
          calculation = 100 * input.miles;
          carbonType = "offset";
          break;
        }

        case "Walking": {
          calculation = 100 * input.miles;
          carbonType = "offset";
          break;
        }

        case "Driving": {
          calculation = 100 * input.miles;
          carbonType = "footprint";
          break;
        }

        case "Transit": {
          calculation = 50 * input.miles;
          carbonType = "footprint";
          break;
        }
      }

      if (carbonType == "offset") {
        return ctx.db.user.update({
          data: {
            carbon_offset: calculation,
          },
          where: {
            id: ctx.session.user.id,
          },
        });
      } else {
        return ctx.db.user.update({
          data: {
            carbon_footprint: calculation,
          },
          where: {
            id: ctx.session.user.id,
          },
        });
      }
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

  getProfileUsename: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        username: true,
      },
    });
  }),

  getProfilePreferredTravelType: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        preferred_travel_type: true,
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
