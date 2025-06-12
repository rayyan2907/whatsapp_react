import React from "react";
import Roundedbtn from "./common/roundedbtn";
import { MdPeople } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import {pp } from "../assets/whatsapp"


export default function LeftMenu() {
  return (
    <div className="flex flex-col border-r border-neutral-700 w-full h-screen">
      {/* profile bar */}
      <div className="flex justify-between items-center bg-[#202d33] h-[60px] p-3 ">
        <img src={pp} alt="profile_pic" className=" rounded-full w-[35px] " />

        <div className="flex justify-between w-[150px]">
            <Roundedbtn icon={<MdPeople size={22}/>}/>
            <Roundedbtn icon={<TbCircleDashed size={20}/>}/>
            <Roundedbtn icon={<BsFillChatTextFill size={20}/>}/>
            <Roundedbtn icon={<HiDotsVertical size={20}/>}/>

        </div>
      </div>
    </div>
  );
}
