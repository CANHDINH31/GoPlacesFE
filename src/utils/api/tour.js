import { request } from "./request";

export const create = async (payload) =>
  await request.post("/api/tour", payload);

export const listTour = async () => await request.get("/api/tour");

export const deleteTour = async (id) => await request.delete("/api/tour/" + id);
