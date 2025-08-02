import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

const UserDashboard = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="m-4 rounded-lg md:mt-8">
      <div className="flex md:flex-row flex-col">
        {/* <Card className={"border"}>
          <CardContent className={"text-2xl"}>
            <h3>Today:</h3>
            <h3>01 Aug</h3>
            <h3>2025</h3>
          </CardContent>
        </Card> */}
        <Card className="p-2 shadow-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className=""
            // captionLayout="dropdown"
          />
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
