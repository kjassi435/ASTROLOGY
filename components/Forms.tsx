"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CONTACT } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { waLink } from "@/lib/utils";
import { IconCheck, IconSpinner, IconWhatsApp } from "./Icons";

function Toast({ message }: { message: string }) {
  return (
    <div className="toast" role="status">
      {message}
    </div>
  );
}

export function BookingForm({ serviceSlug }: { serviceSlug?: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(serviceSlug ?? "");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    const selected = SERVICES.find((s) => s.slug === service);
    const text = `Namaste Arvindrun ji! 🙏%0A%0A*New Booking Request*%0AName: ${name}%0APhone: ${phone}%0AService: ${selected?.name ?? "General consultation"}%0A${message ? `Details: ${message}` : ""}%0A%0APlease share the next available slot.`;
    const url = `https://wa.me/${CONTACT.phoneMainRaw}?text=${text}`;
    window.open(url, "_blank");
    setSending(false);
    setToast("Request sent! We will contact you shortly. 🙏");
    setTimeout(() => {
      router.push("/thank-you");
    }, 1600);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {toast ? <Toast message={toast} /> : null}
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="bf-name">
          Full Name *
        </label>
        <input id="bf-name" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Your name" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="bf-phone">
          Phone / WhatsApp *
        </label>
        <input
          id="bf-phone"
          required
          type="tel"
          pattern="[0-9+ ]{8,15}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="bf-service">
          Select Service *
        </label>
        <select id="bf-service" required value={service} onChange={(e) => setService(e.target.value)} className="form-control">
          <option value="" disabled>
            Select Service
          </option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="bf-msg">
          Message (optional)
        </label>
        <textarea id="bf-msg" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" rows={3} placeholder="Briefly describe what you need help with" />
      </div>
      <button type="submit" disabled={sending} className="btn btn-primary btn-full">
        {sending ? <IconSpinner size={16} /> : <IconWhatsApp size={16} />} Send Request
      </button>
      <p className="text-xs text-center opacity-60">We reply within a few hours on WhatsApp.</p>
    </form>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    const text = `Namaste Arvindrun ji! 🙏%0A%0A*New Message from Website*%0AName: ${name}%0APhone: ${contact}%0AEmail: ${email}%0A%0A${message}`;
    const url = `https://wa.me/${CONTACT.phoneMainRaw}?text=${text}`;
    window.open(url, "_blank");
    setTimeout(() => {
      setSending(false);
      setDone(true);
      setName("");
      setContact("");
      setEmail("");
      setMessage("");
    }, 800);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cf-first">
            Name *
          </label>
          <input id="cf-first" required value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="First Name" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="cf-phone">
            Numbers *
          </label>
          <input
            id="cf-phone"
            required
            type="tel"
            pattern="[0-9+ ]{8,15}"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="form-control"
            placeholder="Phone or WhatsApp"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="cf-email">
          Email *
        </label>
        <input id="cf-email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="cf-msg">
          Comment or Message *
        </label>
        <textarea id="cf-msg" required value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" rows={4} placeholder="How can we help you?" />
      </div>
      <button type="submit" disabled={sending} className="btn btn-primary btn-full">
        {done ? (
          <>
            <IconCheck size={16} /> Sent Successfully!
          </>
        ) : sending ? (
          <IconSpinner size={16} />
        ) : (
          "Submit Message"
        )}
      </button>
    </form>
  );
}
