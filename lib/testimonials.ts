export interface Testimonial {
  name: string;
  initials: string;
  text: string;
  source: string;
  badge: "Verified Student" | "Verified Client";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Kartk V Singh",
    initials: "KV",
    text: "Amazing experience! The name numerology report for my daughter was incredibly insightful. It helped us choose a name in perfect sync with her birth stars and destiny.",
    source: "Google Review",
    badge: "Verified Student",
  },
  {
    name: "Dr. Pandit Sadanand Mankar",
    initials: "DM",
    text: "Name numerology consultation was precise, accurate, professional, practical and in-depth with astrology. Thank you for the wonderful guidance.",
    source: "Google Review",
    badge: "Verified Client",
  },
  {
    name: "Vineet Kumar",
    initials: "VK",
    text: "Very in-depth and less published sutras given by Acharya ji. Deep diving sessions where curiosity for knowing more just increases.",
    source: "Google Review",
    badge: "Verified Student",
  },
  {
    name: "Apurva Chaudhary",
    initials: "AC",
    text: "Sir is truly amazing. He aligned the child's name holistically through numerology, energy, and most importantly aligning it with kundali which very few numerologists do. Highly recommended!",
    source: "Google Review",
    badge: "Verified Client",
  },
  {
    name: "Rachna Pawar",
    initials: "RP",
    text: "Sir's prediction is always to the point and absolutely true... he is a genuine person and full of knowledge. Thank you so much Sir!",
    source: "Google Review",
    badge: "Verified Client",
  },
  {
    name: "Nishant",
    initials: "NS",
    text: "Every session is a journey into the depths of ancient wisdom, guided with clarity and genuine care.",
    source: "Google Review",
    badge: "Verified Student",
  },
];
