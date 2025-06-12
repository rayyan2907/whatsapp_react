import React, { useState } from "react";
import Roundedbtn from "./common/roundedbtn";
import { MdPeople } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import { pp } from "../assets/whatsapp";

export default function LeftMenu() {
  const [filter, setFilter] = useState(true);

  return (
    <div className="flex flex-col border-r border-neutral-700 w-full h-screen">
      {/* profile bar */}
      <div className="flex justify-between items-center bg-[#202d33] h-[60px] p-3 ">
        <img src={pp} alt="profile_pic" className=" rounded-full w-[35px]  " />
        <div className="flex justify-between w-[150px]">
          <Roundedbtn icon={<MdPeople size={22} />} />
          <Roundedbtn icon={<TbCircleDashed size={20} />} />
          <Roundedbtn icon={<BsFillChatTextFill size={20} />} />
          <Roundedbtn icon={<HiDotsVertical size={20} />} />
        </div>
      </div>

      {/* seatch bar */}

      <div className="flex justify-between items-center h-[60px] p-3 ">
        <input
          type="text"
          placeholder="  Search or start a new chat"
          className="rounded-full border-none bg-[#202d33] text-[#8796a1] text-sm font-light outline-none px-4 py-2 w-full h-[40px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
        />
        <button
          style={{
            backgroundColor: filter ? "#43d61e" : "transparent", // emerald-500 hex
            color: filter ? "white" : "#8796a1",
            border: "none",
            padding: "0.5rem",
            borderRadius: "9999px", // fully rounded
            margin: "0.5rem",
          }}
          onClick={() => setFilter(
                !filter
            )}
        >
            
          <BiFilter size={20} />
        </button>
      </div>
    </div>
  );
}
