import api from "./api";
export const eventService = {
  list: (params={}) => api.get("/events", {params}).then(r=>r.data),
  get: id => api.get(`/events/${id}`).then(r=>r.data),
  create: data => api.post("/events", data).then(r=>r.data),
  update: (id,data) => api.put(`/events/${id}`,data).then(r=>r.data),
  rsvp: (id,status="going") => api.post(`/rsvps/${id}`, {status}).then(r=>r.data)
};
