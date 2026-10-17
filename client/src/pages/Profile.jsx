import { useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

function errorMessage(err) {
  if (err?.response?.status === 401) return "Your login session is invalid or expired. Please log in again.";
  if (err?.code === "ERR_NETWORK" || !err?.response) return "The Circle-Up server is not reachable. Start the server with npm.cmd run dev inside the server folder.";
  return err?.response?.data?.message || "Could not load your profile.";
}

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: user?.name || "", location: user?.location || "", bio: user?.bio || "", hobbies: user?.hobbies || [] });

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const r = await api.get("/users/profile");
      const next = r.data.user;
      setProfile(next);
      setUser(next);
      setForm({ name: next.name || "", location: next.location || "", bio: next.bio || "", hobbies: next.hobbies || [] });
    } catch (err) {
      console.error("Profile load failed:", err);
      if (err?.response?.status === 401) {
        setError(errorMessage(err));
        return;
      }
      try {
        const fallback = await api.get("/auth/me");
        const next = { ...fallback.data.user, stats: { eventsJoined: 0, eventsCreated: 0, groupsJoined: 0, peopleInteracted: 0 } };
        setProfile(next);
        setUser(fallback.data.user);
        setForm({ name: next.name || "", location: next.location || "", bio: next.bio || "", hobbies: next.hobbies || [] });
        setError("Profile statistics are temporarily unavailable, but your account data loaded successfully.");
      } catch (fallbackErr) {
        setError(errorMessage(fallbackErr));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault(); setError("");
    try {
      const r = await api.put("/users/profile", form);
      setProfile(r.data.user); setUser(r.data.user); setEdit(false);
    } catch (err) { setError(err?.response?.data?.message || "Could not update profile."); }
  };

  if (loading && !profile) return <PageContainer><Loader text="Loading your profile..." /></PageContainer>;
  if (!profile) return <PageContainer><div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300"><h2 className="text-xl font-bold">Profile could not be loaded.</h2><p className="mt-2">{error}</p><div className="mt-4 flex gap-3"><Button variant="secondary" onClick={load}>Retry</Button><Button variant="danger" onClick={logout}>Log out</Button><a className="rounded-xl border border-[#2A2A2E] px-5 py-3 font-semibold text-gray-300" href="http://localhost:5000/api/health" target="_blank" rel="noreferrer">Check API</a></div></div></PageContainer>;

  const stats = profile.stats || {};
  return <PageContainer>
    <div className="overflow-hidden rounded-3xl border border-[#2A2A2E] bg-[#101010]">
      <div className="h-32 bg-gradient-to-r from-[#1B4332] to-[#10B981]" />
      <div className="-mt-10 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#26262A] text-3xl font-black ring-4 ring-[#101010]">{profile.name?.[0]?.toUpperCase() || "U"}</div>
            <div><h1 className="text-3xl font-black">{profile.name}</h1><p className="text-gray-500">{profile.location}</p><p className="text-gray-400">{profile.bio || "Circle-Up community member"}</p></div>
          </div>
          <Button variant="secondary" onClick={() => setEdit(!edit)}>{edit ? "Cancel" : "Edit Profile"}</Button>
        </div>
        {error && <p className="mt-4 rounded-xl bg-yellow-500/10 p-3 text-yellow-300">{error}</p>}
        {edit && <form onSubmit={save} className="mt-8 grid max-w-2xl gap-4">
          <Input label="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Input label="Location" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <Input label="Bio" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
          <Button>Save Changes</Button>
        </form>}
        <h2 className="mt-10 text-2xl font-bold">Your Journey</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{[["eventsJoined", "Events Joined"], ["eventsCreated", "Events Created"], ["groupsJoined", "Communities Joined"], ["peopleInteracted", "People Interacted"]].map(([k, label]) => <div key={k} className="rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D] p-5"><p className="text-3xl font-black">{stats[k] ?? 0}</p><p className="mt-1 text-gray-500">{label}</p></div>)}</div>
        <h2 className="mt-10 text-2xl font-bold">Hobbies</h2>
        <div className="mt-4 flex flex-wrap gap-2">{(profile.hobbies || []).map(h => <span key={h} className="rounded-full bg-[#1B4332] px-4 py-2 text-sm">{h}</span>)}</div>
        <h2 className="mt-10 text-2xl font-bold">Achievements</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{(profile.achievements || []).map(a => <div key={a} className="rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D] p-5 text-center text-[#FF8800]">{a}</div>)}{!(profile.achievements || []).length && <p className="text-gray-500">Your achievements will appear here as you participate.</p>}</div>
      </div>
    </div>
  </PageContainer>;
}
