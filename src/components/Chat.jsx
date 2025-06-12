import React from "react";

export default function Chat({ pp, contact, msg, time, unread, active }) {
  return (
    <div
      className={`flex justify-between items-center cursor-pointer w-full h-[55px] px-3 hover:bg-[#202d33] ${
        active ? "bg-[#202d33]" : ""
      }`}
    >
      {/* profile pic */}
      <img
        src={pp}
        alt="profile_pic"
        className="rounded-full w-[40px] mr-5 p-5px"
      />
      {/* info */}
      <div className="flex justify-between border-t border-neutral-700 w-full h-full py-3 ">
        {/* contact info */}
        <div className="flex flex-col justify-between text-white ">
          <h1
            style={{
              margin: 10,
              fontSize: "15px",
              fontWeight: 10,
              color: "white",
            }}
          >
            {contact}
            <p
              style={{
                fontSize: "10px",
                padding: "1px",
              }}
            >
              {msg}
            </p>
          </h1>
        </div>
        {/* time and unread */}
        <div className="flex flex-col justify-between items-end h-full text-xs">
          <p
            style={{
              color: "#10B981",
              fontSize: "9px",
              padding: "9px",
            }}
          >
            {time}
          </p>
          {unread && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#10B981", // emerald-500
                borderRadius: "9999px", // fully rounded
                width: "20px", // fixed typo from '20ox' to '20px'
                height: "100%",
                padding: "1px",
                marginRight: "6px",
                margin: "10px",
              }}
            >
              <p style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#10B981", // emerald-500
                borderRadius: "9999px", // fully rounded
                fontSize: "12px",
                color: "black",
              }}>{unread}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
