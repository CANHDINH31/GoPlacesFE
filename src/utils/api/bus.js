import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/bus", payload);

export const listBus = async () => await request.get("/api/bus");

export const updateBus = async (id, payload) =>
  await request.put("/api/bus/" + id, payload);

export const deleteBus = async (id) => await request.delete("/api/bus/" + id);
