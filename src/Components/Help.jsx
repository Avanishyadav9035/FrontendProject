import { GoogleGenerativeAI } from "@google/generative-ai";
import { ai_prompt, api_key } from "../Utils/constants";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const Help = () => {
  const genAI = new GoogleGenerativeAI(api_key);
  const [userQuery, setUserQuery] = useState("");
  const [msgs, setMsgs] = useState([]);

  const btnClickHandler = () => {
    if (userQuery.trim().length === 0) {
      toast.error("Message cannot be empty");
      return;
    }

    setMsgs(prev => [...prev, { sender: "user", msg: userQuery }]);

    async function callGemini() {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api_key}`;

      const body = {
        contents: [{ parts: [{ text: ai_prompt + userQuery }] }]
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        setUserQuery("");
        setMsgs(prev => [...prev, { sender: "gemini", msg: resultText }]);
      } catch (err) {
        console.error("Error calling Gemini:", err);
        toast.error("Failed to fetch from Gemini");
      }
    }

    callGemini();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto mt-6 p-4 flex flex-col min-h-[60vh] max-h-[80vh] rounded-2xl shadow-lg bg-white overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map((item, index) => (
            <div
              key={index}
              className={`${
                item.sender === "gemini"
                  ? "self-start bg-gray-100 text-gray-900"
                  : "self-end bg-blue-500 text-white"
              } px-4 py-2 rounded-lg shadow-sm text-sm max-w-[80%] break-words`}
            >
              {item.msg}
            </div>
          ))}
        </div>

        <div className="p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-gray-200">
          <input
            onChange={(e) => setUserQuery(e.target.value)}
            value={userQuery}
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
          />
          <button
            onClick={btnClickHandler}
            className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
