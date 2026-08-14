export interface ServiceTier {
  name: string;
  price?: number;
  priceNote?: string;
  duration?: string;
  mode?: string;
  payLink?: string;
  image?: string;
  features: string[];
}

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  heroImage?: string;
  featured?: boolean;
  popular?: boolean;
  description: string;
  longDescription: string[];
  includes: string[];
  tiers: ServiceTier[];
  bookingNotes: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "kundli-analysis",
    heroImage: "/images/services/kundli-analysis.png",
    name: "Kundli Analysis",
    tagline: "Understand the cosmic blueprint influencing your personality, success and life events.",
    icon: "kundli",
    popular: true,
    description:
      "Your personalized horoscope analysis reveals what to do and what to avoid in life, along with the essential precautions you should follow for overall well-being and success.",
    longDescription: [
      "Your personalized horoscope analysis reveals what to do and what to avoid in life, along with the essential precautions you should follow for overall well-being and success. Consulting an experienced astrologer before making important life decisions has been a trusted practice since ancient times.",
      "Just as our ancestors relied on the wisdom of the stars, modern astrology consultation provides the insight, clarity, and timing that logic alone cannot offer — helping you align with opportunities, avoid obstacles, and live a more balanced life.",
      "Complete Horoscope Analysis will tell you what to do and what not to do in life, and what precautions anyone needs to take for betterment. It is always advisable to consult an astrologer before taking any important decisions in life. I can't change your destiny, but I will guide how to reach there with minimum hurdles. Be Blessed.",
    ],
    includes: [
      "Complete birth chart (Kundli) analysis with Vedic & KP techniques",
      "Identification of strengths and obstacles in your chart",
      "Life areas covered: career, finance, health, marriage, education",
      "Practical remedies — mantra, gemstone, and lifestyle guidance",
      "Personalized dosha and period (Dasha) analysis",
    ],
    tiers: [
      {
        name: "Kundli Analysis Pro",
        image: "/images/services/kundli-pro.png",
        price: 4999,
        duration: "40 minutes",
        mode: "Video Call Consultation",
        payLink: "https://u.payu.in/or8pZCozbP60",
        features: ["40-minute live video call", "Deep dive into all life areas", "Dasha timeline analysis", "Remedies & follow-up notes"],
      },
      {
        name: "Kundli Analysis",
        price: 2999,
        duration: "20 minutes",
        mode: "Video Call Consultation",
        payLink: "https://u.payu.in/6rS2L7lQT2rK",
        features: ["20-minute live video call", "Core life areas covered", "Key remedies & guidance"],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4–5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "vastu-consultation",
    heroImage: "/images/services/vastu-consultation.png",
    name: "Vastu Consultation",
    tagline: "Receive practical science backed Vastu solutions for Home, Office, Shops & Showrooms.",
    icon: "vastu",
    featured: true,
    description:
      "Our Vastu Consultation is not just about changing furniture; it is about balancing the five elements (Panchbhootas) of your space. Whether it is your home or office, we ensure that the energy flow aligns with your success.",
    longDescription: [
      "Our Vastu Consultation and Vastu remedies are not just about changing furniture; it is about balancing the five elements (Panchbhootas) of your space. Whether it is your home or office, we ensure that the energy flow aligns with your success.",
      "As a Vastu Consultant, Arvindrun Vnjay provides remedies that are simple, logical, and do not require heavy structural changes. This unique approach has made him a favorite among hundreds of students and clients.",
      "Using scientific direction analysis, the Vastu Purusha Mandala, and modern tools like Google Earth and compass mapping, every consultation delivers a practical action plan you can implement without breaking walls.",
    ],
    includes: [
      "Floor-plan analysis with compass and degree accuracy",
      "16-zone Vastu Purusha Mandala mapping",
      "Toilet, kitchen, bedroom & main-door corrections",
      "Simple no-renovation remedies (strips, colors, placements)",
      "Written Vastu report after the session",
    ],
    tiers: [
      {
        name: "On-Site Vastu Consultation",
        image: "/images/services/vastu-onsite.png",
        price: 40999,
        duration: "On-site visit · UPTO 1500 SQ. FT.",
        mode: "For residential & office spaces in Delhi/NCR",
        payLink: "https://u.payu.in/hrziRkbCsa2d",
        features: [
          "For residential & office spaces in Delhi/NCR up to 1500 sq ft",
          "Two scheduled on-site visits for a detailed, firsthand evaluation of your space",
          "Meticulous analysis of floor plan, spatial layout & energy patterns",
          "1-hour personalized Zoom session with detailed written report",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
      {
        name: "Online Vastu Consultation",
        image: "/images/services/vastu-online.png",
        price: 30999,
        duration: "Online · UPTO 1500 SQ. FT.",
        mode: "For residential & office spaces in Delhi/NCR",
        payLink: "https://u.payu.in/ZrN224sw1Xm2",
        features: [
          "For residential & office spaces up to 1500 sq ft",
          "Three (3) dedicated 30-minute online sessions via Zoom",
          "Thorough review of floor plan & energy-pattern assessment",
          "Focused, practical solutions with personalized recommendations",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "Share your floor plan (hand-drawn or soft copy) before the consultation.",
      "Your consultation will be scheduled after confirmation on WhatsApp.",
      "Remedies provided are simple and do not require structural changes in most cases.",
      "An additional fee of ₹10,000 is applicable for every area increment of 500 sq ft beyond the base package (on-site consultation).",
      "An additional fee of ₹7,000 is applicable for every area increment of 500 sq ft beyond the base package (online consultation).",
      "Should a third (or subsequent) on-site visit be necessary or requested, an additional fee of ₹5,000 will be charged per visit.",
      "Our expertise lies in providing expert guidance and sustainable solutions — we do not sell or provide Vastu remedies.",
    ],
  },
  {
    slug: "name-analysis",
    heroImage: "/images/services/name-analysis.png",
    name: "Name Analysis",
    tagline: "Your name whispers cosmic secrets. Find your path with a name analysis from the stars.",
    icon: "name",
    description:
      "A name carries a vibration that can make or break your destiny. Our Name Analysis decodes the hidden meaning behind every letter of your name and aligns it with your birth chart.",
    longDescription: [
      "Your name whispers cosmic secrets. Every letter, number, and syllable carries a specific planetary vibration that influences your personality, relationships, and life path.",
      "Our Name Analysis service decodes your current name's energy, compares it with your birth chart (Kundli) and life path number, and reveals exactly where the misalignment is causing obstacles.",
      "Whether you feel stuck in career, relationships, or health, the correction of name vibrations has helped thousands of clients worldwide find clarity, confidence, and success.",
    ],
    includes: [
      "Chaldean, Pythagorean & Vedic numerology of your name",
      "Alignment check with your date of birth & life path number",
      "Name correction options with exact spellings",
      "Color & lucky number recommendations",
    ],
    tiers: [
      {
        name: "Name Analysis",
        image: "/images/services/name-analysis.png",
        duration: "15–20 minutes",
        mode: "Video Call Consultation",
        payLink: "https://u.payu.in/EIZbmyMbFPBn",
        features: [
          "Complete name vibration analysis",
          "Birth chart alignment",
          "Correction spellings provided",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "Provide your full name as used officially and your date of birth.",
      "Consultation scheduled on WhatsApp after confirmation.",
      "Name correction requires 2–3 days of analysis before the call.",
      "After the name analysis, name correction is available for an additional ₹3,100 and a new name design for an additional ₹7,100.",
    ],
  },
  {
    slug: "consultation-combos",
    heroImage: "/images/services/consultation-combos.png",
    name: "Consultation Combos",
    tagline: "Don't just predict, transform. Our combo offers guidance, remedies, and a path to certainty.",
    icon: "combos",
    description:
      "For those seeking complete guidance, our Consultation Combos offer a holistic approach — combining Astrology, Vastu, and Numerology in one powerful package.",
    longDescription: [
      "Don't just predict — transform. Individual consultations solve one problem; combo consultations transform your entire life trajectory.",
      "Our Consultation Combos combine Kundli Analysis, Name Numerology, Mobile Number Analysis, and Vastu guidance in curated packages that address every dimension of your life at once.",
      "Perfect for business owners, families, and individuals who want a complete cosmic alignment — from the name you write to the number you dial to the home you live in.",
    ],
    includes: [
      "Full Kundli analysis",
      "Name & mobile number alignment",
      "Vastu overview of your residence or office",
      "Complete remedy plan across all three sciences",
    ],
    tiers: [
      {
        name: "Combo Horoscope & Name Analysis",
        image: "/images/services/combo.png",
        price: 6999,
        duration: "50 minutes",
        mode: "Video Call Consultation",
        payLink: "https://u.payu.in/GIllYVlPiD1y",
        features: [
          "One horoscope with detailed analysis within the time limit",
          "One name analysis & compatibility of your name with your numbers & horoscope",
          "Guidance on whether you need a name correction or a new name",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
      {
        name: "Super Combo Horoscope & Name & Mobile Number",
        image: "/images/services/super-combo.png",
        price: 9999,
        duration: "60 minutes",
        mode: "Video Call Consultation",
        payLink: "https://u.payu.in/Vry2P4OEB8OR",
        features: [
          "Everything in the Combo — horoscope + name analysis with compatibility",
          "Your lucky number from date of birth & where you can use it",
          "Current number good/bad report with issues & suggested numbers",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "Combo sessions are split into two calls for deeper coverage.",
      "All reports are shared in PDF after the sessions.",
      "Book early — combo slots are limited each month.",
      "After the name analysis, name correction is available for an additional ₹3,100 and a new name design for an additional ₹7,100.",
    ],
  },
  {
    slug: "company-name",
    heroImage: "/images/services/company-name.png",
    name: "Company Name Designing",
    tagline:
      "Selecting auspicious letters, numbers, colors, and shapes based on astrology and numerology helps create a unique identity and attracts prosperity for your enterprise.",
    icon: "company",
    description:
      "A name carries a vibration that can make or break a brand. Our Company Name Designing approach focuses on numerology and phonetic vibrations to ensure your business starts on the right note.",
    longDescription: [
      "Selecting auspicious letters, numbers, colors, and shapes based on astrology and numerology helps create a unique identity and attracts prosperity for your enterprise.",
      "Our Company Name Designing approach focuses on numerology and phonetic vibrations to ensure your business starts on the right note. We analyze your business birth details — incorporation date, owner's birth chart, and the industry's vibration — to craft a name that attracts clients, money, and growth.",
      "Every recommendation comes with multiple name options, logo direction, brand color palette, and the exact reasoning behind each choice, so you can decide with full confidence.",
    ],
    includes: [
      "Business birth-date & owner chart analysis",
      "5–7 designed name options with numerology scores",
      "Phonetic & market-vibration validation",
      "Brand color & logo direction recommendations",
      "Final report with the best choice highlighted",
    ],
    tiers: [
      {
        name: "Company Name Designing",
        image: "/images/services/company-name.png",
        price: 15999,
        duration: "15 minutes",
        mode: "Video Call Consultation",
        payLink: "https://u.payu.in/JrdiHkcxttRd",
        features: [
          "Company name designed as per your profession & business nature",
          "Name with positive energies to convert leads into business",
          "Multiple name options & written report",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "Share your business idea, industry, and incorporation date (if registered).",
      "Delivery of the report within 2–4 working days.",
      "One revision round is included with every package.",
    ],
  },
  {
    slug: "company-analysis",
    heroImage: "/images/services/company-analysis.png",
    name: "Company Name Analysis",
    tagline:
      "Carefully chosen names aligned with favorable planets and elements boost growth, prosperity, and harmony in business operations.",
    icon: "analysis",
    description:
      "Already have a business name? Our Company Name Analysis reveals the hidden vibration of your existing brand and what it is attracting — or blocking.",
    longDescription: [
      "Carefully chosen names aligned with favorable planets and elements boost growth, prosperity, and harmony in business operations. But what if your current business name is working against you?",
      "Our Company Name Analysis decodes the existing name's energy, measures its alignment with your goals, and shows exactly what your brand is attracting in terms of clients, cash flow, and reputation.",
      "If the analysis shows weakness, we provide minimal-change correction options — sometimes a single letter or a visual tweak is all it takes to shift the brand's vibration.",
    ],
    includes: [
      "Numerology analysis of existing business name",
      "Brand-vibration vs business-goal comparison",
      "Correction options with minimal change",
      "Lucky color & marketing alignment tips",
    ],
    tiers: [
      {
        name: "Company Name Analysis",
        image: "/images/services/company-analysis.png",
        price: 3999,
        duration: "15 minutes",
        mode: "Video Call Consultation",
        payLink: "https://u.payu.in/6JW7OW7d28A4",
        features: [
          "Analysis of your company name based on your profession & type of work",
          "Check whether your current name truly suits your profession",
          "New name suggestion matching your industry & services",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "Provide your exact registered business name and incorporation date.",
      "Company name designing after the analysis is available for ₹11,000 — the complete outcome and explanation are shared with you on a voice call.",
    ],
  },
  {
    slug: "newborn-name",
    heroImage: "/images/services/newborn-name.png",
    name: "Newborn Baby Name",
    tagline:
      "Choose the perfect name for your newborn with astrological insights that brings harmony, fortune and positivity in life.",
    icon: "baby",
    description:
      "A baby's name shapes their destiny. We design names that are astrologically powerful for your child's future — aligned with birth stars and destiny.",
    longDescription: [
      "Choose the perfect name for your newborn with astrological insights that bring harmony, fortune, and positivity in life.",
      "Unlike generic numerology, Arvindrun Vnjay aligns the child's name holistically — through numerology, overall energy alignment, and most importantly with the child's Kundli, which very few numerologists do.",
      "The process involves the entire family, ensuring blessings and positive energy are part of the naming journey. Every name is cross-verified against the birth chart, nakshatra, and planetary positions before finalization.",
    ],
    includes: [
      "Child's birth chart (Kundli) analysis",
      "Nakshatra & planetary alignment check",
      "5–7 designed name options with meanings",
      "Name correction & pronunciation guidance",
      "Family involvement in final selection",
    ],
    tiers: [
      {
        name: "Newborn Baby Name",
        image: "/images/services/newborn-name.png",
        price: 9999,
        duration: "15 minutes",
        mode: "Video Call Meeting",
        payLink: "https://u.payu.in/8rMiFkoxysko",
        features: [
          "Baby name designed as per his/her numbers & astrological chart",
          "Name aligned with nakshatra, rashi & pada for lifelong growth",
          "Full report with meanings & guidance",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "Provide the child's exact birth date, time, and place of birth.",
      "Naming ceremony (Namkaran) timing guidance available on request.",
      "Delivery within 2–3 working days after details received.",
    ],
  },
  {
    slug: "mobile-analysis",
    heroImage: "/images/services/mobile-analysis.png",
    name: "Complete One Mobile Number Analysis",
    tagline:
      "Each number carries planetary vibration and brings financial growth when aligned with your date of birth or life path number.",
    icon: "mobile",
    description:
      "In the digital age, your phone number is a huge part of your identity. Our Mobile Number Analysis helps you choose a number that attracts opportunities.",
    longDescription: [
      "Each number carries planetary vibration and brings financial growth when aligned with your date of birth or life path number.",
      "In the digital age, your phone number is a huge part of your identity. Our Mobile Number Analysis helps you choose a number that attracts opportunities — and reveals if your current number is draining your energy.",
      "We analyze your current mobile number's total vibration, digit sequences, and planetary ownership, then compare it with your birth chart to tell you exactly what the number is doing for you — and whether a change will bring growth.",
    ],
    includes: [
      "Total number vibration analysis",
      "Digit-by-digit planetary mapping",
      "Alignment with your date of birth & life path",
      "Better-number recommendations (with availability guidance)",
    ],
    tiers: [
      {
        name: "Mobile Number Analysis",
        image: "/images/services/mobile-analysis.png",
        price: 2999,
        duration: "15 minutes",
        mode: "Video Call / WhatsApp Audio",
        payLink: "https://u.payu.in/RJkBmi5y2dRv",
        features: [
          "Current number good/bad check with issues it can give",
          "Your lucky number from your date of birth & where you can use it",
          "Suggested numbers to be chosen",
          "Written summary on WhatsApp",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: ["Provide your current mobile number and date of birth."],
  },
  {
    slug: "logo-designing",
    heroImage: "/images/services/logo-designing.png",
    name: "Logo Designing",
    tagline:
      "Crafting celestial-inspired logos that reflect ArvinAstro's spiritual guidance, cosmic wisdom, and trusted astrology identity.",
    icon: "logo",
    description:
      "A logo is the face of your brand. We design logos based on Vastu and color therapy principles so your brand radiates power, trust, and growth.",
    longDescription: [
      "A logo is the face of your brand, and we ensure it radiates power, trust, and growth through Astrology, Vastu, and color therapy principles.",
      "Every logo we design starts with your business's numerological vibration — shapes, colors, and symbols are chosen to amplify the brand's planetary strengths and neutralize weaknesses.",
      "You receive a complete branding kit: primary logo, alternate versions, color palette rationale, and placement guidelines — all aligned to your business's cosmic blueprint.",
    ],
    includes: [
      "Business numerology & Vastu shape analysis",
      "3 logo concepts with cosmic alignment",
      "Color palette with planetary reasoning",
      "Final files (PNG, SVG) + branding guide",
    ],
    tiers: [
      {
        name: "Logo Designing",
        image: "/images/services/logo-designing.png",
        price: 16999,
        duration: "15 minutes",
        mode: "Video Call Consultation",
        payLink: "https://u.payu.in/NI8RKR7BpD52",
        features: [
          "Complete logo created for you — no need to hire any designer",
          "Ready-to-use logo aligned with your planetary energies",
          "Designed to bring luck, balance & success",
          "Final files + branding guide",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "Share your business details, existing brand materials (if any), and preferences.",
      "Two revision rounds are included with every package.",
    ],
  },
  {
    slug: "meet-me-personally",
    heroImage: "/images/services/meet-me-personally.png",
    name: "Meet Me Personally",
    tagline: "Experience personal guidance from Arvin Astro to align your energy, purpose, and spiritual path.",
    icon: "meet",
    description:
      "A private, in-person session with Arvindrun Vnjay — a deep, unhurried consultation covering every question you carry about your life, business, and spiritual path.",
    longDescription: [
      "Experience personal guidance from Arvin Astro to align your energy, purpose, and spiritual path.",
      "In a fast digital world, some conversations deserve to happen in person. Meet Me Personally is a private session with Arvindrun Vnjay where you can discuss everything — birth chart, life direction, business decisions, family matters, and spiritual practice — without a clock watching.",
      "Sessions are held at our Greater Noida West center or a mutually convenient location. Global clients (USA, UK, Canada, Australia) can book a premium extended video session instead.",
    ],
    includes: [
      "Private face-to-face session with Arvindrun Vnjay",
      "Complete life overview (chart + questions)",
      "Personalized remedy & practice plan",
      "Follow-up support on WhatsApp",
    ],
    tiers: [
      {
        name: "Meet Me Personally",
        image: "/images/services/meet-me.png",
        price: 11999,
        duration: "75 minutes",
        mode: "In person (Greater Noida West) / Premium video for global clients",
        payLink: "https://u.payu.in/uJS78aMmctuW",
        features: [
          "Personal meet with Arvindrun Vnjay near Ek Murti Circle, Greater Noida West",
          "One Horoscope, Name & Mobile consultation combo",
          "60 minutes of consultation time",
          "Private 1-on-1 session with remedy plan",
          "After payment, share the screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "Slots are limited — book at least 1 week in advance.",
      "Global clients in USA, UK, Canada & Australia can join via premium video session.",
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
