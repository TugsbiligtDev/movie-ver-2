"use client";
import { useState, } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
const SearchBox = () => {
  const [search, setSearch] = useState("");
  const router= useRouter()
  const handleSubmit=(event)=>{
    event.preventDefault()
    router.push(`/search/${search}`)
  }
  console.log(search);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search movies..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBox;
