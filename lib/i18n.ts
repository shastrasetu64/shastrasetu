import type { Lang } from './types';

export const UI: Record<Lang, Record<string, string>> = {
  en: {
    brandSub:'Spiritual Library', navLibrary:'Library', navAdmin:'Admin', language:'Language',
    heroTitle:'A bridge to spiritual knowledge', heroText:'Explore spiritual books, chapters and videos in one place.',
    browse:'Browse Library', interest:'I\'m Interested in a Book', books:'Books', lib:'Spiritual Library',
    sub:'Choose a book to explore.', search:'Search books...', statusLoading:'Loading library…',
    noBooks:'No books have been added yet. The Admin panel will let you create them.', name:'Name',
    mobile:'Mobile Number', email:'Email', leadLanguage:'Language', submit:'Submit Interest',
    interestTitle:'I\'m Interested in This Book', interestText:'Please submit your details. We will record your interest in this book.',
    submitThanks:'Thank you. Your interest has been recorded.', submitError:'Could not submit right now. Please try again.',
    view:'View', watch:'▶ Watch Video', chapters:'Chapters & Videos', back:'← Back to Library',
    noVideos:'No videos added yet.', submitting:'Submitting…', bookNotFound:'Book not found.'
  },
  te: {
    brandSub:'ఆధ్యాత్మిక గ్రంథాలయం', navLibrary:'గ్రంథాలయం', navAdmin:'అడ్మిన్', language:'భాష',
    heroTitle:'ఆధ్యాత్మిక జ్ఞానానికి మార్గసేతువు', heroText:'శాస్త్ర గ్రంథాలు, అధ్యాయాలు మరియు వీడియోలను ఒకే చోట చూడండి.',
    browse:'గ్రంథాలయాన్ని చూడండి', interest:'పుస్తకంపై ఆసక్తి తెలియజేయండి', books:'పుస్తకాలు', lib:'ఆధ్యాత్మిక గ్రంథాలయం',
    sub:'మీకు కావలసిన పుస్తకాన్ని ఎంచుకోండి.', search:'పుస్తకాలను వెతకండి...', statusLoading:'గ్రంథాలయం లోడ్ అవుతోంది…',
    noBooks:'ఇంకా పుస్తకాలు జోడించలేదు. అడ్మిన్ ప్యానెల్ ద్వారా పుస్తకాలను సృష్టించవచ్చు.', name:'పేరు',
    mobile:'మొబైల్ నంబర్', email:'ఇమెయిల్', leadLanguage:'భాష', submit:'ఆసక్తిని సమర్పించండి',
    interestTitle:'ఈ పుస్తకంపై మీకు ఆసక్తి ఉందా?', interestText:'మీ వివరాలను పంపండి. ఈ పుస్తకంపై మీ ఆసక్తిని నమోదు చేస్తాము.',
    submitThanks:'ధన్యవాదాలు. మీ ఆసక్తి నమోదు చేయబడింది.', submitError:'ప్రస్తుతం సమర్పించలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.',
    view:'చూడండి', watch:'▶ వీడియో చూడండి', chapters:'అధ్యాయాలు & వీడియోలు', back:'← లైబ్రరీకి తిరిగి వెళ్ళండి',
    noVideos:'ఇంకా వీడియోలు జోడించలేదు.', submitting:'సమర్పిస్తోంది…', bookNotFound:'పుస్తకం కనుగొనబడలేదు.'
  },
  hi: {
    brandSub:'आध्यात्मिक पुस्तकालय', navLibrary:'पुस्तकालय', navAdmin:'एडमिन', language:'भाषा',
    heroTitle:'आध्यात्मिक ज्ञान का सेतु', heroText:'आध्यात्मिक ग्रंथ, अध्याय और वीडियो एक ही स्थान पर देखें।',
    browse:'पुस्तकालय देखें', interest:'इस पुस्तक में मेरी रुचि है', books:'पुस्तकें', lib:'आध्यात्मिक पुस्तकालय',
    sub:'पुस्तक चुनें और देखें।', search:'पुस्तकें खोजें...', statusLoading:'पुस्तकालय लोड हो रहा है…',
    noBooks:'अभी तक कोई पुस्तक नहीं जोड़ी गई है। एडमिन पैनल से पुस्तकें बनाई जा सकती हैं।', name:'नाम',
    mobile:'मोबाइल नंबर', email:'ईमेल', leadLanguage:'भाषा', submit:'रुचि भेजें',
    interestTitle:'इस पुस्तक में मेरी रुचि है', interestText:'अपनी जानकारी भेजें। हम इस पुस्तक में आपकी रुचि दर्ज करेंगे।',
    submitThanks:'धन्यवाद। आपकी रुचि दर्ज कर ली गई है।', submitError:'अभी भेज नहीं सके। कृपया फिर प्रयास करें।',
    view:'देखें', watch:'▶ वीडियो देखें', chapters:'अध्याय और वीडियो', back:'← पुस्तकालय पर वापस जाएँ',
    noVideos:'अभी कोई वीडियो नहीं जोड़ा गया है।', submitting:'जमा किया जा रहा है…', bookNotFound:'पुस्तक नहीं मिली।'
  }
};

export function t(lang: Lang, key: string) { return UI[lang]?.[key] ?? UI.en[key] ?? key; }
export function getStoredLang(): Lang {
  if (typeof window === 'undefined') return 'te';
  const value = localStorage.getItem('shastrasetu_lang');
  return value === 'en' || value === 'hi' || value === 'te' ? value : 'te';
}
export function rowTitle(row: any, lang: Lang) {
  return row?.[`title_${lang}`] || row?.title_te || row?.title_en || row?.title_hi || 'Untitled';
}
export function rowDescription(row: any, lang: Lang) {
  return row?.[`description_${lang}`] || row?.description_te || row?.description_en || row?.description_hi || '';
}
