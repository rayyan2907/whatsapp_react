import React, { useState, useEffect, useRef } from "react";
import { cs1 } from "../assets/whatsapp";
import Roundedbtn from "./common/Roundedbtn";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { messagesData } from "../data/chatsData";
import Message from "./Message";
import { getTime } from "../logic/functions";

export default function ChatDetail({ selectedUser }) {
  const [messages, setMessages] = useState(messagesData);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const HandelInput = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };

  const addMessage = (msg) => {
    const newMessage = [...messages, msg];
    setMessages(newMessage);
  };

  const handelInput = () => {
    if (inputRef.current.value.length > 0) {
      addMessage({
        msg: inputRef.current.value,
        time: getTime(),
        sent: true,
      });
      inputRef.current.value = "";
      inputRef.current.focus();
      setTyping(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") {
        handelInput();
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });
  if (!selectedUser) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          backgroundColor: "#0a131a",
          color: "white",
          fontSize: "1.125rem", // text-lg
        }}
      >
        Select a user to start chatting
      </div>
    );
  }
  

  return (
    <div className="flex flex-col h-screen">
      {/* contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3 ">
        {/* details */}
        <div className="flex items-center">
          <img
            src={selectedUser.profile_pic_url}
            alt="profile_pic"
            style={{
              borderRadius: "9999px", // fully rounded
              width: "40px",
              height: "40px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          />

          <div className="flex flex-col ">
            <h1
              style={{
                margin: 7,
                marginBottom: -5,
                fontSize: "15px",
                fontWeight: 10,
                color: "white",
              }}
            >
              {selectedUser.first_name} {selectedUser.last_name}
            </h1>

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
      <div
        className="bg-[#0a131a] h-full overflow-y-scroll "
        style={{
          padding: "12px 7%",
        }}
      >
        {messages.map((msg) => (
          <Message
            msg={msg.msg}
            time={msg.time}
            img={msg.img}
            isLink={msg.isLink}
            sent={msg.sent}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* send messages */}
      <div className="flex items-center bg-[#202d33] w-full h-[55px] p-2 ">
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
            fontSize: "0.96rem", // text-sm
            fontWeight: "300", // font-light
            outline: "none",
            paddingLeft: "1rem", // px-4
            paddingRight: "1rem",
            paddingTop: "0.5rem", // py-2
            paddingBottom: "0.5rem",
            width: "100%",
            height: "40px",
          }}
          onChange={HandelInput}
          ref={inputRef}
        />
        {/* mic */}
        <span
          style={{
            margin: 12,
          }}
        >
          {typing ? (
            <Roundedbtn icon={<MdSend size={19} />} onClick={handelInput} />
          ) : (
            <Roundedbtn icon={<BsFillMicFill size={19} />} />
          )}
        </span>
        {/* send */}
      </div>
    </div>
  );
}
