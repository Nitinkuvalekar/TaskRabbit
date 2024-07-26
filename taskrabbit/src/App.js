import React, { useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateName = (e) => {
    setUsername(e.target.value);
  };

  const saveUser = () => {
    if (email.trim() !== undefined || password.trim() !== undefined || username.trim() !== undefined) {
      const body = {
        email,
        password,
        username,
      };

      axios
        .post("http://localhost:5000/api/user", body)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            alert("User registered");

            setEmail("");
            setPassword("");
            setUsername("");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const loginUser = () => {
    if (password.trim() !== undefined || username.trim() !== undefined) {
      const body = {
        password,
        username,
      };

      axios
        .post("http://localhost:5000/api/user_login", body)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rabbit Task</h1>
      </header>

      <main>
        <div className="register">
          <input type="email" value={email} onChange={updateEmail} placeholder="Enter Email"></input>
          <input type="text" value={password} onChange={updatePassword} placeholder="Enter password"></input>
          <input type="text" value={username} onChange={updateName} placeholder="Enter username"></input>
          <button onClick={saveUser}>Register</button>
          <button onClick={loginUser}>Login</button>
        </div>
      </main>
    </div>
  );
}

export default App;
