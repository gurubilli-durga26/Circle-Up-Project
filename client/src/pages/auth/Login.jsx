import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth(); const nav=useNavigate(); const loc=useLocation();
  const [form,setForm]=useState({email:"",password:""}); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  const submit=async e=>{e.preventDefault();setError("");setBusy(true);try{await login(form);nav(loc.state?.from || "/dashboard",{replace:true});}catch(err){setError(err.response?.data?.message||"Login failed");}finally{setBusy(false)}};
  return <div className="min-h-screen bg-[#101010] p-6 text-white"><div className="mx-auto max-w-md pt-16">
    <Link to="/" className="text-2xl font-black">Circle<span className="text-[#10B981]">-Up</span></Link>
    <h1 className="mt-10 text-3xl font-black">Welcome back</h1><p className="mt-2 text-gray-500">Sign in to continue to your circle.</p>
    <form onSubmit={submit} className="mt-8 space-y-4">{error&&<p className="rounded-xl bg-red-500/10 p-3 text-red-400">{error}</p>}
      <Input label="Email" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <Input label="Password" type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <Button className="w-full" disabled={busy}>{busy?"Signing in...":"Log In"}</Button>
    </form><p className="mt-5 text-sm text-gray-500">Don't have an account? <Link className="text-[#10B981]" to="/register">Create one</Link></p>
  </div></div>;
}
