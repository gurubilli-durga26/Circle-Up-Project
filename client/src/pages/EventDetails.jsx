import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users, RefreshCw } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import RSVPButton from "../components/events/RSVPButton";
import Button from "../components/common/Button";
import { eventService } from "../services/eventService";

function errorMessage(error) {
  if (error?.response?.status === 404) return "This event could not be found. It may have been deleted.";
  if (error?.response?.status === 401) return "Your login session has expired. Please log in again.";
  if (error?.code === "ERR_NETWORK" || !error?.response) return "The Circle-Up server is not reachable. Make sure the backend is running on port 5000.";
  return error?.response?.data?.message || "Could not load this event.";
}

function EventDetailsContent({ event, reload }) {
  const navigate = useNavigate();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  return (
    <div className="overflow-hidden rounded-3xl border border-[#2A2A2E] bg-[#1B1B1D] shadow-2xl">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#1B4332] to-[#10B981] md:h-80">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        ) : (
          <div className="flex h-full items-center justify-center text-7xl">🎉</div>
        )}
        <button onClick={() => navigate(-1)} className="absolute left-5 top-5 rounded-full bg-black/70 p-3 text-white hover:bg-black" aria-label="Go back">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#10B981]">{event.category}</p>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">{event.title}</h1>
          </div>
          <span className={`rounded-full px-4 py-2 text-sm font-bold ${event.status === "completed" ? "bg-gray-700 text-gray-200" : event.status === "ongoing" ? "bg-[#10B981]/20 text-[#10B981]" : "bg-[#FF8800]/15 text-[#FF8800]"}`}>
            {event.status}
          </span>
        </div>

        <div className="mt-6 grid gap-3 text-gray-400 md:grid-cols-2">
          <p className="flex items-center gap-3"><CalendarDays size={19} className="text-[#10B981]" />{start.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</p>
          <p className="flex items-center gap-3"><Clock size={19} className="text-[#10B981]" />{start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          <p className="flex items-center gap-3 md:col-span-2"><MapPin size={19} className="text-[#10B981]" />{event.location}</p>
          <p className="flex items-center gap-3"><Users size={19} className="text-[#10B981]" />{event.goingCount ?? 0} going · {event.capacity} spots</p>
          {event.creator?.name && <p className="text-sm text-gray-500">Created by {event.creator.name}</p>}
        </div>

        <div className="mt-8 border-t border-[#2A2A2E] pt-7">
          <h2 className="text-2xl font-bold">About this event</h2>
          <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-400">{event.description}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:max-w-md"><RSVPButton event={event} onChanged={reload} /></div>
          <Link to="/events" className="text-center text-sm font-semibold text-gray-400 hover:text-white">Back to events</Link>
        </div>
      </div>
    </div>
  );
}

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!id) {
      setError("No event ID was provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await eventService.get(id);
      if (!response?.event) throw new Error("The API returned no event data.");
      setEvent(response.event);
    } catch (err) {
      console.error("Event details load failed:", err);
      setEvent(null);
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  return (
    <PageContainer>
      {loading && <div className="rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D] p-8 text-gray-300">Loading event...</div>}
      {!loading && error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="text-xl font-bold text-red-300">Event could not be loaded</h1>
          <p className="mt-2 text-gray-300">{error}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={load}><RefreshCw size={17} /> Retry</Button>
            <a href="http://localhost:5000/api/health" target="_blank" rel="noreferrer" className="rounded-xl border border-[#2A2A2E] px-5 py-3 text-sm font-semibold text-gray-300">Check API</a>
            <Link to="/events" className="rounded-xl border border-[#2A2A2E] px-5 py-3 text-sm font-semibold text-gray-300">Back to Events</Link>
          </div>
        </div>
      )}
      {!loading && !error && event && <EventDetailsContent event={event} reload={load} />}
    </PageContainer>
  );
}
