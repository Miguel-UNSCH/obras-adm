"use client";

import { Calendar } from "@/components/ui/calendar";
import React from "react";

function CalendarCustom() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="h-full p-4 flex flex-col justify-between max-w-full overflow-hidden">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="max-w-full max-h-full text-xs"
      />
    </div>
  );
}

export default CalendarCustom;
