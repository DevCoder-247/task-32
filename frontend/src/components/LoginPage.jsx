// src/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful");
      navigate("/data");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>
        <input name="username" placeholder="Username" onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
        <button onClick={login} style={styles.button}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#e0f7fa" },
  card: { background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
  input: { display: "block", width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px 20px", background: "#00796b", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default LoginPage;
