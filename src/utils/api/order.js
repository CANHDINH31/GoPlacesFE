import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/order", payload);

export const getOrderByUserId = async (id) =>
  await request.get("/api/order/get-by-user/" + id);
