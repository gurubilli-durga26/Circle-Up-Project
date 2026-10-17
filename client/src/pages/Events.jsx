import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import EventList from "../components/events/EventList";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { eventService } from "../services/eventService";

function messageForError(err) {
  if (err?.response?.status === 401) return "Your login session is invalid or expired. Please log in again.";
  if (err?.code === "ERR_NETWORK" || !err?.response) return "The Circle-Up server is not reachable. Start the server with npm.cmd run dev inside the server folder.";
  return err?.response?.data?.message || "Could not load events.";
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [tab, setTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await eventService.list({ status: tab });
      setEvents(Array.isArray(response?.events) ? response.events : []);
    } catch (err) {
      console.error("Events load failed:", err);
      setEvents([]);
      setError(messageForError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [tab]);

  return (
    <PageContainer>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">Events</h1>
          <p className="text-gray-500">Discover upcoming, ongoing and completed community events.</p>
        </div>
        <Link to="/create-event"><Button>Create Event</Button></Link>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {["upcoming", "ongoing", "completed"].map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`rounded-full px-5 py-2 text-sm font-semibold ${tab === item ? "bg-[#1B4332] text-white" : "border border-[#2A2A2E] bg-[#1B1B1D] text-gray-400"}`}>
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
          <p className="font-semibold">{error}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={load}>Retry</Button>
            <a className="rounded-xl border border-[#2A2A2E] px-5 py-3 text-sm font-semibold text-gray-300" href="http://localhost:5000/api/health" target="_blank" rel="noreferrer">Check API</a>
          </div>
        </div>
      )}

      {loading ? <Loader text="Loading events..." /> : <EventList events={events} onChanged={load} />}
    </PageContainer>
  );
}
