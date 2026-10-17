import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import GroupList from "../components/groups/GroupList";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import {groupService} from "../services/groupService";
import {useAuth} from "../hooks/useAuth";

export default function DiscoverGroups(){
 const {user}=useAuth(); const [groups,setGroups]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
 const load=()=>{setLoading(true);setError("");groupService.list().then(r=>setGroups(r.groups||[])).catch(e=>setError(e.response?.data?.message||"Could not load communities.")).finally(()=>setLoading(false));};
 useEffect(load,[]);
 return <PageContainer><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-3xl font-black">My Groups & Communities</h1><p className="text-gray-500">Discover communities and lobbies around you.</p></div>{user&&<Link to="/create-group"><Button>Create Lobby</Button></Link>}</div>{error&&<div className="mb-5 rounded-xl bg-red-500/10 p-4 text-red-300">{error}</div>}{loading?<Loader text="Loading communities..."/>:<GroupList groups={groups} onChanged={load}/>}</PageContainer>;
}
