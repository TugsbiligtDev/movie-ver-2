"use client";
import { useState } from "react";
import { Input } from "../ui/input";
const SearchBox = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div>
      <Input
        type="text"
        placeholder="Search movies..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
