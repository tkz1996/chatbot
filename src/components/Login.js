import { useState } from "react";

const ec2Uri = "http://ec2-54-169-158-2.ap-southeast-1.compute.amazonaws.com";
// const ec2Uri = "http://localhost";


const Login = ({ setUserName }) => {
  // login states to track user, password and errors
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // validate the credentials of user
  const validateCreds = (async function () {
    setErrorMessage("Loading...");
    // call login api
    const response = await fetch(ec2Uri + '/profile/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "username": user,
        "password": password
      })
    });
    // handle response from BE and display error if needed
    const data = await response.json();
    if (!response.ok) {
      setErrorMessage(data.errorMessage);
      return;
    }
    setUserName(user);
  });

  // create new account for user
  const createAcc = (async function () {
    setErrorMessage("Loading...");
    // call create api
    const response = await fetch(ec2Uri + '/profile/create', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "username": user,
        "password": password
      })
    });
    // handle response from BE and display error if needed
    const data = await response.json();
    if (!response.ok) {
      setErrorMessage(data.errorMessage);
      return;
    }
    setUserName(user);
  });

  return (
    <div>
      <div className="form">
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type="text"
          placeholder="Enter Username"
        ></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Enter Password"
        ></input>
        <button onClick={() => validateCreds()}>Login</button>
        <button onClick={() => createAcc()}>Create</button>
      </div>
      <div className="form">
        {errorMessage && <div className="errorBox"> {errorMessage} </div>}
      </div>
    </div>
  );
};
export default Login;
