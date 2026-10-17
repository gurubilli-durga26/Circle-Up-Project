export default function StatCard({ label, value }) {
  return <div className="rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D] p-5"><p className="text-sm text-gray-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>;
}
