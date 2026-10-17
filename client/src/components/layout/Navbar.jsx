import { Bell, LogOut, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-[#2A2A2E] bg-[#101010]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link to="/dashboard" className="text-2xl font-black text-white">Circle<span className="text-[#10B981]">-Up</span></Link>
        <div className="hidden flex-1 md:block">
          <div className="mx-auto flex max-w-md items-center rounded-xl border border-[#2A2A2E] bg-[#1B1B1D] px-3">
            <Search size={17} className="text-gray-500" />
            <input onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${encodeURIComponent(e.currentTarget.value)}`)} className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none" placeholder="Search events or groups..." />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {user && <Link to="/notifications" className="rounded-full p-2 text-gray-300 hover:bg-[#1B1B1D]"><Bell size={20}/></Link>}
          {user ? (
            <>
              <Link to="/profile" className="hidden text-sm text-gray-300 sm:block">{user.name}</Link>
              <button onClick={() => { logout(); navigate("/"); }} className="rounded-lg p-2 text-gray-400 hover:text-white"><LogOut size={19}/></button>
            </>
          ) : <Link to="/login" className="text-sm font-semibold text-[#10B981]">Login</Link>}
        </div>
      </div>
    </header>
  );
}
