import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import EventList from "../components/events/EventList";
import GroupList from "../components/groups/GroupList";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { eventService } from "../services/eventService";
import { groupService } from "../services/groupService";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard(){
 const {user}=useAuth(); const [events,setEvents]=useState([]); const [groups,setGroups]=useState([]); const [loading,setLoading]=useState(true);
 const load=async()=>{setLoading(true);try{const [e,g]=await Promise.all([eventService.list({status:"upcoming"}),groupService.list()]);setEvents(e.events);setGroups(g.groups.slice(0,4));}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 return <PageContainer><div className="rounded-3xl bg-gradient-to-r from-[#1B4332] to-[#10B981] p-6 md:p-10"><p className="text-white/70">Welcome back</p><h1 className="mt-2 text-3xl font-black md:text-5xl">{user?.name || "Explorer"}</h1><p className="mt-3 max-w-xl text-white/80">Discover your next activity, meet your people and build your circle.</p><div className="mt-6 flex flex-wrap gap-3"><Link to="/create-event"><Button variant="gold">+ Create Event</Button></Link><Link to="/create-group"><Button variant="secondary">+ Create Lobby</Button></Link></div></div>
 <section className="mt-8"><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold">Upcoming Events</h2><Link className="text-[#10B981]" to="/events">See all</Link></div>{loading?<Loader/>:<EventList events={events} onChanged={load}/>}</section>
 <section className="mt-10"><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold">Popular Groups</h2><Link className="text-[#10B981]" to="/groups">See all</Link></div>{loading?<Loader/>:<GroupList groups={groups} onChanged={load}/>}</section>
 </PageContainer>;
}
