import { Film, Search, ChevronDown, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="w-full py-3">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex gap-2 items-center text-indigo-700">
            <Film className="w-5 h-5" />
            <p className="text-base font-bold">Movie Z</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3">
            {/* Genre Dropdown */}
            <Button variant="outline" className="gap-2">
              <ChevronDown className="w-4 h-4" />
              Genre
            </Button>

            {/* Search Bar */}
            <div className="relative w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search movies..."
                className="pl-10"
              />
            </div>
          </div>

          <Button variant="outline" size="icon">
            <Moon className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
