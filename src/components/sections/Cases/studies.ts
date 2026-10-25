import type { ImageMetadata } from "astro";
import theMoment from "@/assets/cases/the-moment.webp";
import pluginPoetry from "@/assets/cases/plugin-poetry.webp";
import pluginSparkly from "@/assets/cases/plugin-sparkly.webp";
import heartlandGlamping from "@/assets/cases/heartland-glamping.webp";
import heartlandFestival from "@/assets/cases/heartland-festival.webp";
import wonHundred from "@/assets/cases/won-hundred.webp";
import camilleBrinch from "@/assets/cases/camille-brinch.webp";
import julefuglen from "@/assets/cases/julefuglen.webp";
import drawingRoom from "@/assets/cases/drawing-room.webp";
import concha from "@/assets/cases/concha.webp";
import gumi from "@/assets/cases/gumi.webp";

export interface CaseFact {
  value: string;
  label: string;
}

export interface CaseStep {
  title: string;
  text: string;
}

export interface CaseStudy {
  slug: string;
  brand: string;
  withName: string;
  place: string;
  headline: string;
  headlineItalic: string;
  summary: string;
  outcome: string;
  caption: string;
  detail: string;
  image?: ImageMetadata;
  imageAlt: string;
  quote?: string;
  attribution?: string;
  facts?: CaseFact[];
  steps?: CaseStep[];
}

