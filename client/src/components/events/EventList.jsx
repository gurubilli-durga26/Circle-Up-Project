import EventCard from "./EventCard";
import EmptyState from "../common/EmptyState";
export default function EventList({ events, onChanged }) {
  if (!events?.length) return <EmptyState title="No events in this section" description="Create an event or check another status." />;
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{events.map(e => <EventCard key={e._id} event={e} onChanged={onChanged}/>)}</div>;
}
