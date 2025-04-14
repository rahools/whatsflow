import { defineEventHandler, toWebRequest } from "h3";

import { nitroHandler } from "@whatsflow/auth/server";

export default defineEventHandler((event) => {
  return nitroHandler(toWebRequest(event));
});
