export default function CommentList({ comments = [] }) {
  return <div className="space-y-3">{comments.map(c => <div key={c._id} className="rounded-xl bg-[#1B1B1D] p-3"><b className="text-sm">{c.author?.name || "Member"}</b><p className="text-sm text-gray-400">{c.content}</p></div>)}</div>;
}
