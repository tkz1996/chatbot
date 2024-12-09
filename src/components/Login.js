import { useState } from "react";

const Login = ({ setUserName }) => {
  // login state to track username
  const [login, setLogin] = useState("");

  return (
    <div className="form">
      <input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && setUserName(login)}
        type="text"
        placeholder="Enter Username"
      ></input>
      <button onClick={() => setUserName(login)}>Login</button>
    </div>
  );
};
export default Login;
