import {Routes,Route} from "react-router-dom";
import Landing from "../pages/auth/Landing";import Login from "../pages/auth/Login";import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";import DiscoverGroups from "../pages/DiscoverGroups";import GroupDetails from "../pages/GroupDetails";import CreateGroup from "../pages/CreateGroup";import EditGroup from "../pages/EditGroup";import Events from "../pages/Events";import EventDetails from "../pages/EventDetails";import CreateEvent from "../pages/CreateEvent";import Discussions from "../pages/Discussions";import Notifications from "../pages/Notifications";import Profile from "../pages/Profile";import AdminDashboard from "../pages/admin/AdminDashboard";import Reports from "../pages/admin/Reports";import Users from "../pages/admin/Users";import Analytics from "../pages/admin/Analytics";import ProtectedRoute from "./ProtectedRoute";
const P=({children})=><ProtectedRoute>{children}</ProtectedRoute>;
export default function AppRoutes(){return <Routes>
<Route path="/" element={<Landing/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
<Route path="/dashboard" element={<P><Dashboard/></P>}/><Route path="/groups" element={<P><DiscoverGroups/></P>}/><Route path="/groups/:id" element={<P><GroupDetails/></P>}/><Route path="/create-group" element={<P><CreateGroup/></P>}/><Route path="/groups/:id/edit" element={<P><EditGroup/></P>}/>
<Route path="/events" element={<Events/>}/><Route path="/events/:id" element={<P><EventDetails/></P>}/><Route path="/create-event" element={<P><CreateEvent/></P>}/>
<Route path="/discussions" element={<Discussions/>}/><Route path="/notifications" element={<P><Notifications/></P>}/><Route path="/profile" element={<P><Profile/></P>}/>
<Route path="/admin" element={<P><AdminDashboard/></P>}/><Route path="/admin/reports" element={<P><Reports/></P>}/><Route path="/admin/users" element={<P><Users/></P>}/><Route path="/admin/analytics" element={<P><Analytics/></P>}/>
<Route path="/search" element={<Events/>}/><Route path="*" element={<Landing/>}/>
</Routes>}
