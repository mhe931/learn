import { SlideData, SlideType } from './types';

export const COURSE_CONTENT: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    title: "Finnish 1 & 2",
    subtitle: "The Complete Fundamentals",
    content: "A comprehensive self-study guide designed for rapid learning. Covers everything from the alphabet to complex verb types and cases.",
    image: "https://images.unsplash.com/photo-1570815791240-e70622df0a5e?q=80&w=2070&auto=format&fit=crop", // Helsinki Cathedral
    funFact: "Finnish is spoken by about 5.8 million people, mostly in Finland, but also in Sweden and parts of Russia."
  },
  {
    id: 2,
    type: SlideType.TABLE_OF_CONTENTS,
    title: "Course Modules",
    subtitle: "Tap to jump to a lesson",
    content: "Navigation Index",
  },
  {
    id: 3,
    type: SlideType.TEXT,
    title: "1. The Alphabet & Sounds",
    subtitle: "Aakkoset ja Ääntäminen",
    content: `
Finnish is strictly phonetic. **One letter = One sound.** Always.

### The Vowels (Vokaalit)
*   **A** - like f**a**ther
*   **E** - like l**e**t
*   **I** - like b**i**t
*   **O** - like h**o**t
*   **U** - like p**u**ll
*   **Y** - like French *t**u*** (Round lips, say "ee")
*   **Ä** - like c**a**t
*   **Ö** - like f**u**r (Round lips, say "ay")

### Double Letters (Kaksoiskonsonantit ja -vokaalit)
Double letters are pronounced **twice as long**. This changes the meaning!
*   **Tuli** (fire) vs. **Tuuli** (wind) vs. **Tulli** (customs)
*   **Kuka** (who) vs. **Kukka** (flower)
    `,
    funFact: "Finnish has no 'Z', 'C', 'Q' or 'W' in native words. They only appear in loanwords!"
  },
  {
    id: 4,
    type: SlideType.VOCABULARY_TABLE,
    title: "2. Greetings",
    subtitle: "Tervehdykset",
    vocabulary: [
      { fi: "Hei / Moi", en: "Hi", note: "Universal" },
      { fi: "Huomenta", en: "Morning", note: "Casual" },
      { fi: "Hyvää päivää", en: "Good day", note: "Formal" },
      { fi: "Mitä kuuluu?", en: "How are you?", note: "Literal: What is heard?" },
      { fi: "Kiitos, hyvää.", en: "Good, thanks.", note: "Reply" },
      { fi: "Entä sinulle?", en: "And you?", note: "Reply" },
      { fi: "Hauska tavata", en: "Nice to meet you", note: "Polite" },
      { fi: "Nähdään", en: "See you", note: "Later" },
      { fi: "Näkemiin", en: "Goodbye", note: "Formal" },
      { fi: "Öitä", en: "Nighty night", note: "Casual" }
    ]
  },
  {
    id: 5,
    type: SlideType.VOCABULARY_TABLE,
    title: "3. Numbers 0-20",
    subtitle: "Numerot",
    vocabulary: [
      { fi: "0 - Nolla", en: "Zero", note: "●" },
      { fi: "1 - Yksi", en: "One", note: "●" },
      { fi: "2 - Kaksi", en: "Two", note: "●" },
      { fi: "3 - Kolme", en: "Three", note: "●" },
      { fi: "4 - Neljä", en: "Four", note: "●" },
      { fi: "5 - Viisi", en: "Five", note: "●" },
      { fi: "6 - Kuusi", en: "Six", note: "●" },
      { fi: "7 - Seitsemän", en: "Seven", note: "●" },
      { fi: "8 - Kahdeksan", en: "Eight", note: "●" },
      { fi: "9 - Yhdeksän", en: "Nine", note: "●" },
      { fi: "10 - Kymmenen", en: "Ten", note: "★" },
      { fi: "11 - Yksitoista", en: "Eleven", note: "1+10" },
      { fi: "12 - Kaksitoista", en: "Twelve", note: "2+10" }
    ],
    funFact: "Numbers 11-19 are literally 'one-of-the-second (ten)', 'two-of-the-second (ten)', etc."
  },
  {
    id: 6,
    type: SlideType.TEXT,
    title: "4. Numbers 20-100",
    subtitle: "Isot Numerot",
    content: `
Counting higher is logical. You combine the number with **-kymmentä** (tens).

### The System
*   **20** = Kaksi + kymmentä -> **Kaksikymmentä**
*   **21** = Kaksikymmentä + yksi -> **Kaksikymmentäyksi**
*   **30** = Kolmekymmentä
*   **35** = Kolmekymmentäviisi
*   **50** = Viisikymmentä
*   **99** = Yhdeksänkymmentäyhdeksän
*   **100** = Sata

### Key Difference
*   **Kymmenen** = 10
*   **Kymmentä** = Tens (Partitive plural used for multiples of ten)
    `
  },
  {
    id: 7,
    type: SlideType.IMAGE_TEXT,
    title: "5. Pronouns (Persoonapronominit)",
    subtitle: "Me, You, Them",
    content: `
Finnish pronouns are gender-free. **Hän** means both "He" and "She".

**Singular**
*   **Minä** (Mä) = I
*   **Sinä** (Sä) = You
*   **Hän** (Se) = He/She (Se = It, often used for people in spoken slang)

**Plural**
*   **Me** = We
*   **Te** = You (plural)
*   **He** (Ne) = They

*(Spoken forms like Mä/Sä are used 90% of the time in conversation!)*
    `,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" // Group of people
  },
  {
    id: 8,
    type: SlideType.GRAMMAR_CARD,
    title: "6. Verb 'Olla' (To Be)",
    subtitle: "The most fundamental verb",
    content: "The verb 'to be' is irregular. Memorize this first.",
    grammarPoints: [
      { rule: "Minä olen", example: "Minä olen opiskelija.", translation: "I am a student." },
      { rule: "Sinä olet", example: "Oletko sinä suomalainen?", translation: "Are you Finnish?" },
      { rule: "Hän on", example: "Hän on iloinen.", translation: "He/She is happy." },
      { rule: "Me olemme", example: "Me olemme kotona.", translation: "We are at home." },
      { rule: "Te olette", example: "Te olette myöhässä.", translation: "You (pl) are late." },
      { rule: "He ovat", example: "He ovat täällä.", translation: "They are here." },
    ],
    funFact: "In spoken Finnish: Mä oon, Sä oot, Se on, Me ollaan, Te ootte, Ne on."
  },
  {
    id: 9,
    type: SlideType.GRAMMAR_CARD,
    title: "7. Negative 'Olla' (Not to be)",
    subtitle: "Ei ole (Is not)",
    content: "In Finnish, the negation word 'Ei' conjugates like a verb!",
    grammarPoints: [
      { rule: "Minä en ole", example: "En ole lääkäri.", translation: "I am not a doctor." },
      { rule: "Sinä et ole", example: "Et ole yksin.", translation: "You are not alone." },
      { rule: "Hän ei ole", example: "Hän ei ole kotona.", translation: "He/She is not home." },
      { rule: "Me emme ole", example: "Emme ole valmiita.", translation: "We are not ready." },
      { rule: "Te ette ole", example: "Ette ole väsyneitä.", translation: "You are not tired." },
      { rule: "He eivät ole", example: "Eivät ole täällä.", translation: "They are not here." },
    ]
  },
  {
    id: 10,
    type: SlideType.VOCABULARY_TABLE,
    title: "8. Countries & Languages",
    subtitle: "Maat ja Kielet",
    vocabulary: [
      { fi: "Suomi / Suomalainen", en: "Finland / Finnish (person/adj)", note: "-lainen" },
      { fi: "Englanti / Englantilainen", en: "England / English", note: "-lainen" },
      { fi: "Ruotsi / Ruotsalainen", en: "Sweden / Swedish", note: "-lainen" },
      { fi: "Saksa / Saksalainen", en: "Germany / German", note: "-lainen" },
      { fi: "Ranska / Ranskalainen", en: "France / French", note: "-lainen" },
      { fi: "Venäjä / Venäläinen", en: "Russia / Russian", note: "-lainen" },
      { fi: "Puhun suomea", en: "I speak Finnish", note: "Language is lowercase" }
    ],
    funFact: "Countries are capitalized, languages and nationalities are NOT capitalized in Finnish!"
  },
  {
    id: 11,
    type: SlideType.IMAGE_TEXT,
    title: "9. Vowel Harmony",
    subtitle: "Vokaalisointu",
    content: `
This rule dictates which suffixes you can add to a word (like -ssa vs -ssä).

**Group A (Back): A, O, U**
If a word has these, the ending uses **A, O, U**.
*   *Talo* -> Talo**ssa** (In the house)

**Group B (Front): Ä, Ö, Y**
If a word has these, the ending uses **Ä, Ö, Y**.
*   *Työ* -> Työ**ssä** (At work)

**Group C (Neutral): E, I**
If a word ONLY has E or I, it usually takes **Ä, Ö, Y** endings.
*   *Tie* -> Tie**llä** (On the road)
    `,
    image: "https://images.unsplash.com/photo-1529651107496-77ce85d7e8c2?q=80&w=2000&auto=format&fit=crop" // Clean graphical abstract
  },
  {
    id: 12,
    type: SlideType.TEXT,
    title: "10. Question Words",
    subtitle: "Kysymyssanat",
    content: `
Start your sentence with these to ask a question.

*   **Mitä?** - What? (*Mitä tämä on?* - What is this?)
*   **Missä?** - Where? (*Missä sinä asut?* - Where do you live?)
*   **Mistä?** - Where from? (*Mistä olet kotoisin?* - Where are you from?)
*   **Kuka?** - Who? (*Kuka tuo on?* - Who is that?)
*   **Miksi?** - Why?
*   **Milloin?** - When?
*   **Miten?** - How?
*   **Paljonko?** - How much?

**The -ko/kö Suffix**
Turn any verb into a yes/no question by adding -ko/kö and moving it to the front.
*   *Sinä asut täällä.* (You live here.)
*   *Asut**ko** sinä täällä?* (Do you live here?)
    `
  },
  {
    id: 13,
    type: SlideType.GRAMMAR_CARD,
    title: "11. Verb Type 1 (-A/-Ä)",
    subtitle: "Verbityyppi 1",
    content: "Verbs ending in 2 vowels. Remove the final -a/-ä to get the stem.",
    grammarPoints: [
      { rule: "Infinitive: Puhua", example: "Stem: Puhu-", translation: "To speak" },
      { rule: "Minä -n", example: "Puhu**n**", translation: "I speak" },
      { rule: "Sinä -t", example: "Puhu**t**", translation: "You speak" },
      { rule: "Hän [long vowel]", example: "Puhu**u**", translation: "He/She speaks" },
      { rule: "Me -mme", example: "Puhu**mme**", translation: "We speak" },
      { rule: "Te -tte", example: "Puhu**tte**", translation: "You speak" },
      { rule: "He -vat", example: "Puhu**vat**", translation: "They speak" },
    ],
    funFact: "Common Type 1 verbs: Asua (live), Sanoa (say), Ostaa (buy), Maksaa (pay/cost)."
  },
  {
    id: 14,
    type: SlideType.GRAMMAR_CARD,
    title: "12. Verb Type 2 (-DA/-DÄ)",
    subtitle: "Verbityyppi 2",
    content: "Verbs ending in -da/-dä. Remove the -da/-dä to get the stem.",
    grammarPoints: [
      { rule: "Infinitive: Juoda", example: "Stem: Juo-", translation: "To drink" },
      { rule: "Minä -n", example: "Juo**n**", translation: "I drink" },
      { rule: "Sinä -t", example: "Juo**t**", translation: "You drink" },
      { rule: "Hän [nothing!]", example: "Hän **juo**", translation: "He/She drinks" },
      { rule: "Me -mme", example: "Juo**mme**", translation: "We drink" },
      { rule: "Te -tte", example: "Juo**tte**", translation: "You drink" },
      { rule: "He -vat", example: "Juo**vat**", translation: "They drink" },
    ],
    funFact: "Common Type 2 verbs: Syödä (eat), Tehdä (do/make), Käydä (visit)."
  },
  {
    id: 15,
    type: SlideType.VOCABULARY_TABLE,
    title: "13. Genitive Case (-n)",
    subtitle: "Omistus (Possession)",
    vocabulary: [
      { fi: "Talo -> Talon", en: "The house's", note: "+n" },
      { fi: "Auto -> Auton", en: "The car's", note: "+n" },
      { fi: "Minun", en: "My / Mine", note: "Minä -> Minun" },
      { fi: "Sinun", en: "Your / Yours", note: "Sinä -> Sinun" },
      { fi: "Hänen", en: "His / Hers", note: "Hän -> Hänen" },
      { fi: "Meidän", en: "Our", note: "Me -> Meidän" },
      { fi: "Teidän", en: "Your (pl)", note: "Te -> Teidän" },
      { fi: "Heidän", en: "Their", note: "He -> Heidän" },
      { fi: "Kenen?", en: "Whose?", note: "Question word" }
    ],
    funFact: "We also use Genitive with postpositions: 'Pöydän alla' (Under the table - literally: Table's under)."
  },
  {
    id: 16,
    type: SlideType.IMAGE_TEXT,
    title: "14. Partitive Case (-a/-ä)",
    subtitle: "Partitiivi (Uncountable/Ongoing)",
    content: `
The Partitive is unique to Finnish. It is used for "undefined amounts" or "ongoing actions".

**Use Partitive when:**
1.  **After numbers** (except 1):
    *   *Kaksi auto**a*** (Two cars)
    *   *Kolme olut**ta*** (Three beers)
2.  **With mass nouns** (food, liquid):
    *   *Juon kahvi**a*** (I am drinking coffee)
3.  **In negative sentences**:
    *   *Minulla ei ole auto**a*** (I don't have a car)
4.  **Greetings**:
    *   *Hyvää huomen**ta*** (Good morning)
    `,
    image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=2070&auto=format&fit=crop" // Pizza/Food
  },
  {
    id: 17,
    type: SlideType.TEXT,
    title: "15. Consonant Gradation (KPT)",
    subtitle: "Astevaihtelu (The Tricky Part)",
    content: `
Consonants K, P, and T often change when you add an ending (like -n, -ssa).
They go from **Strong** (Basic form) to **Weak** (Conjugated).

**Common Changes:**
*   **KK -> K**: *Pankki -> Pankissa* (In the bank)
*   **PP -> P**: *Kauppa -> Kaupassa* (In the shop)
*   **TT -> T**: *Katton -> Katolla* (On the roof)
*   **K -> -**: *Jalka -> Jalan* (Foot -> Foot's)
*   **P -> V**: *Apua -> Avun* (Help -> Help's)
*   **T -> D**: *Pöytä -> Pöydän* (Table -> Table's)
*   **NK -> NG**: *Helsinki -> Helsingissä*

**Exceptions:**
Some verb types and names don't change, but this rule covers 90% of nouns.
    `
  },
  {
    id: 18,
    type: SlideType.VOCABULARY_TABLE,
    title: "16. Location Cases",
    subtitle: "Missä? Mistä? Mihin?",
    vocabulary: [
      { fi: "Talo-ssa", en: "In the house", note: "Ine (In)" },
      { fi: "Talo-sta", en: "From the house", note: "Ela (From in)" },
      { fi: "Talo-on", en: "Into the house", note: "Ill (Into)" },
      { fi: "Pöydä-llä", en: "On the table", note: "Ade (On)" },
      { fi: "Pöydä-ltä", en: "From the table", note: "Abl (From on)" },
      { fi: "Pöydä-lle", en: "Onto the table", note: "All (Onto)" },
      { fi: "Koulu-ssa", en: "At school", note: "Inside" },
      { fi: "Töi-ssä", en: "At work", note: "Inside" }
    ]
  },
  {
    id: 19,
    type: SlideType.VOCABULARY_TABLE,
    title: "17. Family",
    subtitle: "Perhe",
    vocabulary: [
      { fi: "Äiti", en: "Mother", note: "" },
      { fi: "Isä", en: "Father", note: "" },
      { fi: "Sisko", en: "Sister", note: "" },
      { fi: "Veli", en: "Brother", note: "" },
      { fi: "Tytär", en: "Daughter", note: "" },
      { fi: "Poika", en: "Son / Boy", note: "" },
      { fi: "Vaimo", en: "Wife", note: "" },
      { fi: "Mies", en: "Husband / Man", note: "" },
      { fi: "Mummo", en: "Grandma", note: "" },
      { fi: "Ukki / Pappa", en: "Grandpa", note: "" }
    ]
  },
  {
    id: 20,
    type: SlideType.VOCABULARY_TABLE,
    title: "18. Days & Time",
    subtitle: "Aika",
    vocabulary: [
      { fi: "Maanantai", en: "Monday", note: "MA" },
      { fi: "Tiistai", en: "Tuesday", note: "TI" },
      { fi: "Keskiviikko", en: "Wednesday", note: "KE" },
      { fi: "Torstai", en: "Thursday", note: "TO" },
      { fi: "Perjantai", en: "Friday", note: "PE" },
      { fi: "Lauantai", en: "Saturday", note: "LA" },
      { fi: "Sunnuntai", en: "Sunday", note: "SU" },
      { fi: "Tänään", en: "Today", note: "" },
      { fi: "Huomenna", en: "Tomorrow", note: "" },
      { fi: "Eilen", en: "Yesterday", note: "" }
    ]
  },
  {
    id: 21,
    type: SlideType.TITLE,
    title: "Onnittelut!",
    subtitle: "End of Course",
    content: "You have completed the Finnish 1 & 2 fundamentals module. You now have the tools to form sentences, conjugate verbs, and navigate basic situations.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1974&auto=format&fit=crop", // Lake
    funFact: "Practice makes perfect. Try reading simple news at 'Yle Uutiset Selkosuomeksi' (Yle News in Simple Finnish)."
  }
];