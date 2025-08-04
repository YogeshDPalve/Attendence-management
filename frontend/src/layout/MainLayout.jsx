import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  // List of routes where you don't want to show the Navbar
  const hideNavbarRoutes = ["/login", "/"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-row min-h-screen bg-accent">
      {!shouldHideNavbar && <Sidebar />}
      <div className="flex-1 md:mx-10">
        {!shouldHideNavbar && <Navbar path={location.pathname} />}

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
