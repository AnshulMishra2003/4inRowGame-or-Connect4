import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const NameEntry = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const navigate = useNavigate();

  const joinGame = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }
    setIsJoining(true);
    setError("");
    socket.emit("joinGame", trimmed);

    // Fallback: auto-play with bot if no player joins in 5 seconds
    const botTimeout = setTimeout(() => {
      if (isJoining) {
        socket.emit("startBotGame", trimmed);
      }
    }, 5000);

    return () => clearTimeout(botTimeout);
  };

  useEffect(() => {
    const handleGameStarted = ({ gameId }) => {
      navigate(`/game/${gameId}`, { state: { username: name } });
    };

    socket.on("gameStarted", handleGameStarted);

    return () => {
      socket.off("gameStarted", handleGameStarted);
    };
  }, [name, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0b1d1f",
        padding: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "32px",
          color: "#ffffff",
          marginBottom: "20px",
          fontWeight: "600",
        }}
      >
        Enter Your Name
      </h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        style={{
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "15px",
          width: "250px",
          textAlign: "center",
        }}
      />
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      <button
        onClick={joinGame}
        disabled={isJoining}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          backgroundColor: isJoining ? "#6c757d" : "#6ee7b7",
          color: "#0b1d1f",
          border: "none",
          borderRadius: "8px",
          cursor: isJoining ? "not-allowed" : "pointer",
          transition: "background-color 0.3s",
        }}
      >
        {isJoining ? "Joining..." : "Join Game"}
      </button>
    </div>
  );
};

export default NameEntry;
