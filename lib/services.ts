export interface ServiceTier {
  name: string;
  price?: number;
  priceNote?: string;
  duration?: string;
  mode?: string;
  note?: string;
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
  introHeading?: string;
  longDescription: string[];
  longDescriptionHtml?: string;
  descriptionBox?: string;
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
    introHeading: "Get Clarity. Take Better Decisions.",
    description:
      "Your personalized horoscope analysis reveals what to do and what to avoid in life, along with the essential precautions you should follow for overall well-being and success.",
    longDescription: [
      "Your personalized horoscope analysis reveals what to do and what to avoid in life, along with the essential precautions you should follow for overall well-being and success. Consulting an experienced astrologer before making important life decisions has been a trusted practice since ancient times.",
      "Just as our ancestors relied on the wisdom of the stars, modern astrology consultation provides the insight, clarity, and timing that logic alone cannot offer—helping you align with opportunities, avoid obstacles, and live a more balanced life.",
    ],
    descriptionBox:
      "Complete Horoscope Analysis will tell what to do & what not to do in you life & what precautions any one needs to take for the betterment .. It is always advisable to consult an Astrologer before Taking any important decisions in life as our Ancestors used to do .. I Can't change your destiny but i will guide how to reach there will minimum hurdles . Be Blessed",
    includes: [],
    tiers: [
      {
        name: "Kundli Analysis Pro",
        image: "/images/services/kundli-pro.png",
        price: 4999,
        duration: "40 minutes",
        mode: "Video Call Consultation",
        note: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/or8pZCozbP60",
        features: ["After making payment, please share screenshot on WhatsApp +91 9319305731"],
      },
      {
        name: "Kundli Analysis",
        image: "/images/services/Untitled-design-7.png",
        price: 2999,
        duration: "20 minutes",
        mode: "Video Call Consultation",
        note: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/6rS2L7lQT2rK",
        features: ["After making payment, please share screenshot on WhatsApp +91 9319305731"],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "vastu-consultation",
    heroImage: "/images/services/vastu-consultation.png",
    name: "Vastu Consultation",
    tagline: "Balance Your Space. Align Your Energy. Transform Your Life.",
    icon: "vastu",
    featured: true,
    description:
      "Arvindrun Vnjay is a trusted and respected name in the world of Vastu Shastra also, known for delivering precise, transformative, and deeply insightful Vastu consultations. His approach beautifully blends ancient Vastu principles with modern practicality, ensuring that every space aligns with an individual's life goals, energy, and emotional well-being. With years of experience and thousands of successful consultations, he has helped people create environments that support peace, prosperity, health, and professional growth. Whether it's a home, office, shop, or showroom, his recommendations are simple, effective, and tailored to each person's unique journey.",
    longDescription: [
      "Arvindrun Vnjay is a trusted and respected name in the world of Vastu Shastra also, known for delivering precise, transformative, and deeply insightful Vastu consultations. His approach beautifully blends ancient Vastu principles with modern practicality, ensuring that every space aligns with an individual's life goals, energy, and emotional well-being. With years of experience and thousands of successful consultations, he has helped people create environments that support peace, prosperity, health, and professional growth. Whether it's a home, office, shop, or showroom, his recommendations are simple, effective, and tailored to each person's unique journey.",
      "Elevate the energy and harmony of your space with our expert, in-depth Vastu consultation. We offer a thorough analysis and personalized solutions designed to address your unique challenges.",
      "Our comprehensive consultation is structured to provide a deep understanding of your property's energy flow and identify areas for improvement.",
      "Initial Assessment: Two scheduled on-site visits to your property for a detailed, firsthand evaluation of your space.",
      "Expert Analysis: A meticulous analysis of your floor plan, spatial layout, and existing energy patterns.",
      "Issue Identification: Clear and precise identification of Vastu-related imbalances, issues, and challenges present in your residence or office.",
      "What We Need from You: To ensure the most effective and insightful consultation, please provide the following documentation in advance: Floor Plan: A clear and accurate floor plan or map of your entire residence or office space. Challenge Description: A detailed, written description of the specific challenges, issues, or goals you are currently facing or wish to address.",
      "Your Consultation Package: Once our analysis is complete, you will receive personalized guidance and a formal document detailing our findings. Personalized Zoom Session: A dedicated 1-hour virtual session to discuss our comprehensive findings and provide you with actionable, personalized Vastu solutions. Detailed Written Report: A professional, in-depth written report outlining our assessment, recommended modifications, and expert guidance.",
      "Important Service Notes: Pricing Structure: Please note that an additional fee of ₹10,000 will be applicable for every area increment of 500 square feet beyond the base package. On-site Visit Fee: Should a third (or subsequent) on-site visit be necessary or requested, an additional fee of ₹5,000 will be charged per visit. Focus on Guidance: Our expertise lies in providing expert guidance and sustainable solutions based on Vastu principles. We do not sell or provide Vastu remedies.",
      "Global Online Vastu Consultation Service: Achieve harmony and positive energy in your space from anywhere in the world with our expert online Vastu consultation. We provide comprehensive analysis and actionable solutions tailored to your unique needs.",
      "Virtual Sessions: Three (3) dedicated 30-minute online sessions via Zoom for discussions, analysis clarification, and solution delivery.",
      "Expert Analysis: Thorough review of your floor plan and assessment of the existing energy patterns in your property.",
      "Issue Identification: Clear identification of Vastu-related imbalances, challenges, and potential issues.",
      "Personalized Solutions: Focused and practical solutions, along with personalized recommendations to enhance your space's harmony.",
      "What We Need from You: To facilitate an accurate and effective virtual consultation, please submit the following documentation: Floor Plan: A clear and accurate digital floor plan or map of your entire residence or office space. Challenge Description: A detailed, written description of the specific challenges or goals you wish to address (e.g., health, career, relationships).",
      "Important Service Notes: Pricing Structure: An additional fee of ₹7,000 will be applicable for every area increment of 500 square feet beyond the base package. Additional Sessions: If you require sessions beyond the included three, please inquire with us directly for our current hourly rates. Focus on Guidance: Our expertise lies in providing expert guidance and sustainable solutions based on Vastu principles. We do not sell or provide Vastu remedies.",
    ],
    includes: [
      "Two scheduled on-site visits to your property for a detailed, firsthand evaluation of your space",
      "Meticulous analysis of your floor plan, spatial layout, and existing energy patterns",
      "Clear and precise identification of Vastu-related imbalances, issues, and challenges present in your residence or office",
      "A dedicated 1-hour virtual session to discuss our comprehensive findings and provide you with actionable, personalized Vastu solutions",
      "A professional, in-depth written report outlining our assessment, recommended modifications, and expert guidance",
      "Three (3) dedicated 30-minute online sessions via Zoom for discussions, analysis clarification, and solution delivery",
      "Thorough review of your floor plan and assessment of the existing energy patterns in your property",
      "Clear identification of Vastu-related imbalances, challenges, and potential issues",
      "Focused and practical solutions, along with personalized recommendations to enhance your space's harmony",
    ],
    tiers: [
      {
        name: "On-Site Vastu Consultation",
        image: "/images/services/vastu-onsite.png",
        price: 40999,
        duration: "For residential & office spaces in Delhi/NCR UPTO 1500 SQ. FT.",
        mode: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/hrziRkbCsa2d",
        features: [
          "For residential & office spaces in Delhi/NCR UPTO 1500 SQ. FT.",
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
      {
        name: "Online Vastu Consultation",
        image: "/images/services/vastu-online.png",
        price: 30999,
        duration: "For residential & office spaces in Delhi/NCR UPTO 1500 SQ. FT.",
        mode: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/ZrN224sw1Xm2",
        features: [
          "For residential & office spaces in Delhi/NCR UPTO 1500 SQ. FT.",
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "name-analysis",
    heroImage: "/images/services/name-analysis.png",
    name: "Name Analysis",
    tagline: "Your Name Holds the Power to Shape Your Life",
    icon: "name",
    description:
      "In Vedic Astrology and Numerology, your name isn't just a label — it carries a powerful vibration that directly influences your life path, success, relationships, and inner peace. When your name is not in harmony with your birth numbers and planetary energies, it can unknowingly create struggles, delays, and instability, even if you're putting in your best efforts in life. Your name is how the universe responds to you — it shapes first impressions, energetic flow, and even the way opportunities align for you.",
    longDescription: [
      "In Vedic Astrology and Numerology, your name isn't just a label — it carries a powerful vibration that directly influences your life path, success, relationships, and inner peace. When your name is not in harmony with your birth numbers and planetary energies, it can unknowingly create struggles, delays, and instability, even if you're putting in your best efforts in life. Your name is how the universe responds to you — it shapes first impressions, energetic flow, and even the way opportunities align for you.",
      "In this I will check your name & compatibility of your name with your numbers & horoscope than will guide you either you need name correction or New Name .. I will also check problem you are facing right now is really related to your Name or not .. In short i will not correct or Change any ones name immediately , Need to analysis the Name First .. After name analysis if name correction is possible and you want name correction you need to pay 3100 more for name correction & if name correction is not possible & you opt for New Name Design than you need to pay 7100 more for New Name Design.",
    ],
    includes: [],
    tiers: [
      {
        name: "Name Analysis",
        image: "/images/services/name-analysis.png",
        price: 1999,
        duration: "Consultation Video Call for 10 minutes.",
        mode: "Essential: Review the description before booking any service or class.",
        payLink: "https://u.payu.in/EIZbmyMbFPBn",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "consultation-combos",
    heroImage: "/images/services/consultation-combos.png",
    name: "Consultation Combos",
    tagline: "Career, relationship & personal growth – in one powerful package.",
    icon: "combos",
    description:
      "Whether you're seeking clarity in love, career, business, health, or personal growth, our Astrology Consultation Combos provide a holistic approach to understanding your destiny. Each combo is thoughtfully curated to align your inner energy with the cosmic rhythm, ensuring practical solutions and spiritual balance. Discover the power of combined consultations and let the stars reveal a complete roadmap for success, harmony, and self-discovery.",
    longDescription: [
      "Whether you're seeking clarity in love, career, business, health, or personal growth, our Astrology Consultation Combos provide a holistic approach to understanding your destiny. Each combo is thoughtfully curated to align your inner energy with the cosmic rhythm, ensuring practical solutions and spiritual balance. Discover the power of combined consultations and let the stars reveal a complete roadmap for success, harmony, and self-discovery.",
      "Description for Combo – In this i will check One horoscope with detailed analysis within the time limit & one name analysis & compatibility of your name with your numbers & horoscope than will guide you either you need name correction or New Name .. I will also check problem you are facing right now is really related to your Name or not .. In short i will not correct or Change any ones name immediately , Need to analysis the Name First .. After name analysis if name correction is possible and you want name correction you need to pay 3100/- more for name correction & if name correction is not possible & you opt for New Name Design than you need to pay 7100/- more for New Name Design.",
      "Description For Super Combo - In this i will check One horoscope with detailed analysis within the time limit & one name analysis & compatibility of your name with your numbers & horoscope than will guide you either you need name correction or New Name .. I will also check problem you are facing right now is really related to your Name or not .. In short i will not correct or Change any ones name immediately , Need to analysis the Name First .. After name analysis if name correction is possible and you want name correction you need to pay 3100/- more for name correction & if name correction is not possible & you opt for New Name Design than you need to pay 7100/- more for New Name Design. will check your Number and will tell you your lucky number from your date of birth & where you can use it will tell you your current number is good or bad is not good what issue it can give you and also suggest number to be chosen.",
    ],
    includes: [],
    tiers: [
      {
        name: "Combo Horoscope & Name Analysis",
        image: "/images/services/combo.png",
        price: 6999,
        duration: "50 minutes",
        mode: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/GIllYVlPiD1y",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
      {
        name: "Super Combo Horoscope &Name& Mobile Number",
        image: "/images/services/super-combo.png",
        price: 9999,
        duration: "60 minutes",
        mode: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/Vry2P4OEB8OR",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "company-name",
    heroImage: "/images/services/company-name.png",
    name: "Company Name Designing",
    tagline: "Fuel your business with a name that performs.",
    icon: "company",
    description:
      "In Vedic Astrology and Numerology, every name holds a specific vibration. I design company names as per your profession and business nature, because not every name suits every product or service. A name that's energetically misaligned can create hidden blockages, reduce customer trust, and even affect conversion rates.",
    longDescription: [
      "In Vedic Astrology and Numerology, every name holds a specific vibration. I design company names as per your profession and business nature, because not every name suits every product or service. A name that's energetically misaligned can create hidden blockages, reduce customer trust, and even affect conversion rates.",
      "I design company name as per the profession .. not every name goes well with any product & service .Your Company name represent you and it must be having positive energies so can it will help you to convert your leads into business...So don't wait design your Company Name Now .",
    ],
    includes: [],
    tiers: [
      {
        name: "Company Name Designing",
        image: "/images/services/company-name.png",
        price: 15999,
        duration: "Consultation Video Call Meeting for 15 minutes.",
        mode: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/JrdiHkcxttRd",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "company-analysis",
    heroImage: "/images/services/company-analysis.png",
    name: "Company Name Analysis",
    tagline: "Unlock Business Success Through Powerful Company Name Astrology Analysis Today",
    icon: "analysis",
    description:
      "Every name holds a celestial code — a pattern of energy shaped by the universe. In Company Name Astrology, we uncover how the planets and numbers behind your brand name influence your business aura and karmic path. When your company name vibrates harmoniously with your date of birth and ruling planet, it becomes a magnet for success, abundance, and opportunities. Let the stars guide your business identity toward divine alignment and prosperity.",
    longDescription: [
      "Every name holds a celestial code — a pattern of energy shaped by the universe. In Company Name Astrology, we uncover how the planets and numbers behind your brand name influence your business aura and karmic path. When your company name vibrates harmoniously with your date of birth and ruling planet, it becomes a magnet for success, abundance, and opportunities. Let the stars guide your business identity toward divine alignment and prosperity.",
      "I will analyze your company name based on your profession and the type of work your business offers. After understanding your services, I will check whether your current name truly suits your profession. If it doesn't align well, I will suggest a new name that matches your industry and the services you provide. For this, the fee is ₹11,000 after the Company Name Analysis. The complete outcome and explanation of the analysis will be shared with you through a voice call only.",
    ],
    includes: [],
    tiers: [
      {
        name: "Company Name Analysis",
        image: "/images/services/company-analysis.png",
        price: 3999,
        duration: "Consultation Video Call Meeting for 15 minutes.",
        mode: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/6JW7OW7d28A4",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "newborn-name",
    heroImage: "/images/services/newborn-name.png",
    name: "Newborn Baby Name Design",
    tagline: "Newborn Baby Name Designing",
    icon: "baby",
    description:
      "The naming process, often referred to as Naamkaran Sanskar, involves analyzing the baby's nakshatra (birth constellation), rashi (moon sign), and pada (specific syllable derived from the star position). By aligning the name with these astrological factors, parents can bless their child with favorable cosmic vibrations that attract luck and spiritual harmony. Beyond tradition, this personalized approach combines cultural wisdom with celestial science — creating a name that not only sounds beautiful but also carries deep spiritual meaning and lifelong significance.",
    longDescription: [
      "The naming process, often referred to as Naamkaran Sanskar, involves analyzing the baby's nakshatra (birth constellation), rashi (moon sign), and pada (specific syllable derived from the star position). By aligning the name with these astrological factors, parents can bless their child with favorable cosmic vibrations that attract luck and spiritual harmony. Beyond tradition, this personalized approach combines cultural wisdom with celestial science — creating a name that not only sounds beautiful but also carries deep spiritual meaning and lifelong significance.",
      "I will design your baby name as per his/her numbers & astrological chart which will help him/her to grow well in future .. A Name act like a mantra as no one knows us with our DOB .. We addressed by our name only ... It is always advice to have Good synchronized Name with your Numbers & Planets ...",
    ],
    includes: [],
    tiers: [
      {
        name: "New Born Baby Name Designing",
        image: "/images/services/newborn-name.png",
        price: 9999,
        duration: "Consultation Video Call Meeting for 15 minutes.",
        mode: "Essential: Review the above description before booking any service or class.",
        payLink: "https://u.payu.in/8rMiFkoxysko",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "mobile-analysis",
    heroImage: "/images/services/mobile-analysis.png",
    name: "Complete One Mobile Number Analysis",
    tagline: "Complete One Mobile Number Analysis",
    icon: "mobile",
    description:
      "Do you know your mobile number could be shaping your destiny? With Mobile Number Astrology Analysis, we decode the hidden power of your digits to uncover how they affect your luck, business growth, and personal life. A carefully chosen number aligned with your date of birth and ruling planet can bring better results, prosperity, and positive energy into your everyday communication. Discover your number's secret influence today!",
    longDescription: [
      "Do you know your mobile number could be shaping your destiny? With Mobile Number Astrology Analysis, we decode the hidden power of your digits to uncover how they affect your luck, business growth, and personal life. A carefully chosen number aligned with your date of birth and ruling planet can bring better results, prosperity, and positive energy into your everyday communication. Discover your number's secret influence today!",
      "I will check your Number and will tell you your lucky number from your date of birth & where you can use it. I will tell you your current number is good or bad if not good what issue it can give you and also suggest number to be chosen.",
    ],
    includes: [],
    tiers: [
      {
        name: "Complete Mobile Number Analysis",
        image: "/images/services/mobile-analysis.png",
        price: 2999,
        duration: "Consultation Video Call Meeting for 15 minutes.",
        mode: "Read the above description first before booking the consultation.",
        payLink: "https://u.payu.in/RJkBmi5y2dRv",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "logo-designing",
    heroImage: "/images/services/logo-designing.png",
    name: "Logo Designing",
    tagline: "Designing Logos That Capture Your Cosmic Signature.",
    icon: "logo",
    description:
      "Our logo designs blend astrological wisdom with creative artistry to give your brand a meaningful visual identity. By incorporating planetary energies, zodiac symbolism, and numerological balance, we craft logos that resonate with your true essence and purpose. Every design is thoughtfully aligned to attract positivity, strengthen your brand presence, and reflect the cosmic identity that makes you unique.",
    longDescription: [
      "Our logo designs blend astrological wisdom with creative artistry to give your brand a meaningful visual identity. By incorporating planetary energies, zodiac symbolism, and numerological balance, we craft logos that resonate with your true essence and purpose. Every design is thoughtfully aligned to attract positivity, strengthen your brand presence, and reflect the cosmic identity that makes you unique.",
      "We will create your complete logo for you — no need to hire any designer. We provide a fully designed, ready-to-use logo that is aligned with your planetary energies and crafted to bring luck, balance, and success.",
    ],
    includes: [],
    tiers: [
      {
        name: "Logo Designing",
        image: "/images/services/logo-designing.png",
        price: 16999,
        duration: "Consultation Video Call for 15 minutes.",
        mode: "Essential: Review the description before booking any service or class.",
        payLink: "https://u.payu.in/NI8RKR7BpD52",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
  {
    slug: "meet-me-personally",
    heroImage: "/images/services/meet-me-personally.png",
    name: "Meet Me Personally",
    tagline: "One Conversation. Infinite Clarity. A Better You.",
    icon: "meet",
    description:
      "Arvindrun Vnjay offers a warm, personal space for individuals seeking clarity, healing, and direction in life. Through one-on-one sessions, he blends Astrology, Name Numerology, and Vastu insights to uncover the energies shaping your journey. His guidance is practical, intuitive, and deeply personalized—helping you make better decisions, overcome obstacles, and realign your life with purpose and confidence. Whether you seek emotional clarity, career direction, relationship harmony, or spiritual growth, meeting him personally ensures support that is meaningful, transformative, and tailored entirely to you.",
    longDescription: [
      "Arvindrun Vnjay offers a warm, personal space for individuals seeking clarity, healing, and direction in life. Through one-on-one sessions, he blends Astrology, Name Numerology, and Vastu insights to uncover the energies shaping your journey. His guidance is practical, intuitive, and deeply personalized—helping you make better decisions, overcome obstacles, and realign your life with purpose and confidence. Whether you seek emotional clarity, career direction, relationship harmony, or spiritual growth, meeting him personally ensures support that is meaningful, transformative, and tailored entirely to you.",
      "Meet Me Personally I stay in greater Noida West UP Near Ek Murti Circle .. You will get one Horoscope Name & Mobile Consultation Combo . You Will get 60 Minutes Time.",
    ],
    includes: [],
    tiers: [
      {
        name: "Meet me Personally",
        image: "/images/services/meet-me.png",
        price: 11999,
        duration: "Personal meet with me for 75 minutes.",
        mode: "Essential: Review the description before booking any service or class.",
        payLink: "https://u.payu.in/uJS78aMmctuW",
        features: [
          "After making payment, please share screenshot on WhatsApp +91 9319305731",
        ],
      },
    ],
    bookingNotes: [
      "After booking, you'll be assigned the next available slot. A minimum waiting of 4-5 working days.",
      "Your consultation call will be scheduled only after payment.",
      "If rescheduling occurs due to Arvindrun Sir's prior commitments, your consultation will still be given priority, and the nearest available slot will be provided.",
      "Note : This is a one-time consultation only. There is no refund policy once the call is booked and the consultation with Arvindrun Sir has taken place.",
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
