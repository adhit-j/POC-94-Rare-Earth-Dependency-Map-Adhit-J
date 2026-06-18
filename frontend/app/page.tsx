import Sidebar from "@/components/Sidebar";
import MainStage from "@/components/MainStage";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-white">
      <MainStage />
      <Sidebar />
    </div>
  );
}
