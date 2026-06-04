"use client";

import { useState } from "react";

export default function AIMentor() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi, I’m Nexus AI Mentor. Ask me anything about connectors, engineering concepts, Molex products, or your learning modules.",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    let response =
      "That’s a great engineering question. This concept will be covered in upcoming modules.";

    const lower = input.toLowerCase();

    if (
      lower.includes("polarization")
    ) {

      response =
        "Polarization prevents incorrect connector mating orientation and protects electronics from incorrect insertion.";

    } else if (
      lower.includes("seal")
    ) {

      response =
        "Connector seals prevent moisture ingress, dust contamination, and corrosion in harsh environments.";

    } else if (
      lower.includes("terminal")
    ) {

      response =
        "Terminals create the conductive electrical path between mating connectors.";

    } else if (
      lower.includes("fretting")
    ) {

      response =
        "Fretting corrosion occurs due to micro-motion between contacts during vibration, increasing resistance.";

    } else if (
      lower.includes("wire-to-board")
    ) {

      response =
        "Wire-to-board connectors interface discrete wires directly with PCBs.";

    } else if (
      lower.includes("ev")
    ) {

      response =
        "EV connector systems prioritize sealing, vibration resistance, high current capability, and safety.";

    }

    const aiMessage = {
      role: "assistant",
      text: response,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      aiMessage,
    ]);

    setInput("");

  };

  return (

    <>

      {/* FLOATING BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(37,99,235,0.45)] flex items-center justify-center text-xl"
      >
        🤖
      </button>

      {/* CHAT WINDOW */}

      {open && (

        <div className="fixed bottom-20 right-5 w-[300px] h-[420px] bg-[#0b1220] border border-blue-900 rounded-3xl shadow-[0_0_25px_rgba(37,99,235,0.2)] z-50 flex flex-col overflow-hidden">

          {/* HEADER */}

          <div className="bg-[#111827] border-b border-blue-900 px-4 py-3">

            <h2 className="text-lg font-bold text-white">
              Nexus AI Mentor
            </h2>

            <p className="text-gray-400 text-[11px] mt-1">
              Engineering Learning Assistant
            </p>

          </div>

          {/* MESSAGES */}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`max-w-[85%] p-3 rounded-2xl leading-6 text-sm ${
                  msg.role === "assistant"
                    ? "bg-[#1e293b] text-gray-200"
                    : "bg-blue-600 text-white ml-auto"
                }`}
              >

                {msg.text}

              </div>

            ))}

          </div>

          {/* INPUT */}

          <div className="p-3 border-t border-blue-900 flex gap-2 bg-[#0f172a]">

            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder="Ask a question..."
              className="flex-1 bg-[#111827] border border-gray-700 rounded-2xl px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-500 px-4 rounded-2xl text-sm font-semibold transition-all duration-300"
            >
              Send
            </button>

          </div>

        </div>

      )}

    </>

  );

}
