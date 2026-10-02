import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderMenuProps {
  menuId: string;
}

const desktopQuery = "(min-width: 1200px)";

export default function HeaderMenu({ menuId }: HeaderMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const header = document.getElementById("site-header");
    header?.classList.toggle("is-open", open);
    return () => header?.classList.remove("is-open");
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia(desktopQuery);

    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", onKey);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <Button
      type="button"
      variant="icon"
      className="size-11 text-ink min-[1200px]:hidden"
      aria-expanded={open}
      aria-controls={menuId}
      aria-label={open ? "Close log in menu" : "Open log in menu"}
      onClick={() => setOpen((value) => !value)}
    >
      {open ? <X className="size-6" strokeWidth={1.5} aria-hidden="true" /> : <Menu className="size-6" strokeWidth={1.5} aria-hidden="true" />}
    </Button>
  );
}
