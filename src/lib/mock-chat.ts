/**
 * MOCK chat logic — frontend demo only.
 *
 * Nothing here talks to a server. "Matching" is a timer and stranger
 * replies are picked from a canned list. When you build a real backend
 * (e.g. WebSockets), replace this hook and keep the components as-is.
 */
import { useCallback, useEffect, useRef, useState } from "react";

export type ChatStatus = "idle" | "searching" | "connected" | "disconnected";

export interface ChatMessage {
  id: string;
  author: "me" | "stranger" | "system";
  text: string;
  sentAt: Date;
}

const OPENERS = [
  "Hey! Where are you chatting from?",
  "Hi there 👋 how's your day going?",
  "Hello stranger! Night owl or early bird?",
];

const REPLIES = [
  "Haha, that's fair.",
  "Oh nice, I've always wanted to go there.",
  "Honestly same. What do you do for fun?",
  "I'm mostly into music and long walks lately.",
  "That's a good question… let me think 🤔",
  "Interesting! Tell me more.",
];

const pick = (list: string[]): string => list[Math.floor(Math.random() * list.length)] ?? list[0]!;
const makeId = () => Math.random().toString(36).slice(2, 10);

export function useMockChat() {
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [strangerTyping, setStrangerTyping] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => clearTimers, []);

  const add = (author: ChatMessage["author"], text: string) =>
    setMessages((m) => [...m, { id: makeId(), author, text, sentAt: new Date() }]);

  const startSearch = useCallback(() => {
    clearTimers();
    setMessages([]);
    setStrangerTyping(false);
    setStatus("searching");
    // Pretend matching takes 2–3.5 seconds.
    later(() => {
      setStatus("connected");
      add("system", "You're now chatting with a random stranger. Say hi!");
      later(() => add("stranger", pick(OPENERS)), 1200);
    }, 2000 + Math.random() * 1500);
  }, []);

  const disconnect = useCallback((reason = "You disconnected.") => {
    clearTimers();
    setStrangerTyping(false);
    setStatus("disconnected");
    add("system", reason);
  }, []);

  const send = useCallback(
    (text: string) => {
      if (status !== "connected" || !text.trim()) return;
      add("me", text.trim());
      // Fake a typing indicator, then a canned reply.
      later(() => setStrangerTyping(true), 600);
      later(() => {
        setStrangerTyping(false);
        add("stranger", pick(REPLIES));
      }, 1800 + Math.random() * 1200);
    },
    [status],
  );

  return { status, messages, strangerTyping, startSearch, disconnect, send };
}
