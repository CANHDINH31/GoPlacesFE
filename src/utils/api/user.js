import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/user", payload);

export const loginAccount = async (payload) =>
  await request.post("/api/user/login", payload);

export const lostPassword = async (payload) =>
  await request.post("/api/user/lost-password", payload);

export const listUser = async () => await request.get("/api/user");

export const deleteUser = async (id) => await request.delete("/api/user/" + id);

export const updateUser = async (id, payload) =>
  await request.put("/api/user/" + id, payload);

export const getUserById = async (id) => await request.get("/api/user/" + id);
