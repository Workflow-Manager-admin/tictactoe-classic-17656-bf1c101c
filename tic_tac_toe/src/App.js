import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" tabIndex={-1}>Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ marginTop: "100px", marginBottom: "32px" }}>
          <h1 className="title" style={{ textAlign: "center", marginBottom: "14px", color: "#00adb5" }}>
            TicTacToe Classic
          </h1>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;