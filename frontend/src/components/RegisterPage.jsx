// src/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000";

function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>
        <input name="username" placeholder="Username" onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
        <button onClick={register} style={styles.button}>Register</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f2f2f2" },
  card: { background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" },
  input: { display: "block", width: "100%", padding: "10px", marginBottom: "1rem", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px 20px", background: "#6c63ff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default RegisterPage;
