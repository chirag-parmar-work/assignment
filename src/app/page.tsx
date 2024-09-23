import Sidebar from "../Components/Sidebar/page";
import MainContent from "../Components/HomePage/page";


export default function Home() {
  return (
    <div className="flex h-screen bg-white">
    <Sidebar />
    <MainContent />
  </div>
  );
}
