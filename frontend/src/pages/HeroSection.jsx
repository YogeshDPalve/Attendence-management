import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-rose-400 text-4xl font-bold tracking-wide text-center mt-16">
        Attendence app
      </h1>
      <Link to={"/dashboard"}>
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  );
};

export default HeroSection;
