export default function ReportTable({ reports=[] }) {
  return <div className="overflow-x-auto rounded-2xl border border-[#2A2A2E]"><table className="w-full text-left text-sm"><thead className="bg-[#1B1B1D] text-gray-400"><tr><th className="p-3">Reason</th><th className="p-3">Status</th><th className="p-3">Created</th></tr></thead><tbody>{reports.map(r=><tr key={r._id} className="border-t border-[#2A2A2E]"><td className="p-3">{r.reason}</td><td className="p-3">{r.status}</td><td className="p-3 text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>;
}
