export interface Book {
  title: string;
  note?: string;
  image: string;
  buyUrl: string;
}

export const BOOKS: Book[] = [
  { title: "Brihat Parasara Hora Sastra", note: "by R. Santhanam", image: "/images/books/bphs.jpg", buyUrl: "https://amzn.to/4aBX7jk" },
  { title: "How to Judge a Horoscope Volume 1 & 2", note: "by B.V. Raman", image: "/images/books/bvraman.png", buyUrl: "https://amzn.to/4knGonp" },
  { title: "Light on Life", note: "by Hart de Fouw & Robert Svoboda — bestseller for Beginners", image: "/images/books/lightonlife.png", buyUrl: "https://amzn.to/45ScQrX" },
  { title: "Phala Deepika", note: "by Mantreswara — bestseller for Predictive Astrology", image: "/images/books/phala.jpg", buyUrl: "https://amzn.to/4rFCd8N" },
  { title: "Autobiography of A Yogi (Hindi)", image: "/images/books/yogi.png", buyUrl: "https://amzn.to/4a4ysUr" },
  { title: "Navagraha Purana", note: "by V.S. Rao", image: "/images/books/navagraha.png", buyUrl: "https://amzn.to/3ZlvxRh" },
  { title: "Navagraha Purana (Hindi)", note: "by V. S. Rao", image: "/images/books/navagraha-hi.jpg", buyUrl: "https://amzn.to/45WW4b7" },
  { title: "The Nakshatras: The Stars Beyond the Zodiac", note: "by Komilla Sutton", image: "/images/books/nakshatras.png", buyUrl: "https://amzn.to/4tpIVkQ" },
  { title: "Brihat Parashara Hora Shastra (set of 2 vols.)", note: "Hindi — by Dr. Suresh Chandra Mishra", image: "/images/books/bphs-hi.png", buyUrl: "https://amzn.to/4bI9fQV" },
  { title: "Elements of Vedic Astrology Vol 1 & 2", note: "English — by Dr. K.S.", image: "/images/books/elements.jpg", buyUrl: "https://amzn.to/3O2GVPs" },
  { title: "Bhrigu Saral Paddhati", note: "by Sunil John", image: "/images/books/bhrigu-saral.jpg", buyUrl: "https://amzn.to/3Og4XXf" },
  { title: "भृगु सरल पद्धति: Bhrigu Saral Paddhati (Part-I)", note: "by Saptarishis Astrology", image: "/images/books/bhrigu-hi.jpg", buyUrl: "https://amzn.to/4tpoSmE" },
  { title: "Learn Astrology Easily / Learn & Master Astrology Easily", note: "English — by CJK Swamy", image: "/images/books/cjk.jpg", buyUrl: "https://amzn.to/4koqEAt" },
  { title: "Satya Jatakam: Basis of Dhruva Nadi", image: "/images/books/satyajatakam.jpg", buyUrl: "https://amzn.to/4rxWhda" },
  { title: "Navamsa System of Prediction", note: "by R.K. Das", image: "/images/books/navamsa.jpg", buyUrl: "https://amzn.to/3NVKkQa" },
  { title: "Dispositors in Astrology", note: "by J.N. Bhasin — a unique and original work", image: "/images/books/dispositors.jpg", buyUrl: "https://amzn.to/4rwCGKm" },
  { title: "Aadhunik Vidhi Se Kundali Ki Vivechna", image: "/images/books/aadhunik.jpg", buyUrl: "https://amzn.to/4r4wVUm" },
  { title: "Dictionary of Astrology — Astrological Terminology Guide", note: "by J.N. Bhasin", image: "/images/books/dictionary.jpg", buyUrl: "https://amzn.to/4akcifY" },
  { title: "Timing Events Through Vimshottary Dasha", note: "by K.N. Rao (English)", image: "/images/books/vimshottari.jpg", buyUrl: "https://amzn.to/4aj7gA5" },
  { title: "विंशोत्तरी दशा से भविष्यवाणी करना", note: "by K.N. Rao", image: "/images/books/vimshottari-hi.jpg", buyUrl: "https://amzn.to/4rbM5HI" },
  { title: "Finer Techniques of Astrological Predictions Vol 1, 2", note: "by K.N. Rao", image: "/images/books/finer.png", buyUrl: "https://amzn.to/4qHOJnz" },
  { title: "Deva Keralam: Chandra Kala Nadi — 3 Volumes", note: "by R. Santhanam", image: "/images/books/deva.png", buyUrl: "https://amzn.to/4tq2k5d" },
  { title: "A Catechism of Astrology", note: "by B.V. Raman", image: "/images/books/catechism.jpg", buyUrl: "https://amzn.to/402uyFD" },
  { title: "Golden Rules of Astrology", note: "by S.S. Chatterjee", image: "/images/books/golden.jpg", buyUrl: "https://amzn.to/4tndvLV" },
  { title: "Fundamentals of Astrology", note: "English — by M.R. Bhat", image: "/images/books/fundamentals.jpg", buyUrl: "https://amzn.to/4qrRwRs" },
  { title: "Karamvipak Sahinta", note: "by Pandit Shambu Datt Tripathi (Hindi)", image: "/images/books/karma.png", buyUrl: "https://amzn.to/4kx5NLu" },
  { title: "Muhurat Chintamani — Authentic Guide to Auspicious Timing in Jyotish", note: "Hindi — by Dr. Suresh Chandra Mishra", image: "/images/books/muhurat-hi.jpg", buyUrl: "https://amzn.to/4qnoCBS" },
  { title: "Muhurta Chintamani", note: "English — by Shiv Kumar Chadha", image: "/images/books/muhurat-en.png", buyUrl: "https://amzn.to/46v0Mgv" },
  { title: "जातकादेशमार्ग-चन्द्रिका: Jataka Desh Marga", note: "by Gopesh Kumar Ojha", image: "/images/books/jataka.jpg", buyUrl: "https://amzn.to/4tsS6B6" },
  { title: "Kalaprakasika — The standard book on the election system 'Muhurtha'", note: "by N.P. Subramonia Iyer", image: "/images/books/kalaprakasika.jpg", buyUrl: "https://amzn.to/4aq5ugO" },
  { title: "The Sarvarth Chintamani of Vyankatesh Sharma", note: "by J.N. Bhasin", image: "/images/books/sarvarth.jpg", buyUrl: "https://amzn.to/3Ohb3qi" },
  { title: "Brihat Jatak — An Immortal Source Book of Hindu Predictive Astrology", note: "by Acharya Varahamihira", image: "/images/books/brihatjatak.jpg", buyUrl: "https://amzn.to/4tnE6J3" },
  { title: "Everyday Ayurveda", note: "English", image: "/images/books/ayurveda-en.png", buyUrl: "https://amzn.to/4sU0WGV" },
  { title: "Everyday Ayurveda (Hindi)", image: "/images/books/ayurveda-hi.png", buyUrl: "https://amzn.to/4uPX37Z" },
  { title: "Vishwakarma Prakash: Vastu Shastram", note: "Ancient Indian Vastu & Jyotish Grantha — by Maharshi Abhay Katyayan", image: "/images/books/vishwakarma.jpg", buyUrl: "https://amzn.to/4uNcVIk" },
  { title: "Visvakarma Prakash — Decoded: A Compendium on Hindu Architectural Astrology", image: "/images/books/vishwakarma-decoded.jpg", buyUrl: "https://amzn.to/3NHoUpU" },
  { title: "Jayshree Om — The Ancient Science of Vastu 1: The Vishwakarma Prakash Retold", image: "/images/books/vastu-retold.png", buyUrl: "https://amzn.to/4tf5qIG" },
  { title: "Uttara Kalamrita — A Rare and Invaluable Treasure House of Astrological Lore", note: "by Kalidasa, trans. P.S. Shastri", image: "/images/books/uttara.jpg", buyUrl: "https://amzn.to/4daJWI7" },
  { title: "Samrangana Sutradhar Vastushastra (set of 2 vols.)", note: "Hindi", image: "/images/books/samrangana-hi.png", buyUrl: "https://amzn.to/48sXifl" },
  { title: "Bhoja's Samarangana-Sutradhara Vastushastra (set of 2 vols.)", note: "English", image: "/images/books/samrangana-en.jpg", buyUrl: "https://amzn.to/47MZiPx" },
];
