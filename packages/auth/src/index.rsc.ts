import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { toNextJsHandler } from "better-auth/next-js";

import { db } from "@whatsflow/db/client";
import type { Session, User } from "@whatsflow/db/schema";

import { env } from "../env";

export interface SessionWithUser {
  session: Session;
  user: User;
}

export const validateToken = async (
  token: string,
): Promise<SessionWithUser | null> => {
  const sessionToken = token.slice("Bearer ".length);
  const session = await db.query.session.findFirst({
    where: (session, { eq }) => eq(session.token, sessionToken),
    with: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  return {
    session: session,
    user: session.user,
  };
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export const baseAuthUrl = env.AUTH_URL
  ? `https://${env.AUTH_URL}`
  : "http://localhost:3000";

export const nextJsHandler = toNextJsHandler(auth);
export const nitroHandler = auth.handler;
