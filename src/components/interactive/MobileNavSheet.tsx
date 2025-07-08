// import React from 'react'; // Removed as React is not explicitly used
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react'; // Hamburger icon

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/reports", label: "Reports" },
];

export function MobileNavSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left"> {/* Or 'right' based on original design */}
        <SheetHeader>
          <SheetTitle>GZS</SheetTitle> {/* Or your site title */}
        </SheetHeader>
        <nav className="flex flex-col space-y-2 mt-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-lg font-medium hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}