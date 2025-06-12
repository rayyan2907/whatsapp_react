import React from "react";

export default function Chat({ pp, contact, msg, time, unread, active }) {
  return (
    <div
      className={`flex justify-between items-center cursor-pointer w-full h-[55px] px-3 hover:bg-[#202d33] ${
        active ? "bg-[#202d33]" : ""
      }`}>
        
      {/* profile pic */}
      <img src={pp} alt="profile_pic" className="rounded-full w-[50px] mr-5" />
      {/* info */}
      <div className="flex justify-between border-t border-neutral-700 w-full h-full py-3 ">
        {/* contact info */}
        <div className="flex flex-col justify-between text-white ">
          <h1
            style={{
              margin: 10,
              fontSize: "16px",
              fontWeight: 10,
              color: "white",
            }}
          >
            {contact}
          </h1>
        </div>
        {/* time and unread */}
        <div></div>
      </div>
    </div>
  );
}
