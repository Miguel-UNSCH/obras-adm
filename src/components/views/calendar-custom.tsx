import { Calendar } from "@/components/ui/calendar";
import React from "react";

interface DayProps {
  Daysworked: string [];
  setDay: React.Dispatch<React.SetStateAction<string>>;
}

function CalendarCustom({ Daysworked, setDay }: DayProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  React.useEffect(() => {
    if (selectedDate) {
      setDay(selectedDate.toISOString().split("T")[0]);
    }
  }, [selectedDate, setDay]);

  // Convertimos las fechas trabajadas a objetos Date
  const trabajadasDates = Daysworked.map((date) => new Date(date));
  
  return (
    <div className="grid grid-cols h-full w-full sm:p-4 gap-1 shadow-lg rounded-3xl">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="max-w-full max-h-full text-xs"
        modifiers={{
          Daysworked: trabajadasDates,
        }}
        modifiersClassNames={{
          Daysworked: "bg-green-500 text-white",
        }}
      />
    </div>
  );
}

export default CalendarCustom;
