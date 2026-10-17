import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <Navbar />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 pb-24 pt-6 md:px-6 lg:pb-10">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
