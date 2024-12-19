"use client";

import * as React from "react";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeChange() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="border p-1 rounded-full flex flex-rpw gap-1 w-fit">
      <Button
        variant={currentTheme === "light" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("light")}
        className="rounded-full w-fit h-fit p-2"
      >
        <Sun className="w-4 h-4" />
      </Button>
      <Button
        variant={currentTheme === "dark" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("dark")}
        className="rounded-full w-fit h-fit p-2"
      >
        <Moon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("system")}
        className="rounded-full w-fit h-fit p-2"
      >
        <MonitorCog className="w-4 h-4" />
      </Button>
    </div>
  );
}