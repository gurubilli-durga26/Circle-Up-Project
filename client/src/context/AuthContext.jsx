import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  const save = (data) => {
    localStorage.setItem("circleup_token", data.token);
    setUser(data.user);
  };
  const login = async data => save(await authService.login(data));
  const register = async data => save(await authService.register(data));
  const logout = () => { localStorage.removeItem("circleup_token"); setUser(null); };

  useEffect(() => {
    if (!localStorage.getItem("circleup_token")) return setLoading(false);
    authService.me().then(r=>setUser(r.user)).catch(()=>logout()).finally(()=>setLoading(false));
  }, []);

  return <AuthContext.Provider value={{user,loading,login,register,logout,setUser}}>{children}</AuthContext.Provider>;
}
