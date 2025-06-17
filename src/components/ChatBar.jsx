import React, { useState, useEffect } from "react";
import { chatsData } from "../data/chatsData";
import Chat from "./Chat";

export default function ChatBar({ filter, chatUsers, onChatSelect }) {
  const [chats, setChats] = useState(chatsData);

  useEffect(() => {
    const chatUserChats = chatUsers.map((user) => ({
      user_id: user.user_id,
      pp: user.profile_pic_url,
      contact: `${user.first_name} ${user.last_name}`,
      msg: "Start chatting...",
      time: "Now",
      unreadMsgs: 0,
    }));

    const remainingChats = chatsData.filter(
      (chat) => !chatUsers.some((user) => user.user_id === chat.user_id)
    );

    const combinedChats = [...chatUserChats, ...remainingChats];

    const newChats = filter
      ? combinedChats.filter((chat) => chat.unreadMsgs)
      : combinedChats;

    setChats(newChats);
  }, [filter, chatUsers]);

  return (
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-full">
      <div>
        {chats.map((chat, i) => {
          const fullUser = {
            user_id: chat.user_id,
            profile_pic_url: chat.pp,
            first_name: chat.contact?.split(" ")[0] || "Unknown",
            last_name: chat.contact?.split(" ").slice(1).join(" ") || "",
          };

          return (
            <div key={i} onClick={() => onChatSelect(fullUser)}>
              <Chat
                pp={chat.pp}
                contact={chat.contact}
                msg={chat.msg}
                time={chat.time}
                unread={chat.unreadMsgs}
                active={i === 0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
