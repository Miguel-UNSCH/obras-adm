"use client";

import { Calendar } from "@/components/ui/calendar";
import React from "react";

function CalendarCustom() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="p-4 flex flex-col justify-between h-full">
      cuadro de selección
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </div>
  );
}

export default CalendarCustom;
