import api from "./api";
export const reportService = {
  create: data => api.post("/reports", data).then(r=>r.data),
  list: () => api.get("/reports").then(r=>r.data)
};
