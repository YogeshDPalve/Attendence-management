import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCurrentDayMonth,
  getCurrentTime,
  getCurrentYear,
} from "@/utils/time";
import { Separator } from "@radix-ui/react-context-menu";
import { Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [date, setDate] = useState(new Date());

  const [dates, setDates] = useState({
    currentTime: null,
    currentMonth: null,
    currentYear: null,
  });

  useEffect(() => {
    const updateDateTime = () => {
      setDates({
        currentTime: getCurrentTime(),
        currentMonth: getCurrentDayMonth(),
        currentYear: getCurrentYear(),
      });
    };

    updateDateTime(); // initial run
  }, []);
  return (
    <div className="m-4 rounded-lg md:mt-8">
      <div className="flex md:flex-row flex-col gap-2">
        <Card className={"border p-3 py-7  "}>
          <CardContent className="text-2xl flex flex-col justify-between items-center h-full w-full md:mt-5">
            <div className="flex items-center gap-3 text-muted">
              <Sun /> <span className="tracking-wide">{dates.currentTime}</span>
            </div>
            <div>
              <h3>Today:</h3>
              <h3>{dates.currentMonth}</h3>
              <h3>{dates.currentYear}</h3>
            </div>
          </CardContent>
        </Card>
        <Separator className="bg-red-600" />
        <Card className="p-2 shadow-md">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
