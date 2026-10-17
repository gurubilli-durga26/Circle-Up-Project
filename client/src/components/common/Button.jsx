export default function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-[#1B4332] hover:bg-[#24583f] text-white",
    accent: "bg-[#10B981] hover:bg-[#0ea371] text-white",
    gold: "bg-[#FF8800] hover:bg-[#e77a00] text-white",
    secondary: "bg-[#1B1B1D] hover:bg-[#26262A] text-white border border-[#2A2A2E]",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };
  return (
    <button
      className={`rounded-xl px-5 py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
