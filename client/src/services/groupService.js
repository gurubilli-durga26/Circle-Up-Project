import api from "./api";
export const groupService = {
  list: (params={}) => api.get("/groups", {params}).then(r=>r.data),
  get: id => api.get(`/groups/${id}`).then(r=>r.data),
  create: data => api.post("/groups", data).then(r=>r.data),
  update: (id,data) => api.put(`/groups/${id}`,data).then(r=>r.data),
  join: id => api.post(`/groups/${id}/join`).then(r=>r.data),
  leave: id => api.post(`/groups/${id}/leave`).then(r=>r.data)
};
