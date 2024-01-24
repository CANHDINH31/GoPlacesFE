import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/order", payload);

export const listOrder = async (tour) =>
  await request.get("/api/order?tour=" + tour);

export const updateOrder = async (id, payload) =>
  await request.put("/api/order/" + id, payload);

export const deleteOrder = async (id) =>
  await request.delete("/api/order/" + id);
