import { Compass, CalendarDays, Users, MessageSquare, User, PlusCircle, Shield } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const items = [
  ["/dashboard", "Dashboard", Compass],
  ["/groups", "My Groups", Users],
  ["/events", "Events", CalendarDays],
  ["/discussions", "Discussions", MessageSquare],
  ["/profile", "Profile", User]
];

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#2A2A2E] bg-[#101010] p-4 lg:block">
      <nav className="space-y-1">
        {items.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} className={({isActive}) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive ? "bg-[#1B4332] text-white" : "text-gray-400 hover:bg-[#1B1B1D] hover:text-white"}`}>
            <Icon size={19}/>{label}
          </NavLink>
        ))}
        {user && (
          <NavLink to="/create-event" className="mt-4 flex items-center gap-3 rounded-xl bg-[#10B981]/10 px-4 py-3 font-semibold text-[#10B981]">
            <PlusCircle size={19}/> Create Event
          </NavLink>
        )}
        {user?.role === "admin" && <NavLink to="/admin" className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-gray-400 hover:bg-[#1B1B1D]"><Shield size={19}/> Admin</NavLink>}
      </nav>
    </aside>
  );
}
