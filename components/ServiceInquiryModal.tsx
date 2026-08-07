"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/site";
import type { Service } from "@/lib/services";
import { IconClose, IconWhatsApp, IconSpinner } from "./Icons";

interface ServiceField {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

const SERVICE_FIELDS: Record<string, ServiceField[]> = {
  "kundli-analysis": [
    { label: "Full Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Gender", name: "gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
    { label: "Date of Birth", name: "dob", type: "date", required: true },
    { label: "Time of Birth", name: "timeOfBirth", type: "time", required: true },
    { label: "Place of Birth", name: "placeOfBirth", required: true, placeholder: "City, State, Country" },
  ],
  "vastu-consultation": [
    { label: "Full Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Property Type", name: "propertyType", type: "select", required: true, options: ["Home", "Office", "Shop/Showroom", "Factory", "Farmhouse", "Plot/Land", "Other"] },
    { label: "Property Address", name: "propertyAddress", required: true, placeholder: "Full address of the property" },
    { label: "Facing Direction", name: "facing", type: "select", options: ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West", "Not Sure"] },
  ],
  "name-analysis": [
    { label: "Full Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Gender", name: "gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
    { label: "Date of Birth", name: "dob", type: "date", required: true },
    { label: "Current Name", name: "currentName", required: true, placeholder: "Name as per records" },
  ],
  "company-name": [
    { label: "Your Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Company/Business Name", name: "companyName", required: true, placeholder: "Current or proposed name" },
    { label: "Industry", name: "industry", required: true, placeholder: "e.g. IT, Real Estate, Healthcare" },
    { label: "Date of Incorporation", name: "incorporationDate", type: "date" },
  ],
  "company-analysis": [
    { label: "Your Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Company Name", name: "companyName", required: true, placeholder: "Registered company name" },
    { label: "Industry", name: "industry", required: true, placeholder: "e.g. IT, Real Estate, Healthcare" },
  ],
  "newborn-name": [
    { label: "Parent's Name", name: "name", required: true, placeholder: "Father/Mother's name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Baby's Gender", name: "babyGender", type: "select", required: true, options: ["Boy", "Girl", "Waiting to discover"] },
    { label: "Baby's Date of Birth", name: "babyDob", type: "date", required: true },
    { label: "Baby's Time of Birth", name: "babyTimeOfBirth", type: "time" },
    { label: "Place of Birth", name: "placeOfBirth", placeholder: "City, State" },
    { label: "Surname / Family Name", name: "surname", placeholder: "Family surname to use" },
  ],
  "mobile-analysis": [
    { label: "Full Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Mobile Number to Analyse", name: "mobileNumber", type: "tel", required: true, placeholder: "Your mobile number" },
  ],
  "consultation-combos": [
    { label: "Full Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "Areas of Interest", name: "interests", required: true, placeholder: "e.g. Career, Marriage, Health, Finance" },
  ],
  "logo-designing": [
    { label: "Your Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Company/Brand Name", name: "companyName", required: true, placeholder: "Name for the logo" },
    { label: "Industry", name: "industry", required: true, placeholder: "e.g. Tech, Fashion, Food" },
    { label: "Design Preferences", name: "preferences", placeholder: "Colors, style, inspiration" },
  ],
  "meet-me-personally": [
    { label: "Full Name", name: "name", required: true, placeholder: "Your full name" },
    { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
    { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
    { label: "Preferred Date", name: "preferredDate", type: "date" },
    { label: "Preferred Time", name: "preferredTime", type: "select", options: ["Morning (10AM-12PM)", "Afternoon (12PM-3PM)", "Evening (3PM-6PM)"] },
    { label: "Purpose of Visit", name: "purpose", required: true, placeholder: "What would you like to discuss?" },
  ],
};

const DEFAULT_FIELDS: ServiceField[] = [
  { label: "Full Name", name: "name", required: true, placeholder: "Your full name" },
  { label: "Phone / WhatsApp", name: "phone", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
  { label: "Email", name: "email", type: "email", required: true, placeholder: "you@example.com" },
  { label: "Your Query", name: "message", placeholder: "Tell us what you need help with" },
];

export function ServiceInquiryModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  const fields = SERVICE_FIELDS[service.slug] ?? DEFAULT_FIELDS;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const update = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    const lines: string[] = [
      `Namaste Arvindrun ji! 🙏`,
      ``,
      `*New Service Inquiry*`,
      `*Service: ${service.name}*`,
      ``,
    ];

    for (const field of fields) {
      const val = formData[field.name];
      if (val) {
        lines.push(`${field.label}: ${val}`);
      }
    }

    lines.push("", "Please share the next steps.");

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${CONTACT.phoneMainRaw}?text=${text}`;
    window.open(url, "_blank");

    setSending(false);
    setDone(true);
    setTimeout(onClose, 2000);
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-foreground rounded-2xl border border-primary-hover/30 shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-foreground border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">{service.name}</h3>
            <p className="text-xs text-white/50">Fill in your details to enquire</p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition p-1">
            <IconClose size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {done ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-white font-semibold text-lg mb-1">Inquiry Sent!</h4>
              <p className="text-white/50 text-sm">We will get back to you on WhatsApp shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold mb-1.5 text-white/80">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  {field.type === "select" ? (
                    <select
                      required={field.required}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => update(field.name, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="" disabled>Select {field.label}</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      required={field.required}
                      type={field.type ?? "text"}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => update(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-primary focus:outline-none"
                    />
                  )}
                </div>
              ))}

              <button type="submit" disabled={sending} className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition flex items-center justify-center gap-2 mt-2">
                {sending ? <IconSpinner size={16} /> : <IconWhatsApp size={16} />}
                Send on WhatsApp
              </button>
              <p className="text-xs text-center text-white/40">We reply within a few hours on WhatsApp.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
