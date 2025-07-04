import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import socket from "../socket";

const ROWS = 6;
const COLS = 7;

const GameBoard = () => {
  const location = useLocation();
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  // Get data from navigation state
  const { username, opponent, turn: initialTurn } = location.state || {};
  
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [turn, setTurn] = useState(initialTurn || null);
  
  // If no state data, redirect back to lobby
  useEffect(() => {
    console.log("🔍 GameBoard state check:", { username, gameId, opponent, initialTurn });
    console.log("🔍 Location state:", location.state);
    if (!username || !gameId) {
      console.log("❌ Missing required data, redirecting to lobby");
      navigate("/play");
      return;
    }
  }, [username, gameId, opponent, initialTurn, location.state, navigate]);

  const makeMove = (col) => {
    if (turn !== username) return;
    socket.emit("makeMove", { gameId, column: col });
  };

  useEffect(() => {
    console.log("🔁 GameBoard mounted. Username:", username, "Opponent:", opponent, "Turn:", turn);

    socket.on("moveMade", ({ board }) => {
      setBoard([...board]);

      // Switch turn locally
      setTurn(prev => (prev === username ? opponent : username));
    });

    socket.on("gameOver", ({ winner, draw }) => {
      if (draw) {
        alert("It's a Draw!");
      } else {
        alert(winner === username ? "You Win!" : `${winner} Wins`);
      }
      navigate("/");
    });

    socket.on("playerDisconnected", ({ message }) => alert(message));
    socket.on("playerRejoined", ({ message }) => alert(message));

    return () => {
      socket.off("moveMade");
      socket.off("gameOver");
      socket.off("playerDisconnected");
      socket.off("playerRejoined");
    };
  }, [username, opponent, turn, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b1d1f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 20px",
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#122c2f",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "800px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "32px", color: "#fff", marginBottom: "10px" }}>Connect4</h2>
        <h3 style={{ fontSize: "20px", margin: "5px 0", color: "#6ee7b7" }}>
          Turn: <span style={{ color: "#fff" }}>{turn || "Loading..."}</span>
        </h3>
        <h4 style={{ fontSize: "18px", margin: "5px 0 30px 0", color: "#6ee7b7" }}>
          Opponent: <span style={{ color: "#fff" }}>{opponent || "Waiting..."}</span>
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 60px)`,
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "#0b1d1f",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            marginBottom: "30px"
          }}
        >
          {board.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                onClick={() => makeMove(cIdx)}
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor:
                    cell === "X" ? "#d62828" : cell === "O" ? "#fcbf49" : "#e0e0e0",
                  border: "2px solid #333",
                  borderRadius: "50%",
                  cursor: turn === username ? "pointer" : "not-allowed",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => {
                  if (turn === username) e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              ></div>
            ))
          )}
        </div>
        
        <button 
          onClick={() => navigate("/play")}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#6ee7b7",
            color: "#000",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Back to Lobby
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
