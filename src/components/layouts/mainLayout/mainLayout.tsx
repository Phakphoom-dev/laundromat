import { Outlet } from "react-router-dom";
import Navbar from "@/components/layouts/mainLayout/navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
}
