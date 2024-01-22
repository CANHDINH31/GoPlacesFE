import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/hotel", payload);

export const listHotel = async () => await request.get("/api/hotel");

export const updateHotel = async (id, payload) =>
  await request.put("/api/hotel/" + id, payload);

export const deleteHotel = async (id) =>
  await request.delete("/api/hotel/" + id);
