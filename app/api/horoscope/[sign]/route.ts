import { NextRequest, NextResponse } from "next/server";

interface CacheEntry {
  data: object;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 24 * 60 * 60 * 1000;

const VALID_SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

type Sections = {
  career: { hi: string; en: string };
  love: { hi: string; en: string };
  health: { hi: string; en: string };
  finance: { hi: string; en: string };
};

const FALLBACK: Record<string, { description: string; luckyNumber: string; luckyColor: string; mood: string; sections: Sections }> = {
  aries: {
    description: "Today brings new energy to your doorstep. Trust your instincts.",
    luckyNumber: "7", luckyColor: "Red", mood: "Confident",
    sections: {
      career: { hi: "आज कार्यक्षेत्र में नए अवसर दिखाई देंगे। कोई बड़ा प्रोजेक्ट आपके हाथ में आ सकता है। अपनी टीम के साथ सहयोग बढ़ाएं और नए विचारों का स्वागत करें।", en: "New opportunities emerge at work. A major project may land on your desk. Collaborate with your team and welcome fresh ideas." },
      love: { hi: "प्रेम संबंधों में आज गहराई आएगी। अपने प्रिय के साथ खुलकर बात करें। अविवाहित लोगों के लिए कोई नई मुलाकात संभव है।", en: "Love deepens today. Open up to your partner. Singles may encounter someone intriguing through mutual friends." },
      health: { hi: "स्वास्थ्य अच्छा रहेगा। हल्का व्यायाम या सुबह की सैर आपको ऊर्जा देगी। अत्यधिक तनाव से बचें।", en: "Health looks positive. A light workout or morning walk will energize you. Avoid overexertion." },
      finance: { hi: "आर्थिक मामलों में संतुलन बनाए रखें। बिना सोचे-समझे खर्च करने से बचें।", en: "Stay balanced financially. Avoid impulsive spending. A small adjustment could yield long-term gains." },
    },
  },
  taurus: {
    description: "Financial matters take center stage. Stay grounded and patient.",
    luckyNumber: "4", luckyColor: "Green", mood: "Calm",
    sections: {
      career: { hi: "कार्यस्थल पर आज आपकी मेहनत रंग लाएगी। पुरानी परियोजना में सफलता मिल सकती है।", en: "Your hard work pays off at the office. An old project reaches a successful milestone." },
      love: { hi: "प्रेम में आज धैर्य रखें। जल्दबाजी में कोई निर्णय न लें। अपने साथी की भावनाओं का सम्मान करें।", en: "Patience is key in love today. Respect your partner's feelings and let things unfold naturally." },
      health: { hi: "स्वास्थ्य में सुधार होगा। आज अपने आहार पर ध्यान दें। ताज़े फल और हरी सब्ज़ियाँ खाएं।", en: "Health improves. Pay attention to your diet today. Fresh fruits and greens will boost your vitality." },
      finance: { hi: "आर्थिक दृष्टि से आज अच्छा दिन है। पुराना उधार वापस मिल सकता है। बचत योजना बनाएं।", en: "Financially favorable day. An old debt may be repaid. Consider a structured savings plan." },
    },
  },
  gemini: {
    description: "Your social circle expands in unexpected ways. Let curiosity lead.",
    luckyNumber: "5", luckyColor: "Yellow", mood: "Curious",
    sections: {
      career: { hi: "काम में नए विचारों का प्रवाह होगा। आज कुछ नया सीखने का अवसर मिलेगा।", en: "Fresh ideas flow at work. You'll learn something new today." },
      love: { hi: "प्रेम में रोमांच बढ़ेगा। अपने साथी के साथ कोई नया अनुभव साझा करें।", en: "Romance gets exciting. Share a new experience with your partner." },
      health: { hi: "मानसिक स्वास्थ्य बेहतर रहेगा। आज कुछ समय अकेले में बिताएं। ध्यान या योग करें।", en: "Mental health looks strong. Spend some quiet time alone. Meditation will restore balance." },
      finance: { hi: "आर्थिक मामले में आज सतर्क रहें। अनावश्यक खर्च से बचें।", en: "Be cautious with money today. Avoid unnecessary expenses." },
    },
  },
  cancer: {
    description: "Home and family matters demand your attention. Nurture your bonds.",
    luckyNumber: "2", luckyColor: "Silver", mood: "Nurturing",
    sections: {
      career: { hi: "कार्यस्थल पर आज ध्यान केंद्रित रखें। सहकर्मियों के साथ अच्छे संबंध बनाएं।", en: "Stay focused at work. Maintain cordial relationships with colleagues." },
      love: { hi: "प्रेम में आज गर्माहट आएगी। परिवार का सहयोग प्रेम जीवन को मजबूत करेगा।", en: "Love warms up today. Family support strengthens your romantic life." },
      health: { hi: "स्वास्थ्य में उतार-चढ़ाव संभव है। अपनी भावनाओं को स्वीकारें।", en: "Health may fluctuate. Accept your emotions without judgment." },
      finance: { hi: "पैसों के मामले में आज धैर्य रखें। घर से जुड़ी खरीदारी में संतुलन बनाएं।", en: "Be patient with finances. Balance household expenses carefully." },
    },
  },
  leo: {
    description: "Creativity flows abundantly. Express yourself boldly.",
    luckyNumber: "1", luckyColor: "Gold", mood: "Inspired",
    sections: {
      career: { hi: "काम में आज आपकी रचनात्मकता चरम पर होगी। नेतृत्व की भूमिका में आप सफल होंगे।", en: "Creativity peaks at work. You'll thrive in a leadership role today." },
      love: { hi: "प्रेम में आज चमक आएगी। अपने प्रिय को कोई सरप्राइज़ दें।", en: "Love shines bright. Surprise your partner with something special." },
      health: { hi: "स्वास्थ्य बेहतर रहेगा। आज कोई खेल या शारीरिक गतिविधि करें।", en: "Health looks great. Engage in a sport or physical activity today." },
      finance: { hi: "आर्थिक मामले में संतोषजनक दिन है। नई आय का स्रोत बन सकता है।", en: "Financially satisfying. A new income source may emerge." },
    },
  },
  virgo: {
    description: "Details matter today. Your analytical mind catches what others miss.",
    luckyNumber: "6", luckyColor: "Navy", mood: "Focused",
    sections: {
      career: { hi: "कार्यस्थल पर आज आपकी विस्तृत सोच लाभदायक होगी। कोई महत्वपूर्ण दस्तावेज़ तैयार कर सकते हैं।", en: "Your attention to detail pays off at work. You may prepare an important document." },
      love: { hi: "प्रेम में आज छोटी-छोटी बातों का ध्यान रखें। साथी की ज़रूरतों को समझें।", en: "In love, pay attention to the small things today. Understand your partner's needs." },
      health: { hi: "स्वास्थ्य सामान्य रहेगा। आज अपनी दिनचर्या में सुधार करें।", en: "Health remains stable. Improve your daily routine today." },
      finance: { hi: "आर्थिक मामले में सावधानी बरतें। बजट बनाकर चलें।", en: "Handle finances carefully. Stick to a budget plan." },
    },
  },
  libra: {
    description: "Balance is your theme. A difficult decision becomes clearer today.",
    luckyNumber: "3", luckyColor: "Pink", mood: "Harmonious",
    sections: {
      career: { hi: "कार्यस्थल पर सामंजस्य बनाए रखें। टीम वर्क आज विशेष रूप से मददगार होगा।", en: "Maintain harmony at work. Teamwork will be especially helpful today." },
      love: { hi: "प्रेम में आज संतुलन आएगा। कोई पुराना गिले-शिकवा दूर हो सकता है।", en: "Balance returns to love. An old misunderstanding may be resolved." },
      health: { hi: "स्वास्थ्य अच्छा रहेगा। आज ध्यान या माइंडफुलनेस का अभ्यास करें।", en: "Health looks good. Practice meditation or mindfulness today." },
      finance: { hi: "आर्थिक मामले में आज अच्छी खबर मिल सकती है। निवेश में लाभ संभव है।", en: "Good financial news may come. Investment returns look promising." },
    },
  },
  scorpio: {
    description: "Transformation is in the air. Let go of what no longer serves you.",
    luckyNumber: "8", luckyColor: "Black", mood: "Intense",
    sections: {
      career: { hi: "कार्यक्षेत्र में बदलाव का समय है। नई ज़िम्मेदारियाँ मिल सकती हैं।", en: "Change is coming at work. New responsibilities may be assigned to you." },
      love: { hi: "प्रेम में गहराई आएगी। अपने साथी के साथ भरोसे का रिश्ता मजबूत होगा।", en: "Love deepens. Trust between you and your partner strengthens." },
      health: { hi: "स्वास्थ्य में सुधार होगा। आज अपनी भावनाओं को स्वीकारें और आगे बढ़ें।", en: "Health improves. Accept your emotions and move forward." },
      finance: { hi: "आर्थिक मामले में संभलकर चलें। बड़ा निवेश आज न करें।", en: "Be careful with finances. Avoid major investments today." },
    },
  },
  sagittarius: {
    description: "Adventure calls. Expand your horizons with enthusiasm.",
    luckyNumber: "9", luckyColor: "Purple", mood: "Adventurous",
    sections: {
      career: { hi: "काम में आज नई दिशा मिलेगी। कोई अंतरराष्ट्रीय अवसर आ सकता है।", en: "Work takes an exciting direction. An international opportunity may arise." },
      love: { hi: "प्रेम में आज रोमांच है। कोई नई यात्रा या अनुभव साझा करें।", en: "Romance is adventurous today. Share a trip or new experience with your partner." },
      health: { hi: "स्वास्थ्य बेहतर रहेगा। बाहरी गतिविधियों में भाग लें।", en: "Health looks great. Engage in outdoor activities." },
      finance: { hi: "आर्थिक मामले में उतार-चढ़ाव संभव है। बचत को प्राथमिकता दें।", en: "Financial fluctuations possible. Prioritize savings." },
    },
  },
  capricorn: {
    description: "Your hard work begins to pay off. Stay disciplined.",
    luckyNumber: "10", luckyColor: "Brown", mood: "Determined",
    sections: {
      career: { hi: "कार्यस्थल पर आज आपकी मेहनत रंग लाएगी। प्रमोशन या पुरस्कार की संभावना है।", en: "Your hard work at the office pays off. A promotion or recognition is possible." },
      love: { hi: "प्रेम में स्थिरता आएगी। अपने साथी के साथ भविष्य की योजनाएं बनाएं।", en: "Stability returns to love. Plan the future with your partner." },
      health: { hi: "स्वास्थ्य सामान्य रहेगा। नियमित व्यायाम जारी रखें।", en: "Health remains stable. Continue your regular exercise routine." },
      finance: { hi: "आर्थिक मामले में आज अच्छी प्रगति होगी। लंबी अवधि का निवेश फायदेमंद होगा।", en: "Financial progress today. Long-term investments will be beneficial." },
    },
  },
  aquarius: {
    description: "Innovation defines your day. Share your unique ideas with the world.",
    luckyNumber: "11", luckyColor: "Blue", mood: "Visionary",
    sections: {
      career: { hi: "काम में आज आपकी अनूठी सोच की सराहना होगी। नवाचार करने का समय है।", en: "Your unique thinking is appreciated at work today. It's time to innovate." },
      love: { hi: "प्रेम में आज नवीनता लाएं। कोई अनोखा तोहफा या अनुभव दें।", en: "Bring novelty to love today. Gift something unique or create a new memory." },
      health: { hi: "स्वास्थ्य अच्छा रहेगा। आज कोई नई फिटनेस एक्टिविटी ट्राई करें।", en: "Health looks good. Try a new fitness activity today." },
      finance: { hi: "आर्थिक मामले में आज नए विचार आ सकते हैं। टेक से जुड़ा निवेश लाभदायक हो सकता है।", en: "Fresh financial ideas emerge. Tech-related investments may prove profitable." },
    },
  },
  pisces: {
    description: "Your intuition is exceptionally strong. Pay attention to your dreams.",
    luckyNumber: "12", luckyColor: "Lavender", mood: "Intuitive",
    sections: {
      career: { hi: "कार्यस्थल पर आज आपकी अंतर्दृष्टि काम आएगी। रचनात्मक परियोजना में सफलता मिलेगी।", en: "Your insight proves valuable at work. A creative project will succeed." },
      love: { hi: "प्रेम में आज भावनात्मक जुड़ाव गहरा होगा। अपने दिल की सुनें।", en: "Emotional bonds deepen in love. Listen to your heart." },
      health: { hi: "स्वास्थ्य में सुधार होगा। आज प्रकृति में समय बिताएं।", en: "Health improves. Spend time in nature today." },
      finance: { hi: "आर्थिक मामले में आज संतुलन बनाए रखें। बिना सोचे निवेश न करें।", en: "Maintain financial balance. Don't invest without careful thought." },
    },
  },
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sign: string }> }
) {
  const { sign } = await params;

  if (!VALID_SIGNS.includes(sign)) {
    return NextResponse.json({ error: "Invalid zodiac sign" }, { status: 400 });
  }

  const today = new Date().toISOString().split("T")[0];
  const cacheKey = `${sign}-${today}`;

  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const res = await fetch(
      `https://aztro.sameerkumar.website?sign=${sign}&day=today`,
      { method: "POST" }
    );

    if (!res.ok) throw new Error("upstream unavailable");

    const data = await res.json();
    const fb = FALLBACK[sign];

    const result = {
      description: data.description ?? fb.description,
      luckyNumber: data.lucky_number ?? fb.luckyNumber,
      luckyColor: data.lucky_color ?? fb.luckyColor,
      mood: data.mood ?? fb.mood,
      date: data.current_date ?? today,
      sections: fb.sections,
    };

    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);
  } catch {
    const fb = FALLBACK[sign];
    const fallback = { ...fb, date: today };
    cache.set(cacheKey, { data: fallback, timestamp: Date.now() });
    return NextResponse.json(fallback);
  }
}
