import Sidebar from "../components/sidebar/page";
import MainContent from "../components/home-page/page";

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <MainContent />
    </div>
  );
}
