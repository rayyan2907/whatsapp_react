import React, { useState, useEffect } from "react";
import { chatsData } from "../data/chatsData";
import Chat from "./Chat";

export default function ChatBar({ filter }) {
  const [chats, setChats] = useState(chatsData);

  useEffect(() => {
    const newChats = filter ? 
    chatsData.filter((chat)=> chat.unreadMsgs) : chatsData;
    setChats(newChats);
  }, [filter]);

  return (
    // main chats container
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-full ">
      {/* chats */}
      <div>
        {chats.map((chat, i) => {
          return (
            <Chat
              pp={chat.pp}
              contact={chat.contact}
              msg={chat.msg}
              time={chat.time}
              unread={chat.unreadMsgs}
              active={i === 0}
            />
          );
        })}
      </div>
    </div>
  );
}
