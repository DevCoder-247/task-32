// src/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000";

function AuthPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const endpoint = mode === "login" ? "/login" : "/register";
    const res = await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    alert(data.message);

    if (res.ok && mode === "login" && data.token) {
      localStorage.setItem("token", data.token);
      navigate("/data");
    } else if (res.ok && mode === "register") {
      setMode("login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{mode === "login" ? "Login" : "Register"}</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          {mode === "login" ? "Login" : "Register"}
        </button>
        <p style={styles.toggle}>
          {mode === "login" ? "Don't have an account?" : "Already have an account?"} {" "}
          <span onClick={() => setMode(mode === "login" ? "register" : "login")} style={styles.link}>
            {mode === "login" ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f8ff",
  },
  card: {
    background: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#008080",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggle: {
    marginTop: "1rem",
    textAlign: "center",
  },
  link: {
    color: "#008080",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AuthPage;
