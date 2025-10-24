import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

// write me a haiku about earl greyy

export default function PoemBox(){
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  // const [currentTime, setCurrentTime] = useState(new Date());

  const fetchPoem = async() => {
    try{
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = "write a poem about fish using an anapestic tetrameter in the style of Dr.Seuss";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
  // Fetch a poem on initial render
    fetchPoem();

  // Fetch a new poem every 30 seconds
    const poemIntervalId = setInterval(fetchPoem, 30000);
    return () => {
      clearInterval(poemIntervalId); // Cleanup poem interval on component unmount
    };
  }, []);

  return(
    <>
      <div>{response}</div>
      {error && <div>Error: {error}</div>}
    </>
  )
}