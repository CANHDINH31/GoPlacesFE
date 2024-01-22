import { request } from "./request";

export const login = async (payload) =>
  await request.post("/api/auth/login", payload);
