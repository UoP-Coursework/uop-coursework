import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.user.update({
        data: {
          id: ctx.session.user.id,
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

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  // getLatest: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),
});
