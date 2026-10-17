import api from "./api";
export const postService = {
  list: () => api.get("/posts").then(r=>r.data),
  create: content => api.post("/posts", {content}).then(r=>r.data),
  comment: (postId, content) => api.post(`/comments/${postId}`, {content}).then(r=>r.data)
};
