export default function EmptyState({ title = "Nothing here yet", description = "" }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#2A2A2E] bg-[#1B1B1D] p-10 text-center">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="mt-2 text-gray-500">{description}</p>}
    </div>
  );
}
