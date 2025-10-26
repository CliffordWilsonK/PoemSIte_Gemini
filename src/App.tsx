
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css"; 

export default function PoemBox() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchPoem = async () => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt =
        "Write a 10-word poem in the style of milk and honey, inspired by anime and philosophy — something that captures pain, rebirth, or the nature of existence, in a soft yet powerful tone";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPoem(); // Fetch a poem on initial render

    const poemIntervalId = setInterval(fetchPoem, 30000); // Fetch a new poem every 30 seconds
    const clockIntervalId = setInterval(() => setCurrentTime(new Date()), 1000); // Update clock every second

    return () => {
      clearInterval(poemIntervalId); // Cleanup poem interval on component unmount
      clearInterval(clockIntervalId); // Cleanup clock interval on component unmount
    };
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="poem-box">{error ? <p>{error}</p> : <p>{response}</p>}</div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}
