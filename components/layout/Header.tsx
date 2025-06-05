"use client";
import { Film, Search, ChevronDown, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SearchBox from "../common/SearchBox";

const Header = () => {
  return (
    <div className="w-full py-3">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <div className="flex gap-2 items-center text-indigo-700">
            <Film className="w-5 h-5" />
            <p className="text-base font-bold">Movie Z</p>
          </div>

          <div className="hidden md:flex gap-3">
            <Button variant="outline" className="gap-2">
              <ChevronDown className="w-4 h-4" />
              Genre
            </Button>

            <div className="relative w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <SearchBox />
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
