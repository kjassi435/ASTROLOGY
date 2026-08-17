export interface Book {
  title: string;
  note?: string;
  image: string;
  buyUrl: string;
}

export const BOOKS: Book[] = [
  { title: "BRIHAT PARASARA HORA SASTRA", note: "by R. Santhanam", image: "/images/books/bphs.jpg", buyUrl: "https://amzn.to/4aBX7jk" },
  { title: "How to Judge a Horoscope Volume 1 & 2", note: "by B.V. Raman", image: "/images/books/Screenshot-2026-02-08-204503.png", buyUrl: "https://amzn.to/4knGonp" },
  { title: "Light on Life", note: "by Hart de Fouw & Robert Svoboda — bestseller for Beginners", image: "/images/books/Screenshot-2026-02-08-205011.png", buyUrl: "https://amzn.to/45ScQrX" },
  { title: "Phala Deepika", note: "by Mantreswara — bestseller for Predictive Astrology", image: "/images/books/ppp.jpg", buyUrl: "https://amzn.to/4rFCd8N" },
  { title: "Autobiography of A Yogi (Hindi)", image: "/images/books/Screenshot-2026-02-08-212117.png", buyUrl: "https://amzn.to/4a4ysUr" },
  { title: "Navagraha Purana", note: "by V.S. Rao", image: "/images/books/Screenshot-2026-02-08-212541.png", buyUrl: "https://amzn.to/3ZlvxRh" },
  { title: "Navagraha Purana (Hindi)", note: "by V. S. Rao", image: "/images/books/ppp-1.jpg", buyUrl: "https://amzn.to/45WW4b7" },
  { title: "The Nakshatras: The Stars Beyond the Zodiac", note: "by Komilla Sutton", image: "/images/books/Screenshot-2026-02-08-213026.png", buyUrl: "https://amzn.to/4tpIVkQ" },
  { title: "Brihat Parashara Hora Shastra (set of 2 vols.)", note: "Hindi — by Dr. Suresh Chandra Mishra", image: "/images/books/Screenshot-2026-02-08-213510.png", buyUrl: "https://amzn.to/4bI9fQV" },
  { title: "Elements of Vedic Astrology Vol 1 & 2", note: "English — by Dr. K.S.", image: "/images/books/ppp-2.jpg", buyUrl: "https://amzn.to/3O2GVPs" },
  { title: "Bhrigu Saral Paddhati", note: "by Sunil John", image: "/images/books/ppp-3.jpg", buyUrl: "https://amzn.to/3Og4XXf" },
  { title: "Bhrigu Saral Paddhati (Part-I)", note: "by Saptarishis Astrology", image: "/images/books/ppp-4.jpg", buyUrl: "https://amzn.to/4tpoSmE" },
  { title: "Learn Astrology Easily / Learn & Master Astrology Easily", note: "English — by CJK Swamy", image: "/images/books/ppp-5.jpg", buyUrl: "https://amzn.to/4koqEAt" },
  { title: "Satya Jatakam: Basis of Dhruva Nadi", image: "/images/books/ppp-6.jpg", buyUrl: "https://amzn.to/4rxWhda" },
  { title: "Navamsa System of Prediction", note: "by R.K. Das", image: "/images/books/ppp-7.jpg", buyUrl: "https://amzn.to/3NVKkQa" },
  { title: "Dispositors in Astrology", note: "by J.N. Bhasin — a unique and original work", image: "/images/books/ppp-8.jpg", buyUrl: "https://amzn.to/4rwCGKm" },
  { title: "Aadhunik Vidhi Se Kundali Ki Vivechna", image: "/images/books/ppp-9.jpg", buyUrl: "https://amzn.to/4r4wVUm" },
  { title: "Dictionary of Astrology — Astrological Terminology Guide", note: "by J.N. Bhasin", image: "/images/books/ppp-10.jpg", buyUrl: "https://amzn.to/4akcifY" },
  { title: "Timing Events Through Vimshottary Dasha", note: "by K.N. Rao (English)", image: "/images/books/ppp-11.jpg", buyUrl: "https://amzn.to/4aj7gA5" },
  { title: "Vimshottari Dasha se Bhavishyavani", note: "by K.N. Rao", image: "/images/books/ppp-12.jpg", buyUrl: "https://amzn.to/4rbM5HI" },
  { title: "Finer Techniques of Astrological Predictions Vol 1, 2", note: "by K.N. Rao", image: "/images/books/Screenshot-2026-02-08-220232.png", buyUrl: "https://amzn.to/4qHOJnz" },
  { title: "Deva Keralam: Chandra Kala Nadi — 3 Volumes", note: "by R. Santhanam", image: "/images/books/Screenshot-2026-02-08-220443.png", buyUrl: "https://amzn.to/4tq2k5d" },
  { title: "A Catechism of Astrology", note: "by B.V. Raman", image: "/images/books/ppp-14.jpg", buyUrl: "https://amzn.to/402uyFD" },
  { title: "Golden Rules of Astrology", note: "by S.S. Chatterjee", image: "/images/books/ppp-15.jpg", buyUrl: "https://amzn.to/4tndvLV" },
  { title: "Fundamentals of Astrology", note: "English — by M.R. Bhat", image: "/images/books/ppp-16.jpg", buyUrl: "https://amzn.to/4qrRwRs" },
  { title: "Karamvipak Sahinta", note: "by Pandit Shambu Datt Tripathi (Hindi)", image: "/images/books/Screenshot-2026-02-08-222220.png", buyUrl: "https://amzn.to/4kx5NLu" },
  { title: "Muhurat Chintamani", note: "Hindi — by Dr. Suresh Chandra Mishra", image: "/images/books/ppp-17.jpg", buyUrl: "https://amzn.to/4qnoCBS" },
  { title: "Muhurta Chintamani", note: "English — by Shiv Kumar Chadha", image: "/images/books/Screenshot-2026-02-08-222751.png", buyUrl: "https://amzn.to/46v0Mgv" },
  { title: "Jataka Desh Marga", note: "by Gopesh Kumar Ojha", image: "/images/books/aa-2.jpg", buyUrl: "https://amzn.to/4tsS6B6" },
  { title: "Kalaprakasika", note: "The standard book on Muhurtha — by N.P. Subramonia Iyer", image: "/images/books/aa-3.jpg", buyUrl: "https://amzn.to/4aq5ugO" },
  { title: "The Sarvarth Chintamani of Vyankatesh Sharma", note: "by J.N. Bhasin", image: "/images/books/aa-4.jpg", buyUrl: "https://amzn.to/3Ohb3qi" },
  { title: "Everyday Ayurveda", note: "English", image: "/images/books/Screenshot-2026-03-21-170447.png", buyUrl: "https://amzn.to/4sU0WGV" },
  { title: "Everyday Ayurveda (Hindi)", image: "/images/books/Screenshot-2026-03-21-170635.png", buyUrl: "https://amzn.to/4uPX37Z" },
  { title: "Vishwakarma Prakash: Vastu Shastram", note: "Ancient Indian Vastu & Jyotish Grantha — by Maharshi Abhay Katyayan", image: "/images/books/one.jpg", buyUrl: "https://amzn.to/4uNcVIk" },
  { title: "Visvakarma Prakash — Decoded", note: "A Compendium on Hindu Architectural Astrology", image: "/images/books/one-1.jpg", buyUrl: "https://amzn.to/3NHoUpU" },
  { title: "Jayshree Om — The Ancient Science of Vastu 1", note: "The Vishwakarma Prakash Retold", image: "/images/books/Screenshot-2026-03-26-193509.png", buyUrl: "https://amzn.to/4tf5qIG" },
  { title: "Uttara Kalamrita", note: "A Rare Treasure House of Astrological Lore — by Kalidasa, trans. P.S. Shastri", image: "/images/books/41JEMIOsuwL.jpg", buyUrl: "https://amzn.to/4daJWI7" },
  { title: "Samrangana Sutradhar Vastushastra (set of 2 vols.)", note: "Hindi", image: "/images/books/Screenshot-2026-04-08-111943.png", buyUrl: "https://amzn.to/48sXifl" },
  { title: "Bhoja's Samarangana-Sutradhara Vastushastra", note: "Set of 2 Vols. — English", image: "/images/books/aaa.jpg", buyUrl: "https://amzn.to/47MZiPx" },
];
