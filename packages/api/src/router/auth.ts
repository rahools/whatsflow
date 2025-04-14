import type { TRPCRouterRecord } from "@trpc/server";

import { auth } from "@whatsflow/auth/server";

import { protectedProcedure } from "../trpc";

export const authRouter = {
  getSession: protectedProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),

  signOut: protectedProcedure.mutation(async (opts) => {
    if (!opts.ctx.token) {
      return { success: false };
    }
    await auth.api.revokeSession({
      headers: opts.ctx.headers,
      body: { token: opts.ctx.token },
    });
    return { success: true };
  }),

  signOutOtherDevices: protectedProcedure.mutation(async (opts) => {
    if (!opts.ctx.token) {
      return { success: false };
    }
    await auth.api.revokeOtherSessions({
      headers: opts.ctx.headers,
    });
    return { success: true };
  }),

  signOutAllDevices: protectedProcedure.mutation(async (opts) => {
    if (!opts.ctx.token) {
      return { success: false };
    }
    await auth.api.revokeSessions({
      headers: opts.ctx.headers,
    });
    return { success: true };
  }),
} satisfies TRPCRouterRecord;
