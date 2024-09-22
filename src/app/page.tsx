import MainContent from "~/components/main-content";
import Sidebar from "~/components/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
    <Sidebar />
    <MainContent />
  </div>
  );
}
