import { Calendar } from "@/components/ui/calendar";
import React from "react";

interface DayProps {
  Daysworked: string[]; // Fechas trabajadas como cadenas
  setDay: React.Dispatch<React.SetStateAction<string>>;
}

function CalendarCustom({ Daysworked, setDay }: DayProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  React.useEffect(() => {
    if (selectedDate) {
      setDay(selectedDate.toISOString().split("T")[0]);
    }
  }, [selectedDate, setDay]);

  // Convertimos las fechas de Daysworked a objetos Date
  const trabajadasDates = Daysworked.map((date) => new Date(date));

  return (
    <div className="h-full p-4 flex flex-col justify-between max-w-full overflow-hidden">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="max-w-full max-h-full text-xs"
        modifiers={{
          trabajadas: trabajadasDates, // Definimos un modificador para las fechas trabajadas
        }}
        modifiersClassNames={{
          trabajadas: "bg-blue-500 text-white", // Clases para el modificador trabajadas
        }}
      />
    </div>
  );
}

export default CalendarCustom;
