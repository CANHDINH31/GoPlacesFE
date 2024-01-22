import { request } from "./request";

export const listUser = async () => await request.get("/api/user");

export const deleteUser = async (id) => await request.delete("/api/user/" + id);

export const updateUser = async (id, payload) =>
  await request.put("/api/user/" + id, payload);

export const getUserById = async (id) => await request.get("/api/user/" + id);
