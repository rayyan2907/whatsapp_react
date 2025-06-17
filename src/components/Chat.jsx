import React from "react";

export default function Chat({ pp, contact, msg, time, unread, active }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        padding: "12px 16px",
        backgroundColor: active ? "#2a3942" : "transparent",
        borderBottom: "1px solid #202d33",
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a3942")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = active
          ? "#2a3942"
          : "transparent")
      }
    >
      {/* Profile Picture */}
      <img
        src={pp}
        alt="profile_pic"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "9999px",
          objectFit: "cover",
          marginRight: "12px",
        }}
      />

      {/* Info Block */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: "15px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "200px",
            }}
          >
            {contact}
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "#25D366",
              marginLeft: "10px",
              whiteSpace: "nowrap",
            }}
          >
            {time}
          </span>
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "#aaa",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {msg}
        </div>
      </div>

      {/* Unread Badge */}
      {unread > 0 && (
        <div
          style={{
            backgroundColor: "#25D366",
            color: "black",
            borderRadius: "9999px",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          {unread}
        </div>
      )}
    </div>
  );
}
