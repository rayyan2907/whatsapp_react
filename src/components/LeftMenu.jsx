import React, { useState } from "react";
import ChatBar from "./ChatBar";
import Roundedbtn from "./common/Roundedbtn";
import { MdPeople } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import { pp } from "../assets/whatsapp";
import { useNavigate } from "react-router-dom";

export default function LeftMenu({ onSelectUser }) {
  const [filter, setFilter] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.first_name);
  console.log(user.profile_pic_url);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [chatUsers, setChatUsers] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        if (value.length > 0) {
          fetchSearchResults(value);
        } else {
          setSearchResults([]);
        }
      }, 300) // debounce
    );
  };

  const fetchSearchResults = async (query) => {
    try {
      const token = localStorage.getItem("jwt");
      if (token === null) {
        localStorage.setItem("logoutMessage", "You have been logged out.");
      }
      const res = await fetch(
        `https://localhost:7285/getUser?prefix=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 401) {
        localStorage.setItem("logoutMessage", "You have been logged out.");
        navigate("/"); // Force logout
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error(err);
      setSearchResults([]);
      localStorage.setItem("logoutMessage", "You have been logged out.");
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col border-r border-neutral-700 w-full h-screen">
      {/* profile bar */}
      <div className="flex justify-between items-center bg-[#202d33] h-[60px] p-3 ">
        <img
          src={user.profile_pic_url}
          alt="profile_pic"
          className="rounded-full w-[40px] cursor-pointer"
          onClick={() => setShowProfileModal(true)}
        />
        <div className="flex justify-between w-[150px]">
          <Roundedbtn icon={<MdPeople size={22} />} />
          <Roundedbtn icon={<TbCircleDashed size={20} />} />
          <Roundedbtn icon={<BsFillChatTextFill size={20} />} />
          <Roundedbtn icon={<HiDotsVertical size={20} />} />
        </div>
      </div>

      {showProfileModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#111b21",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <img
              src={user.profile_pic_url}
              alt="Large Profile"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "9999px",
                objectFit: "cover",
                marginBottom: "16px",
              }}
            />
            <h2
              style={{ color: "white", fontSize: "18px", marginBottom: "12px" }}
            >
              {user.first_name} {user.last_name}
            </h2>
            <button
              onClick={() => setShowProfileModal(false)}
              style={{
                fontSize: "14px",
                color: "#ccc",
                backgroundColor: "#444",
                border: "none",
                padding: "8px 16px",
                borderRadius: "9999px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* seatch bar */}
      {/* add a name of the app here */}
      <div className="flex justify-between items-center h-[60px] p-3 ">
        <input
          type="text"
          placeholder="Search by email or name"
          value={searchText}
          onChange={handleSearchChange}
          style={{
            borderRadius: "9999px",
            border: "none",
            backgroundColor: "#202d33",
            color: "#e5e5e5",
            fontSize: "0.875rem",
            fontWeight: "300",
            outline: "none",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            width: "100%",
            height: "40px",
          }}
        />

        <button
          style={{
            backgroundColor: filter ? "#43d61e" : "transparent", // emerald-500 hex
            color: filter ? "white" : "#8796a1",
            border: "none",
            padding: "0.5rem",
            borderRadius: "9999px", // fully rounded
            margin: "0.5rem",
          }}
          onClick={() => setFilter(!filter)}
        >
          <BiFilter size={20} />
        </button>
      </div>
      {searchText.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "120px",
            left: "16px",
            right: "16px",
            backgroundColor: "#0f0f0f",
            padding: "10px",
            maxHeight: "300px",
            maxWidth: "410px",
            overflowY: "auto",
            borderRadius: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            color: "white",
          }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((u) => (
              <div
                key={u.user_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  marginBottom: "4px",
                  borderBottom: "1px solid #2a3942",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("Start chat with", u.email);
                  onSelectUser(u);
                  setSearchText("");
                  setSearchResults([]);
                  setChatUsers((prev) => {
                    if (prev.some((user) => user.user_id === u.user_id))
                      return prev;
                    return [...prev, u];
                  });
                }}
                className="hover:bg-[#2a3942] rounded-full transition-all duration-200"
              >
                <img
                  src={u.profile_pic_url}
                  alt="User DP"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div>
                    {u.first_name} {u.last_name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#aaa" }}>
                    {u.email}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{ padding: "10px", textAlign: "center", color: "#aaa" }}
            >
              No user found
            </div>
          )}
        </div>
      )}

      <ChatBar
        filter={filter}
        chatUsers={chatUsers}
        onChatSelect={(user) => {
          console.log("Selected user:", selectedUser);

          setSelectedUser(user); // for local LeftMenu logic
          onSelectUser(user); // updates ChatDetail in parent
          
        }}
        selectedUser={selectedUser}
      />
    </div>
  );
}
