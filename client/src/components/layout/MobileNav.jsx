import { CalendarDays, Compass, Search, User, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MobileNav() {
  const items = [
    ["/dashboard", "Home", Compass],
    ["/groups", "Groups", Users],
    ["/events", "Events", CalendarDays],
    ["/search", "Search", Search],
    ["/profile", "Profile", User]
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-[#2A2A2E] bg-[#1B1B1D] lg:hidden">
      {items.map(([to, label, Icon]) => (
        <NavLink key={to} to={to} className={({isActive}) => `flex flex-col items-center gap-1 py-2 text-[11px] ${isActive ? "text-[#10B981]" : "text-gray-500"}`}>
          <Icon size={20}/><span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
