import React from "react";
import { cs1 } from "../assets/whatsapp";
import Roundedbtn from "./common/roundedbtn";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";

export default function ChatDetail() {
  return (
    <div className="flex flex-col h-screen">
      {/* contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3 ">
        {/* details */}
        <div className="flex items-center">
          {/* pfp */}
          <img
            src={cs1}
            alt="profile_pic"
            className="rounded-full w-[40px] h-[40px] mr-5 "
          />
          {/* contact info */}

          <div className="flex flex-col ">
            {/*contact  */}
            <h1
              style={{
                margin: 7,
                marginBottom: -5,
                fontSize: "15px",
                fontWeight: 10,
                color: "white",
              }}
            >
              RAYYAN
            </h1>

            {/* status */}
            <p
              style={{
                margin: 7,
                fontSize: "10px",
                color: "#8796a1",
              }}
            >
              online
            </p>
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="h-full"></div>

      {/* send messages */}
      <div className="flex items-center bg-[#202d33] w-full h-[70px] p-2 ">
        {/* upload */}
        <span
          style={{
            margin: 20,
          }}
        >
          <Roundedbtn icon={<AiOutlinePaperClip size={20} />} />
        </span>
        {/* text box */}
        <input
          type="text"
          placeholder="Type a message"
          style={{
            borderRadius: "9999px", // fully rounded
            border: "none",
            backgroundColor: "#2c3943",
            color: "#e5e5e5",
            fontSize: "0.875rem", // text-sm
            fontWeight: "300", // font-light
            outline: "none",
            paddingLeft: "1rem", // px-4
            paddingRight: "1rem",
            paddingTop: "0.5rem", // py-2
            paddingBottom: "0.5rem",
            width: "100%",
            height: "40px",
          }}
        />
        {/* mic */}
        <span
        style={{
          margin:12,
        }}>
          <Roundedbtn icon={<BsFillMicFill size={19} />} />
        </span>
        {/* send */}
      </div>
    </div>
  );
}
