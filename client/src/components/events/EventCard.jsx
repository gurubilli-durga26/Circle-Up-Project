import { CalendarDays, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import RSVPButton from "./RSVPButton";

export default function EventCard({ event, onChanged }) {
  const date = new Date(event.startDate);
  return (
    <article className="rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D] p-4">
      <div className="mb-4 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-[#1B4332] to-[#10B981]">
        {event.imageUrl ? <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-5xl">🎉</div>}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link to={`/events/${event._id}`} className="text-lg font-bold text-white hover:text-[#10B981]">{event.title}</Link>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#10B981]">{event.category}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${event.status === "completed" ? "bg-gray-700 text-gray-300" : event.status === "ongoing" ? "bg-[#10B981]/20 text-[#10B981]" : "bg-[#FF8800]/15 text-[#FF8800]"}`}>{event.status}</span>
      </div>
      <div className="mt-4 space-y-2 text-sm text-gray-400">
        <p className="flex gap-2"><CalendarDays size={16}/>{date.toLocaleDateString()} · {date.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}</p>
        <p className="flex gap-2"><MapPin size={16}/>{event.location}</p>
        <p className="flex gap-2"><Users size={16}/>{event.goingCount ?? event.rsvps?.length ?? 0} going</p>
      </div>
      <div className="mt-4"><RSVPButton event={event} onChanged={onChanged}/></div>
    </article>
  );
}
