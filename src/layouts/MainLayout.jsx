import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <p>Footer</p>
    </div>
  );
}
