import { Link } from "react-router-dom";
export default function Landing() {
  return <div className="min-h-screen bg-[#101010] text-white">
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
      <div className="max-w-3xl">
        <p className="font-semibold text-[#10B981]">COMMUNITY • HOBBIES • REAL CONNECTIONS</p>
        <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">Connect through hobbies. <span className="text-[#10B981]">Meet beyond the feed.</span></h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-400">Circle-Up helps you discover local groups, create events and lobbies, meet people and build real-world communities.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/register" className="rounded-xl bg-[#1B4332] px-6 py-3 font-bold">Create Account</Link><Link to="/login" className="rounded-xl border border-[#10B981] px-6 py-3 font-bold text-[#10B981]">Log In</Link></div>
      </div>
    </div>
  </div>;
}
