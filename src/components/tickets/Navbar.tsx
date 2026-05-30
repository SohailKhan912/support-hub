import { Link } from "@tanstack/react-router";
import { Headset, Plus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Headset className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-semibold text-foreground">HelpDesk</span>
            <span className="block text-xs text-muted-foreground">Support CRM</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <Button asChild size="sm">
            <Link to="/tickets/new">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Ticket</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
