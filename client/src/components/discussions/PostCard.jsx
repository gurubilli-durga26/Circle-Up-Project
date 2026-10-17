export default function PostCard({ post }) {
  return <article className="rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D] p-5"><div className="flex items-center justify-between"><b>{post.author?.name || "Community member"}</b><span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span></div><p className="mt-3 text-gray-300">{post.content}</p></article>;
}
