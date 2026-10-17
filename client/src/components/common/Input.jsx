export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-400">{label}</label>}
      <input
        className={`w-full rounded-xl border border-[#2A2A2E] bg-[#1B1B1D] px-4 py-3 text-white outline-none focus:border-[#10B981] ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
