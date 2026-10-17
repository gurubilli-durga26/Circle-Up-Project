export default function AnalyticsChart({ data=[] }) {
  const max = Math.max(...data.map(x => x.value), 1);
  return <div className="rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D] p-5"><h3 className="font-bold">Activity</h3><div className="mt-5 flex h-40 items-end gap-3">{data.map(x=><div key={x.label} className="flex-1"><div className="rounded-t bg-[#10B981]" style={{height:`${(x.value/max)*100}%`}}/><p className="mt-2 truncate text-center text-xs text-gray-500">{x.label}</p></div>)}</div></div>;
}
