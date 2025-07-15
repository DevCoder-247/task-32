// src/DataPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function DataPage() {
  const [jsonData, setJsonData] = useState("{}");
  const [output, setOutput] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const saveData = async () => {
    try {
      const parsed = JSON.parse(jsonData);
      const res = await fetch(`${API}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsed),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Invalid JSON");
    }
  };

  const readData = async () => {
    const res = await fetch(`${API}/read`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOutput(JSON.stringify(data, null, 2));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Save and Read JSON</h2>
        <button onClick={logout} style={styles.logout}>Logout</button>
        <textarea
          rows={6}
          cols={60}
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder='Enter JSON here'
          style={styles.textarea}
        />
        <div style={styles.buttonRow}>
          <button onClick={saveData} style={styles.button}>Save</button>
          <button onClick={readData} style={{ ...styles.button, backgroundColor: "#0288d1" }}>Read</button>
        </div>
        <pre style={styles.output}>{output}</pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#e3f2fd",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "700px",
  },
  heading: {
    marginBottom: "1rem",
    color: "#333",
    textAlign: "center",
  },
  logout: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "1rem",
    float: "right",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "1rem",
    resize: "vertical",
  },
  buttonRow: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  button: {
    padding: "10px 20px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  output: {
    background: "#f4f4f4",
    padding: "1rem",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
    maxHeight: "300px",
    overflowY: "auto",
    border: "1px solid #ddd",
  },
};

export default DataPage;