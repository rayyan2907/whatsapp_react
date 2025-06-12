import React from "react";
import { cs1 } from "../assets/whatsapp";

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
      <div></div>

      {/* send messages */}
      <div className="flex items-center bg-[#202d33] w-full h-[70px] p-2 ">
        {/* upload */}
        {/* mic */}
        {/* text box */}
        {/* send */}
      </div>
    </div>
  );
}
