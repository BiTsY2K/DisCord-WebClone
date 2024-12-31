"use client"

import { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const ChatHeaderSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const hasSearchText = !!searchText;

  return (
    <div className={`flex items-center px-0.5 mx-2 rounded-sm cursor-text overflow-hidden transition-all duration-100 ease-linear
    text-[#313338] dark:text-[#dbdee1] bg-[#d1d3d6] dark:bg-[#1e1f22] h-6 focus-within:w-60 ${hasSearchText ? 'w-60' : 'w-36'}`}>
      <Input type={"text"} placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}
        className="px-0.5 focu border-none outline-none shadow-none focus-visible:ring-0 placeholder-[#313338] dark:placeholder-[#dbdee1]"
      />
      <div className="icon-wrapper">
        <Button variant={"ghost"} size={"icon"} onClick={() => setSearchText('')}
        className={`h-6 w-6 shadow-none hover:bg-transparent ${hasSearchText ? 'cursor-pointer' : 'cursor-text'}`}
        >
          <IoSearch className={`${!hasSearchText ? 'flex opacity-100 rotate-0' : 'hidden opacity-0'} transition-all duration-100 ease-linear`} />
          <IoClose className={`${hasSearchText ? 'flex opacity-100 rotate-90' : 'hidden opacity-0'} transition-all duration-100 ease-linear`}/>
        </Button>
      </div>
    </div>
  );
}