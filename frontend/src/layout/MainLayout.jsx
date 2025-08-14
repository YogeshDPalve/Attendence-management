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
      <div className="flex-1 md:ml-32 mt-25 mx-auto">
        {!shouldHideNavbar && <Navbar path={location.pathname} />}
        <div className="md:mx-14 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
