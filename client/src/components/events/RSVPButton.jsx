import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";
import { eventService } from "../../services/eventService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RSVPButton({ event, onChanged }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const joined = event.rsvps?.some(r => String(r.user?._id || r.user) === String(user?._id) && r.status === "going");
  const handle = async () => {
    if (!user) return navigate("/login", { state: { from: `/events/${event._id}` } });
    setBusy(true);
    try { await eventService.rsvp(event._id, joined ? "cancelled" : "going"); onChanged?.(); } finally { setBusy(false); }
  };
  return <Button className="w-full" variant={joined ? "secondary" : "gold"} onClick={handle} disabled={busy || event.status === "completed"}>{event.status === "completed" ? "Event Completed" : busy ? "Saving..." : joined ? "Cancel RSVP" : "RSVP"}</Button>;
}
