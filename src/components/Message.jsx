import React from "react";

export default function Message({ msg, time, isLink, img, sent }) {
  return (
    <div
      style={{
        marginBottom: "15px",
      }}
      className={`flex justify-center items-center rounded-full w-fit my-1
        ${sent ? "bg-[#005c4b] ml-auto " : "bg-[#202d33] mr-auto"} 
    `}
    >
      {img ? (
        <div className="relative w-full p-2">
          <img
            src={img}
            alt="sent image"
            className="rounded-md max-h-[270px] w-full "
          />
          <p
            style={{
              position: "absolute",
              right: "0.5rem",
              bottom: "0.75rem",
              color: "#8793a1",
              fontSize: "10px",
              minWidth: "50px",
            }}
          >
            {time}
          </p>
        </div>
      ) : (
        <div
          className="flex justify-between items-end h-fit max-w-[410px] p-2 "
          style={{
            wordBreak: "break-word",
            padding: "15px",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "0.875rem",
              marginRight: "1rem",
            }}
          >
            {msg}
          </p>
          <p
            className="text-[#8796a1] text-[10px] min-w-[50px] "
            style={{
              marginLeft: "10px",
            }}
          >
            {time}
          </p>
        </div>
      )}
    </div>
  );
}
