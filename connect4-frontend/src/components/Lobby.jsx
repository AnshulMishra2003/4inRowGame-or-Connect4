import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const Lobby = () => {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const joinGame = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }
    if (joined) return;

    const cleanedName = trimmed; // keep original case

    const emitJoin = () => {
      console.log("🔗 Emitting joinGame:", cleanedName);
      socket.emit("joinGame", cleanedName);
      setJoined(true);
      setError("");
    };

    if (socket.connected) {
      emitJoin();
    } else {
      socket.once("connect", emitJoin);
    }
  };

  useEffect(() => {
    const handleGameStarted = ({ gameId, players, turn }) => {
      console.log("✅ Game started with ID:", gameId, "Players:", players, "Turn:", turn);

      const cleanedName = name.trim();
      const opponent = players.find((p) => p !== cleanedName) || "BotMaster";

      navigate(`/game/${gameId}`, {
        state: {
          username: cleanedName,
          gameId,
          opponent,
          turn: turn, // keep original case
        },
      });
    };

    socket.on("gameStarted", handleGameStarted);

    return () => {
      socket.off("gameStarted", handleGameStarted);
    };
  }, [name, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b1d1f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 20px",
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#122c2f",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px", color: "#fff", marginBottom: "20px" }}>
          Enter Your Name to Play
        </h2>
        
        <div style={{ 
          backgroundColor: "#0b1d1f", 
          padding: "20px", 
          borderRadius: "15px", 
          marginBottom: "30px",
          border: "2px solid #6ee7b7",
          userSelect: "none",
          cursor: "default"
        }}>
          <h3 style={{ 
            fontSize: "20px", 
            color: "#6ee7b7", 
            marginBottom: "15px",
            userSelect: "none",
            cursor: "default"
          }}>
            🎯 How to Play Connect4
          </h3>
          <p style={{ 
            fontSize: "16px", 
            color: "#fff", 
            lineHeight: "1.6", 
            margin: "0 0 15px 0",
            userSelect: "none",
            cursor: "default"
          }}>
            Get <strong>4 in a Row</strong> to win! Connect your pieces horizontally, vertically, or diagonally. 
            Drop your disc into any column and try to block your opponent while building your winning line!
          </p>
          <p style={{ 
            fontSize: "14px", 
            color: "#6ee7b7", 
            lineHeight: "1.4", 
            margin: "0",
            userSelect: "none",
            cursor: "default",
            fontStyle: "italic"
          }}>
            🤖 <strong>Don't worry!</strong> If no player joins within 10 seconds, our smart bot will be your opponent.
          </p>
        </div>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              joinGame();
            }
          }}
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "20px",
            border: "none",
            marginBottom: "20px",
            width: "80%",
            textAlign: "center",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            outline: "none",
            userSelect: "text"
          }}
          disabled={joined}
          autoComplete="off"
          spellCheck="false"
        />
        {error && <p style={{ color: "#ff6b6b", marginBottom: "20px", fontSize: "16px" }}>{error}</p>}
        <button
          onClick={joinGame}
          disabled={joined}
          style={{
            padding: "12px 30px",
            fontSize: "18px",
            backgroundColor: joined ? "#555" : "#6ee7b7",
            color: joined ? "#fff" : "#000",
            border: "none",
            borderRadius: "20px",
            cursor: joined ? "not-allowed" : "pointer",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
        >
          {joined ? "Waiting for opponent..." : "Play Now"}
        </button>
      </div>
    </div>
  );
};

export default Lobby;
