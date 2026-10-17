import api from "./api";
export const analyticsService = { dashboard: () => api.get("/analytics/dashboard").then(r=>r.data) };
