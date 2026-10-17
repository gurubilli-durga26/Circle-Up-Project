import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (!this.state.error) return this.props.children;
    return <div className="min-h-screen bg-[#101010] p-8 text-white"><div className="mx-auto max-w-3xl rounded-2xl border border-red-500/30 bg-red-500/10 p-6"><h1 className="text-2xl font-black text-red-300">Circle-Up encountered a page error</h1><p className="mt-2 text-gray-300">Open the browser console for the full error. The application did not silently fail.</p><pre className="mt-4 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-red-200">{String(this.state.error?.stack || this.state.error)}</pre><button className="mt-4 rounded-xl bg-[#1B4332] px-5 py-3 font-semibold" onClick={() => window.location.reload()}>Reload</button></div></div>;
  }
}
