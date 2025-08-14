import {
  CalendarDaysIcon,
  LayoutDashboard,
  LineChart,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    to: "/analytics",
    icon: LineChart,
    label: "Analytics",
  },
  {
    to: "/leave",
    icon: CalendarDaysIcon,
    label: "Leave Application",
  },
];

const Sidebar = () => {
  const activeClass = "text-rose-500 scale-110 rotate-[-5deg]";
  const defaultClass = "text-rose-300 hover:text-rose-400";

  return (
    <div
      className="
        md:w-17
        fixed bottom-0 left-0 right-0 h-16 
         md:h-[92vh] md:ml-10
        m-4 md:m-4      
        md:fixed  
        md:top-4 md:left-4 md:bottom-4 
        bg-white border rounded-xl 
        shadow-xl shadow-rose-300 
        flex flex-row md:flex-col 
        items-center justify-around md:justify-center 
        gap-3 md:gap-8 
        px-4 py-2 md:p-4 
        z-50
        dark:bg-primary-foreground/30 backdrop-blur-sm
        
      "
    >
      {navItems.map(({ to, icon: Icon, label }) => (
        <Tooltip key={to}>
          <TooltipTrigger asChild>
            <NavLink to={to}>
              {({ isActive }) => (
                <Icon
                  size={isActive ? 28 : 23}
                  className={`transition-all duration-300 ease-in-out transform ${
                    isActive ? activeClass : defaultClass
                  }`}
                />
              )}
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {label}
          </TooltipContent>
        </Tooltip>
      ))}

      {/* LogOut icon (visible only on larger screens, if desired) */}

      <ModeToggle />
    </div>
  );
};

export default Sidebar;
