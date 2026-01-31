import { useEffect, useState } from "react";

export default function App() {
  const [apiMsg, setApiMsg] = useState("Cargando...");
  const [dbMsg, setDbMsg] = useState("Cargando...");
  const [dbTime, setDbTime] = useState("");
  const apiBase = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  useEffect(() => {
    fetch(`${apiBase}/api/hello`)
      .then((r) => r.json())
      .then((d) => setApiMsg(d.message))
      .catch(() => setApiMsg("Error llamando al backend"));

    fetch(`${apiBase}/api/db`)
      .then((r) => r.json())
      .then((d) => {
        setDbMsg(d.message);
        setDbTime(String(d.now));
      })
      .catch(() => setDbMsg("Error llamando a la DB"));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Hola Mundo (React)</h1>

      <h2>Backend</h2>
      <p>{apiMsg}</p>

      <h2>PostgreSQL</h2>
      <p>{dbMsg}</p>
      {dbTime && <p>NOW(): {dbTime}</p>}
    </div>
  );
}
