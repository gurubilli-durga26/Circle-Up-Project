import { createContext, useContext, useState } from "react";
const AppContext = createContext(null);
export function AppProvider({children}) {
  const [toast,setToast] = useState(null);
  const notify = (message,type="success") => { setToast({message,type}); setTimeout(()=>setToast(null),3000); };
  return <AppContext.Provider value={{toast,notify}}>{children}{toast && <div className="fixed right-4 top-20 z-50 rounded-xl bg-[#1B4332] px-4 py-3 text-white shadow-xl">{toast.message}</div>}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);
