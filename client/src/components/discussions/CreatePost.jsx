import { useState } from "react";
import Button from "../common/Button";
export default function CreatePost({ onCreate }) {
  const [content, setContent] = useState("");
  return <form onSubmit={e => {e.preventDefault(); if(content.trim()){onCreate(content);setContent("")}}} className="rounded-2xl border border-[#2A2A2E] bg-[#1B1B1D] p-4">
    <textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full resize-none bg-transparent text-white outline-none" rows="3" placeholder="Share something with your circle..."/>
    <div className="mt-3 flex justify-end"><Button type="submit">Post</Button></div>
  </form>;
}
