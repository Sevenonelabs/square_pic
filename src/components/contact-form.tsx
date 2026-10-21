"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const fieldClass = "w-full min-h-11 rounded-md border border-white/15 bg-black/20 px-3 py-2 text-base text-[#e6edf5]";

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") || "").trim();
    const body = String(data.get("message") || "").trim();
    if (!subject || !body) {
      setMessage("Enter a subject and a message before opening your email draft.");
      return;
    }
    const recipient = ["support", "squarepic.io"].join("@");
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMessage("Email draft requested. Review and send it in your email app. If no app opens, use the GitHub support link below.");
  }

  return (
    <form onSubmit={openDraft} aria-label="Contact SquarePic support" className="space-y-4">
      <p className="text-base text-[#abb8c7]">Describe your question below. This form opens a draft in your email app, where you review and send it. Your message stays on this device until you send the email.</p>
      <div>
        <label htmlFor="contact-subject" className="block text-base font-semibold mb-1">Subject</label>
        <input id="contact-subject" name="subject" required maxLength={150} className={fieldClass} placeholder="Question about an image tool" />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-base font-semibold mb-1">Message</label>
        <textarea id="contact-message" name="message" required maxLength={5000} rows={5} className={fieldClass} placeholder="Include the tool, browser and what happened. Please do not include private photos or passwords." />
      </div>
      <button type="submit" className="min-h-11 rounded-md bg-[var(--accent)] px-4 py-2 text-base font-bold text-black hover:brightness-110">Open email draft</button>
      <p role="status" className="text-sm text-[#abb8c7]">{message}</p>
      <p className="text-base text-[#abb8c7]">No email app configured? <a href="https://github.com/Sevenonelabs/square_pic/issues" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[var(--accent)] underline">Ask for help on GitHub</a>. GitHub issues are public.</p>
    </form>
  );
}
