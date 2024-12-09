import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [userName, setUserName] = useState("");

  // if username exist, show chat component, otherwise show login component
  return (
    <div className="main" id="wrapper">
      {userName ? (
        <Chat userName={userName} />
      ) : (
        <Login setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
