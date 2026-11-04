import { useState, type FormEvent } from "react";

export function MessageInput({ disabled, onSend }: { disabled: boolean; onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2 border-t border-border p-3 sm:p-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        maxLength={500}
        placeholder={disabled ? "Connect to a stranger to chat" : "Type a message…"}
        className="min-w-0 flex-1 rounded-full border border-input bg-muted px-5 py-3 text-sm outline-none transition focus:border-ring disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="rounded-full bg-primary px-5 font-medium text-primary-foreground transition hover:scale-105 disabled:scale-100 disabled:opacity-40"
      >
        Send
      </button>
    </form>
  );
}
