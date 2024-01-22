import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/food", payload);

export const listFood = async () => await request.get("/api/food");

export const updateFood = async (id, payload) =>
  await request.put("/api/food/" + id, payload);

export const deleteFood = async (id) => await request.delete("/api/food/" + id);
