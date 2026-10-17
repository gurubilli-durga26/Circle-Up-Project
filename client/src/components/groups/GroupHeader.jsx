export default function GroupHeader({ group }) {
  return (
    <div className="rounded-2xl border border-[#2A2A2E] bg-gradient-to-r from-[#1B4332] to-[#10B981] p-6">
      <h1 className="text-3xl font-black">{group?.name}</h1>
      <p className="mt-2 text-white/80">{group?.description}</p>
      <p className="mt-3 text-sm text-white/70">{group?.location} · {group?.members?.length || 0} members</p>
    </div>
  );
}
