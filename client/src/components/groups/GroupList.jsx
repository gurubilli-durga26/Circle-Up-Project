import GroupCard from "./GroupCard";
import EmptyState from "../common/EmptyState";
export default function GroupList({ groups, onChanged }) {
  if (!groups?.length) return <EmptyState title="No groups found" description="Try another category or create your own." />;
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{groups.map(g => <GroupCard key={g._id} group={g} onChanged={onChanged}/>)}</div>;
}
