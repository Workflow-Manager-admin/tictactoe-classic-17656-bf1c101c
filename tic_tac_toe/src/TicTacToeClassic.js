import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * TicTacToeClassic: Main container for two-player tic-tac-toe.
   * - 3x3 clickable grid.
   * - Shows current turn above grid.
   * - Below grid: winner/draw/ongoing status & reset button.
   * - Color palette: primary (#222831), secondary (#393e46), accent (#00adb5).
   */
  const EMPTY_BOARD = Array(9).fill(null);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || gameOver) return;
    const nextBoard = [...board];
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);

    const calculatedWinner = calculateWinner(nextBoard);
    if (calculatedWinner) {
      setGameOver(true);
      setWinner(calculatedWinner);
      return;
    }
    if (nextBoard.every((cell) => cell !== null)) {
      setGameOver(true);
      setWinner(null); // Draw
      return;
    }
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setGameOver(false);
    setWinner(null);
  }

  // PUBLIC_INTERFACE
  function calculateWinner(cells) {
    /**
     * Returns "X" or "O" if there is a winner, else null
     */
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        cells[a] &&
        cells[a] === cells[b] &&
        cells[a] === cells[c]
      ) {
        return cells[a];
      }
    }
    return null;
  }

  // UI helpers
  const status = winner
    ? `Winner: ${winner}`
    : gameOver
    ? "Draw!"
    : `Current Turn: ${xIsNext ? "X" : "O"}`;

  return (
    <div style={containerStyle}>
      <div style={turnStyle}>
        {gameOver && !winner ? "No winner. " : ""}
        {!gameOver && (
          <span>
            <strong>Turn:</strong>{" "}
            <span style={xIsNext ? xStyle : oStyle}>
              {xIsNext ? "X" : "O"}
            </span>
          </span>
        )}
        {gameOver && winner && (
          <span>
            <strong>Winner:</strong>{" "}
            <span style={winner === "X" ? xStyle : oStyle}>
              {winner}
            </span>
          </span>
        )}
        {gameOver && !winner && <span>It's a draw!</span>}
      </div>
      <div style={gridWrapperStyle}>
        <div style={gridStyle}>
          {board.map((cell, idx) => (
            <button
              key={idx}
              style={{
                ...cellStyle,
                color:
                  cell === "X"
                    ? xStyle.color
                    : cell === "O"
                    ? oStyle.color
                    : "#fff",
                cursor: cell || gameOver ? "default" : "pointer",
              }}
              onClick={() => handleCellClick(idx)}
              aria-label={`Cell ${idx + 1}${cell ? `, filled with ${cell}` : ""}`}
              disabled={!!cell || gameOver}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
      <div style={belowGridStyle}>
        <span style={statusStyle}>{status}</span>
        <button style={resetBtnStyle} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

// Styling Constants
const palette = {
  primary: "#222831",
  secondary: "#393e46",
  accent: "#00adb5",
  lightBg: "#f6f7fb",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  background: palette.secondary,
  borderRadius: "12px",
  padding: "24px 30px 28px 30px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
  margin: "36px auto 0 auto",
  maxWidth: "330px",
};

const gridWrapperStyle = {
  margin: "14px 0",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 60px)",
  gridTemplateRows: "repeat(3, 60px)",
  gap: "7px",
  background: palette.primary,
  padding: "10px",
  borderRadius: 10,
};

const cellStyle = {
  width: 60,
  height: 60,
  background: palette.secondary,
  border: `2px solid ${palette.accent}`,
  borderRadius: "8px",
  fontSize: "2rem",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.13s",
  outline: "none",
};

const xStyle = {
  color: palette.accent,
};
const oStyle = {
  color: "#eee",
};

const turnStyle = {
  fontSize: "1.13rem",
  marginBottom: 2,
  fontWeight: "bold",
};

const belowGridStyle = {
  marginTop: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const statusStyle = {
  fontSize: "1.1rem",
  fontWeight: 500,
  letterSpacing: "0.01em",
  color: palette.accent,
};

const resetBtnStyle = {
  background: palette.accent,
  color: "#fff",
  fontWeight: 600,
  border: "none",
  borderRadius: "4px",
  padding: "9px 22px",
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0px 2px 10px #1112  ",
  marginTop: "3px",
  transition: "background-color 0.14s",
};

export default TicTacToeClassic;
