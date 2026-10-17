import { useState } from "react";
export function useApi(request) {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const run = async (...args) => { setLoading(true); setError(""); try { return await request(...args); } catch(e) { setError(e.response?.data?.message || e.message); throw e; } finally { setLoading(false); } };
  return {run,loading,error};
}
