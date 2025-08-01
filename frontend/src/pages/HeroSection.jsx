import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-rose-400 text-4xl font-bold tracking-wide text-center mt-16">
        Attendence app
      </h1>
      <ModeToggle />
    </div>
  );
};

export default HeroSection;
