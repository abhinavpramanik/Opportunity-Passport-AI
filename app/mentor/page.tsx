"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, ChevronRight } from "lucide-react";
import { mentors } from "@/data/mentor";
import type { MentorPersona, MentorMessage } from "@/types";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl w-fit"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="w-2 h-2 rounded-full bg-zinc-400"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </div>
  );
}

function ChatBubble({ msg, mentorColor }: { msg: MentorMessage; mentorColor: string }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
        style={isUser
          ? { background: "linear-gradient(135deg, #2563EB, #7C3AED)", color: "white", borderRadius: "18px 18px 4px 18px" }
          : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#D4D4D8", borderRadius: "18px 18px 18px 4px" }}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

export default function MentorPage() {
  const [activeMentor, setActiveMentor] = useState<MentorPersona>(mentors[0]);
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function switchMentor(mentor: MentorPersona) {
    setActiveMentor(mentor);
    setMessages([]);
    setInput("");
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: MentorMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Find matching conversation or use first one
    const convo = activeMentor.defaultConversations.find(
      (c) => text.toLowerCase().includes(c.trigger.toLowerCase().split(" ")[0])
    ) || activeMentor.defaultConversations[0];

    const response = convo.messages.find((m) => m.role === "assistant");

    setTimeout(() => {
      setIsTyping(false);
      if (response) {
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: "assistant", content: response.content, timestamp: new Date().toISOString() },
        ]);
      }
    }, 1800 + Math.random() * 1000);
  }

  function handleSuggestion(trigger: string) {
    sendMessage(trigger);
  }

  const suggestions = activeMentor.defaultConversations.map((c) => c.trigger);

  return (
    <div className="h-screen flex flex-col overflow-hidden p-8 pb-0">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-black text-white mb-1">AI Mentor</h1>
        <p className="text-zinc-400 text-sm">Chat with specialized career advisors</p>
      </motion.div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Mentor sidebar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-64 flex-shrink-0 space-y-2">
          {mentors.map((mentor) => {
            const isActive = mentor.id === activeMentor.id;
            return (
              <motion.button key={mentor.id} whileHover={{ x: 3 }} onClick={() => switchMentor(mentor)}
                className="w-full flex items-start gap-3 p-4 rounded-2xl text-left transition-all"
                style={{
                  background: isActive ? `${mentor.color}15` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? mentor.color + "40" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive ? `0 0 25px ${mentor.color}20` : "none",
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: `${mentor.color}30`, border: `1px solid ${mentor.color}30` }}>
                  {mentor.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{mentor.name}</p>
                  <p className="text-zinc-500 text-xs mt-0.5 line-clamp-1">{mentor.specialty}</p>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: mentor.color }} />}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mentor header */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 mb-4 flex items-center gap-4 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: `${activeMentor.color}30`, border: `1px solid ${activeMentor.color}30` }}>
              {activeMentor.avatar}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{activeMentor.name}</p>
              <p className="text-zinc-500 text-xs">{activeMentor.title}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs">Online</span>
            </div>
          </motion.div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-1"
            style={{ paddingRight: 4 }}>
            {messages.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="text-4xl mb-4">
                  {activeMentor.avatar.includes("AC") ? "👩‍💼" : activeMentor.avatar.includes("RM") ? "👨‍💻" : activeMentor.avatar.includes("PN") ? "👩‍💰" : activeMentor.avatar.includes("SL") ? "👩‍🎓" : "👨‍🚀"}
                </div>
                <p className="text-white font-semibold mb-2">{activeMentor.name}</p>
                <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">{activeMentor.description}</p>
                <p className="text-zinc-600 text-xs mt-4">Ask me anything or choose a topic below</p>
              </motion.div>
            ) : (
              <>
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} msg={msg} mentorColor={activeMentor.color} />
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-3">
                    <TypingIndicator />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Suggestions */}
          {messages.length === 0 && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
              {suggestions.map((s) => (
                <motion.button key={s} whileHover={{ y: -2 }} onClick={() => handleSuggestion(s)}
                  className="px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5"
                  style={{
                    background: `${activeMentor.color}10`,
                    border: `1px solid ${activeMentor.color}25`,
                    color: activeMentor.color,
                  }}>
                  <Sparkles className="w-3 h-3" />{s}
                </motion.button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-3 pb-8 flex-shrink-0">
            <div className="flex-1 relative">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                placeholder={`Ask ${activeMentor.name.split(" ")[0]} anything...`}
                className="w-full px-4 py-3.5 pr-12 rounded-2xl text-sm text-white placeholder:text-zinc-600 outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white disabled:opacity-40 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${activeMentor.color}, #7C3AED)` }}>
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