export const studies: CaseStudy[] = [
  {
    slug: "radisson",
    brand: "Radisson Collection",
    withName: "Stefan Airinei",
    place: "Copenhagen · 22 November 2024",
    headline: "Radisson opened its doors.",
    headlineItalic: "We brought the crowd.",
    summary:
      "An icon of Danish design, a new creative gathering. FORMA brought together a curated mix of creators and musicians at Radisson Collection Royal Hotel, moving from Arne Jacobsen’s suite to live performances above the city and dinner at ISSEI.",
    outcome: "Every guest shared stories, introducing their audiences to Radisson as a place to dine, drink and experience Copenhagen.",
    caption: "Uro at the Royal",
    detail: "An evening inside Danish design. With Uro among the guests.",
    imageAlt: "Uro, Danish music artist, at Radisson Collection Royal Hotel.",
    quote: "“A great evening with good people and a warm atmosphere. Beautifully brought together by FORMA.”",
    attribution: "Stefan Airinei · Hotel Operations Manager, Radisson Collection",
    facts: [
      { value: "20", label: "At dinner" },
      { value: "20", label: "For drinks" },
      { value: "40", label: "Guests" },
    ],
    steps: [
      { title: "Discover.", text: "Champagne, live music and a tour of Arne Jacobsen’s suite." },
      { title: "Dine.", text: "Dinner at ISSEI, followed by lounge drinks and DJ MAXNER." },
      { title: "Continue.", text: "Transfers to Søpavillonen for the rest of the night." },
    ],
  },
  {
    slug: "the-moment",
    brand: "The Moment",
    withName: "Arman Khaki",
    place: "Lisbon · 22–23 May 2025",
    headline: "The Moment in Lisbon.",
    headlineItalic: "The right local connection.",
    summary:
      "The Moment had the experience. FORMA found the local connection, matching Diogo Duarte’s Portuguese audience with The Moment × Yard in Lisbon and simplifying the collaboration from introduction to invitation.",
    outcome: "Diogo’s post and stories sparked interest among his followers in attending the next The Moment festival.",
    caption: "The Moment × Yard",
    detail: "Lisbon at sunset. Music into the night.",
    image: theMoment,
    imageAlt: "A DJ behind the decks at sunset, beneath YARD and THE MOMENT signs.",
    facts: [
      { value: "8,319", label: "Likes" },
      { value: "37", label: "Comments" },
      { value: "20", label: "Sends" },
    ],
    steps: [
      { title: "Match.", text: "Find a Portuguese creator whose audience fits The Moment." },
      { title: "Connect.", text: "Introduce Diogo and coordinate the invitation." },
    ],
  },
  {
    slug: "plugin-poetry",
    brand: "Plugin Heat Club",
    withName: "Hjalte Emilio Wieth",
    place: "Amager · 2 September 2025",
    headline: "Saunagus at Plugin.",
    headlineItalic: "Poetry in the heat.",
    summary:
      "Poetry, heat and a curated crowd. FORMA brought 45 profiles to Plugin Heat Club, pairing Ephraim’s live performance with guided saunagus and bringing brand partners into the experience.",
    outcome: "A different side of saunagus, bringing Plugin’s mix of heat, music and poetry to a wider audience.",
    caption: "Cooling off at Plugin",
    detail: "Heat, poetry and presence. A shared pause at Plugin.",
    image: pluginPoetry,
    imageAlt: "Guests cooling off under outdoor showers at Plugin.",
    facts: [{ value: "45", label: "Guests" }],
    steps: [
      { title: "Curate.", text: "Bring together 45 profiles suited to Plugin." },
      { title: "Create.", text: "Arrange live poetry, guided saunagus and brand partners." },
      { title: "Share.", text: "Guests share the experience through stories." },
    ],
  },
  {
    slug: "plugin-sparkly",
    brand: "Plugin Heat Club",
    withName: "Camille Brinch",
    place: "Amager · September 2025",
    headline: "Camille Brinch’s Sparkly collection.",
    headlineItalic: "A first look at Plugin.",
    summary:
      "Steam, sparkle and a first look. Ahead of Camille Brinch’s Sparkly collection launch at Søpavillonen, FORMA brought the preview to Plugin Heat Club, arranging the saunagus, brand partners and guest list.",
    outcome: "Guest stories offered a first look at Sparkly, building anticipation for the collection launch.",
    caption: "A little Sparkle at Plugin",
    detail: "A sunny gathering at Plugin. Ahead of the Sparkly launch.",
    image: pluginSparkly,
    imageAlt: "Two guests sharing a sunny moment over drinks at Plugin.",
    facts: [
      { value: "45", label: "Guests" },
      { value: "25", label: "At the launch" },
    ],
    steps: [
      { title: "Curate.", text: "Bring together 45 guests for the Sparkly preview." },
      { title: "Preview.", text: "Arrange saunagus and brand partners at Plugin." },
      { title: "Build anticipation.", text: "Guest stories lead into the launch at Søpavillonen." },
    ],
  },
  {
    slug: "heartland-glamping",
    brand: "Heartland",
    withName: "Emil Thorup",
    place: "Heartland Festival · 2025",
    headline: "Heartland with Emil Thorup.",
    headlineItalic: "The glamping experience.",
    summary:
      "Festival days, glamping nights. FORMA connected Heartland with Emil Thorup and his wife to showcase its glamping experience, coordinating their stay, festival access and content agreement.",
    outcome: "Emil shared one post and three stories showcasing Heartland’s glamping experience.",
    caption: "Glamping at Heartland",
    detail: "Festival days. A place to slow down.",
    image: heartlandGlamping,
    imageAlt: "Bell tents and chairs in Heartland’s glamping area.",
    facts: [
      { value: "1", label: "Post" },
      { value: "3", label: "Stories" },
      { value: "2", label: "Guests" },
    ],
    steps: [
      { title: "Match.", text: "Connect Heartland with Emil Thorup." },
      { title: "Coordinate.", text: "Arrange the stay, festival access and content agreement." },
      { title: "Share.", text: "Showcase the glamping experience through one post and three stories." },
    ],
  },
  {
    slug: "heartland-festival",
    brand: "Heartland",
    withName: "Bar Moro",
    place: "Copenhagen and Egeskov · Heartland 2025",
    headline: "Breakfast at Bar Moro.",
    headlineItalic: "Next stop, Heartland.",
    summary:
      "From breakfast at Bar Moro to a day at Heartland. FORMA hosted 45 curated guests, including Laila Hasanovic, Emilia Silberg and Emily Sindlev, bringing together transport, festival access and a partnership with 1664.",
    outcome: "Heartland through the eyes of 45 curated guests, with partner visibility across their stories and festival posts.",
    caption: "Emilia Silberg at Heartland",
    detail: "Egeskov Castle as the backdrop. A day together at Heartland.",
    image: heartlandFestival,
    imageAlt: "Emilia Silberg in front of Egeskov Castle at Heartland Festival.",
    quote:
      "“We had a great time hosting the FORMA group, loved the content they shared and look forward to welcoming them back next year.”",
    attribution: "Sarah · Director of Communications, Heartland",
    facts: [{ value: "45", label: "Guests" }],
    steps: [
      { title: "Gather.", text: "Breakfast together at Bar Moro." },
      { title: "Travel.", text: "Coordinated transport and festival access." },
      { title: "Experience.", text: "A day at Heartland with 1664 as a partner." },
    ],
  },
  {
    slug: "won-hundred",
    brand: "Won Hundred",
    withName: "Oliver Benborg",
    place: "Copenhagen Fashion Week · 2025",
    headline: "Won Hundred’s fashion show.",
    headlineItalic: "From front row to afterparty.",
    summary:
      "From the front row to the afterparty. FORMA curated Won Hundred’s show guests, arranged personal styling and full outfits for two profiles, and invited all show attendees to the official afterparty.",
    outcome: "An audience curated for Won Hundred, from leading influencers in the front row to guests at the afterparty.",
    caption: "Backstage at Won Hundred",
    detail: "Before the runway. Behind the scenes at Copenhagen Fashion Week.",
    image: wonHundred,
    imageAlt: "A backstage moment at Won Hundred, with a guest in a light knit.",
    quote: "“forma helped us meet our deadline efficiently, connecting us with the right profiles in a way that felt effortless.”",
    attribution: "Oliver Benborg · Art Director, Won Hundred",
    facts: [
      { value: "80", label: "Guests" },
      { value: "15", label: "Front row" },
      { value: "2", label: "Styled" },
    ],
    steps: [
      { title: "Curate.", text: "Bring together 80 guests, including 15 front-row profiles." },
      { title: "Style.", text: "Arrange personal styling and full show outfits for two profiles." },
      { title: "Continue.", text: "Invite all show attendees to the official afterparty." },
    ],
  },
  {
    slug: "camille-brinch",
    brand: "Camille Brinch",
    withName: "Sparkly & Zebra",
    place: "Søpavillonen, Copenhagen · September 2026",
    headline: "Camille Brinch’s new collections.",
    headlineItalic: "Dinner, then the dancefloor.",
    summary:
      "Two collections, two nights at Babylon and Natten. FORMA co-hosted Camille Brinch’s Sparkly and Zebra launches, curating the guests and arranging dinner, entertainment, a tattoo artist and tooth gems.",
    outcome: "Both collections reached guests’ audiences through stories shared throughout the launch evenings.",
    caption: "Celebrating Sparkly & Zebra",
    detail: "Two collections, two evenings. Dinner before the dancefloor.",
    image: camilleBrinch,
    imageAlt: "Guests toasting with cocktails over a zebra-patterned dinner table, with jewellery visible.",
    facts: [
      { value: "2", label: "Launches" },
      { value: "30–40", label: "Guests each" },
    ],
    steps: [
      { title: "Curate.", text: "Bring together 30–40 dinner guests for each launch." },
      { title: "Celebrate.", text: "Dinner, jewellery, tattoos and tooth gems." },
      { title: "Continue.", text: "Take the celebration to the dancefloor at Natten." },
    ],
  },
  {
    slug: "julefuglen",
    brand: "Røde Kors",
    withName: "Julefuglen",
    place: "Nørrebro, Copenhagen · Christmas 2025",
    headline: "Julefuglen’s first Christmas.",
    headlineItalic: "52 families received gifts.",
    summary:
      "Gifts sitting unused became Christmas presents for 52 families. FORMA created Julefuglen, uniting 30 profiles, Jakodan, Lucie Kaas and Røde Kors to collect 400+ products, handling the concept, partnerships and logistics through to handover.",
    outcome: "Together with Røde Kors, Julefuglen gave 52 families a box of Christmas gifts and a Christmas tree.",
    caption: "Julefuglen arrives at Røde Kors",
    detail: "A little bird. A shared effort. Christmas gifts for 52 families.",
    image: julefuglen,
    imageAlt: "The wooden Julefugl on a gift box outside Røde Kors’ Nørrebro network house.",
    quote:
      "“We wanted to give children something to unwrap at Christmas. Julefuglen brought people together to make that happen—one box, one contribution at a time.”",
    attribution: "Sammi Bajuni · Co-founder, FORMA",
    facts: [
      { value: "30", label: "Profiles" },
      { value: "400+", label: "Gifts" },
      { value: "52", label: "Families" },
    ],
    steps: [
      { title: "Send.", text: "Empty gift boxes, a wooden bird and an invitation to do your part." },
      { title: "Collect.", text: "Profiles fill the boxes with new, unused products." },
      { title: "Give.", text: "Røde Kors distributes gift boxes and Christmas trees to 52 families." },
    ],
  },
  {
    slug: "drawing-room",
    brand: "3daysofdesign",
    withName: "Secolo × Tableau",
    place: "Copenhagen · June 2026",
    headline: "3daysofdesign with Secolo × Tableau.",
    headlineItalic: "Social dinner, then the afterparty.",
    summary:
      "3daysofdesign brought the creative community together at The Drawing Room with Secolo and Tableau. FORMA co-hosted from start to finish, across guests, venue and social dinner, through to the official 3DD afterparty at Søpavillonen.",
    outcome: "The Drawing Room became a meeting place for design, food and the creative community during 3daysofdesign.",
    caption: "3daysofdesign at The Drawing Room",
    detail: "A social dinner with Secolo and Tableau. Part of 3daysofdesign.",
    image: drawingRoom,
    imageAlt: "Guests gathered in The Drawing Room, listening to speakers and capturing the moment.",
    facts: [
      { value: "60", label: "At dinner" },
      { value: "100", label: "Afterparty" },
    ],
    steps: [
      { title: "Gather.", text: "Welcome 60 guests to The Drawing Room during 3daysofdesign." },
      { title: "Dine.", text: "A social dinner with Secolo and Tableau." },
      { title: "Continue.", text: "Join 100 more guests at the official 3DD afterparty at Søpavillonen." },
    ],
  },
  {
    slug: "concha",
    brand: "Concha",
    withName: "Qasim Khan",
    place: "Christianshavn · 15 October 2026",
    headline: "Introducing Concha.",
    headlineItalic: "Great food. Great company.",
    summary:
      "A new chapter from the team behind Donda. FORMA curated the guest list for Concha’s opening, bringing together familiar faces from Copenhagen’s creative community.",
    outcome: "Great food, familiar faces and content that put Concha on Copenhagen’s radar.",
    caption: "An evening at Concha",
    detail: "Great food. Great company. Celebrating Concha in Christianshavn.",
    image: concha,
    imageAlt: "Guests chatting over drinks outside Concha beneath the restaurant sign.",
    quote: "“wonderful evening”",
    attribution: "Qasim Khan · Owner and Head Chef, Concha",
    facts: [
      { value: "38", label: "Guests" },
      { value: "40,000", label: "Views" },
      { value: "51", label: "Sends" },
    ],
  },
  {
    slug: "gumi",
    brand: "GUMI",
    withName: "Sukaiba",
    place: "Copenhagen Fashion Week · 2025",
    headline: "Fashion Week with Gumi.",
    headlineItalic: "Dinner above Copenhagen.",
    summary:
      "GUMI and FORMA reunited during Copenhagen Fashion Week for a private dinner at Sukaiba overlooking the city, before 1STLIMO SERVICE took guests to Søpavillonen.",
    outcome: "A private dinner above Copenhagen, followed by a night at Søpavillonen with GUMI and FORMA.",
    caption: "GUMI & FORMA at Sukaiba",
    detail: "A private dinner above the city. Fashion Week with friends.",
    image: gumi,
    imageAlt: "Two guests posing beside the dinner table at Sukaiba, one wearing sunglasses and holding a cocktail.",
    facts: [
      { value: "35", label: "Guests" },
      { value: "2", label: "Sprinters" },
    ],
    steps: [
      { title: "Dine.", text: "A private dinner overlooking Copenhagen at Sukaiba." },
      { title: "Transfer.", text: "Two Sprinters provided by 1STLIMO SERVICE." },
      { title: "Continue.", text: "An afterparty at Søpavillonen." },
    ],
  },
];
