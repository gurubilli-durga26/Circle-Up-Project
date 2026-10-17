import { MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";
import { groupService } from "../../services/groupService";
import { useState } from "react";

export default function GroupCard({ group, onChanged }) {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const joined = group.members?.some((m) => String(m.user?._id || m.user) === String(user?._id));
  const join = async () => {
    if (!user) return;
    setBusy(true);
    try { await groupService.join(group._id); onChanged?.(); } finally { setBusy(false); }
  };
  return (
    <article className="overflow-hidden rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D]">
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#1B4332] to-[#10B981]">
        {group.imageUrl ? <img src={group.imageUrl} alt={group.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-5xl">👥</div>}
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold capitalize text-white">{group.type || "community"}</span>
      </div>
      <div className="p-4">
        <Link to={`/groups/${group._id}`} className="text-lg font-bold text-white hover:text-[#10B981]">{group.name}</Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500"><Users size={14}/>{group.memberCount ?? group.members?.length ?? 0} members</p>
        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500"><MapPin size={14}/>{group.location || "Local community"}</p>
        {user && <Button className="mt-4 w-full" variant={joined ? "secondary" : "accent"} onClick={join} disabled={busy || joined}>{joined ? "Joined" : busy ? "Joining..." : "Join"}</Button>}
      </div>
    </article>
  );
}
