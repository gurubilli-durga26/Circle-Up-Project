import {Navigate,useLocation} from "react-router-dom";import {useAuth} from "../hooks/useAuth";import Loader from "../components/common/Loader";
export default function ProtectedRoute({children}){const {user,loading}=useAuth();const loc=useLocation();if(loading)return <Loader/>;if(!user)return <Navigate to="/login" replace state={{from:loc.pathname+loc.search}}/>;return children;}
