import MainContent from "~/Components/main-content";
import Sidebar from "~/Components/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
    <Sidebar />
    <MainContent />
  </div>
  );
}
