import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "./ui/new-button";

const pathToTitleMap = {
  "/dashboard": "Dashboard",
  "/analytics": "Analytics",
  "/leave": "Leave Application",
};

const Navbar = ({ path }) => {
  const title = useMemo(() => {
    return pathToTitleMap[path] || "Dashboard";
  }, [path]);
  return (
    <div className="m-4 border rounded-xl p-3 shadow-lg flex items-center justify-between">
      <div className="md:text-3xl text-2xl  font-bold font-winky mx-4 text-primary tracking-wide">
        {title}
      </div>
      <div className="flex">
        <div className="mx-4 md:flex items-center gap-3  hidden">
          <Avatar className="size-10 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>John</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-rubic ">John Doe</h4>
            <p className="text-xs font-rubic text-muted">johndoe@gmail.com</p>
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
