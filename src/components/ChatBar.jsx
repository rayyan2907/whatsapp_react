import React, { useState, useEffect } from "react";
import { chatsData } from "../data/chatsData";
import Chat from "./Chat";

export default function ChatBar({ filter, chatUsers }) {
  const [chats, setChats] = useState(chatsData);

  useEffect(() => {
    // Convert chatUsers to chat-style objects
    const chatUserChats = chatUsers.map((user) => ({
      user_id: user.user_id,
      pp: user.profile_pic_url,
      contact: `${user.first_name} ${user.last_name}`,
      msg: "Start chatting...",
      time: "Now",
      unreadMsgs: 0,
    }));

    // Remove any chatUsers from chatsData to avoid duplicates
    const remainingChats = chatsData.filter(
      (chat) => !chatUsers.some((user) => user.user_id === chat.user_id)
    );

    // Combine with user chats at top
    let combinedChats = [...chatUserChats, ...remainingChats];

    const newChats = filter
      ? combinedChats.filter((chat) => chat.unreadMsgs)
      : combinedChats;

    setChats(newChats);
  }, [filter, chatUsers]);

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
