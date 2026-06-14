/*
  OUTLETS — single source of truth for all three Godwit locations.
  ---------------------------------------------------------------
  Contact details below are RESEARCHED SNAPSHOTS used as defaults and
  for fallback rendering. They are marked `// TODO: confirm` where the
  public listings conflict. The user will paste confirmed values, and
  the live Google Places API overrides address / hours / phone / rating
  / reviews at runtime once GOOGLE_PLACES_API_KEY + place IDs are set.
*/

import type { OutletId } from "./themes";

export interface Photo {
  /** Real image path under /public. When absent, a themed placeholder renders. */
  src?: string;
  alt: string;
}

export interface Dish {
  name: string;
  blurb: string;
  /** small overline label, e.g. "Signature", "Most loved" */
  tag?: string;
  photo: Photo;
}

export interface OrderLink {
  label: string;
  // TODO: replace "#" with the real per-outlet deep link
  href: string;
}

export interface Outlet {
  id: OutletId;
  city: string;
  /** full brand name for titles/JSON-LD */
  name: string;
  /** short positioning chip, e.g. "The Flagship" */
  positioning: string;
  /** one-line hero tagline, city-specific */
  tagline: string;
  /** vibe/about paragraph (genuine, review-informed) */
  about: string;

  // --- contact (// TODO: confirm — conflicting public listings) ---
  address: string;
  area: string;
  phone: string; // "" when unknown
  hours: string; // human-readable; live API overrides
  costForTwo?: string;

  // --- google ---
  // TODO: place_id — paste each outlet's Google Place ID here, or resolve
  // via a Find Place request (see README). Empty string → fallback JSON only.
  mapsPlaceId: string;
  /** Google Maps profile/share URL — used for "Read all on Google" + directions */
  mapsUrl: string;
  // TODO: confirm exact lat/lng (used for JSON-LD geo + map fallback)
  geo: { lat: number; lng: number };

  signatureDishes: Dish[];
  gallery: Photo[];
  orderLinks: OrderLink[];
  instagram: string;
}

// Shared across all outlets — // TODO: replace "#" with real outlet deep links
const orderLinks = (): OrderLink[] => [
  { label: "Swiggy Dineout", href: "#" },
  { label: "EazyDiner", href: "#" },
  { label: "Zomato", href: "#" },
  { label: "District", href: "#" },
  { label: "magicpin", href: "#" },
];

const INSTAGRAM = "https://www.instagram.com/godwitcafe/";

export const outlets: Record<OutletId, Outlet> = {
  // =============================================================
  // INDORE — flagship / origin
  // =============================================================
  indore: {
    id: "indore",
    city: "Indore",
    name: "Godwit Cafe — Indore",
    positioning: "The Flagship",
    tagline: "Where the wander began.",
    about:
      "The original perch. Born in Indore and still the busiest table in the city — a premium-yet-cozy room with an open kitchen, bright pop colour, and a pure-veg menu that turned a neighbourhood favourite into a flagship. Equally at home for a laptop afternoon, a long catch-up, or a date night.",
    // TODO: confirm — a Geeta Bhavan-area listing also exists
    address:
      "101-102-103 & 104, Sanjana Park, Bicholi Mardana Main Rd, By Pass Road (North), Scheme No. 140, Indore, Madhya Pradesh 452016",
    area: "Scheme 140, By Pass Road",
    phone: "+91 91278 80000",
    hours: "12:00 PM – 12:00 AM", // TODO: verify
    mapsPlaceId: "", // TODO: place_id
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Godwit+Cafe+Indore",
    geo: { lat: 22.7196, lng: 75.8577 }, // TODO: confirm exact
    signatureDishes: [
      {
        name: "Vada Pav Fondue",
        tag: "Signature",
        blurb:
          "Street-food legend, reimagined — pull-apart vada pav with a molten cheese fondue for dunking.",
        photo: { alt: "Vada pav fondue with molten cheese dip" },
      },
      {
        name: "Lotus Biscoff Shake",
        tag: "Most loved",
        blurb: "Thick, dreamy, caramelised-biscuit shake crowned with cream and crumble.",
        photo: { alt: "Lotus Biscoff shake topped with cream and crumble" },
      },
      {
        name: "Chaat Platter",
        blurb: "A tasting flight of Indore street chaat, plated with a twist.",
        photo: { alt: "Assorted Indian chaat tasting platter" },
      },
      {
        name: "Loaded Veg Pizza",
        blurb: "All-veg, generously loaded, wood-fired crust.",
        photo: { alt: "Loaded vegetarian pizza" },
      },
      {
        name: "Sizzler",
        tag: "Chef's pick",
        blurb: "A theatrical, smoke-rising veg sizzler on a cast-iron plate.",
        photo: { alt: "Vegetarian sizzler steaming on a hot plate" },
      },
      {
        name: "Black Rice Khichdi",
        blurb: "Antioxidant-rich black rice, comfort-cooked and richly spiced.",
        photo: { alt: "Black rice khichdi bowl" },
      },
      {
        name: "Malai Broccoli Tikka",
        blurb: "Char-kissed broccoli in a creamy, mildly spiced malai marinade.",
        photo: { alt: "Char-grilled malai broccoli tikka" },
      },
      {
        name: "Blueberry Cheesecake",
        blurb: "Silky baked cheesecake under a glossy blueberry ripple.",
        photo: { alt: "Slice of blueberry cheesecake" },
      },
    ],
    gallery: [
      { alt: "Godwit Indore — open kitchen and counter" },
      { alt: "Godwit Indore — cosy seating with pop colour" },
      { alt: "Godwit Indore — plated signature dish" },
      { alt: "Godwit Indore — cafe ambience by evening light" },
    ],
    orderLinks: orderLinks(),
    instagram: INSTAGRAM,
  },

  // =============================================================
  // RAIPUR — explorer's table
  // =============================================================
  raipur: {
    id: "raipur",
    city: "Raipur",
    name: "Godwit Cafe — Raipur",
    positioning: "The Explorer's Table",
    tagline: "Originally from Indore. Now wandering Raipur.",
    about:
      "An all-day pure-veg diner on Kanki Highstreet, right beside Shoppers Stop in Pandri. Godwit Raipur plates global comfort food — oriental, continental and Indian — alongside fresh coffee, cookies and tea cakes, in a warm modern room that suits a work lunch, a celebration, or a long, lazy catch-up. Jain options on request.",
    address:
      "Ward No 24, Kanki Highstreet, PH No 109, beside Shoppers Stop, Pandri Tarai, Govind Nagar, Raipur, Chhattisgarh 492004",
    area: "Kanki Highstreet, beside Shoppers Stop",
    phone: "+91 92946 10000",
    hours: "11:00 AM – 11:00 PM", // TODO: confirm
    mapsPlaceId: "", // TODO: place_id
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Godwit+Cafe+Kanki+Highstreet+Pandri+Raipur",
    geo: { lat: 21.2497, lng: 81.6586 }, // TODO: confirm exact (Pandri / Govind Nagar)
    signatureDishes: [
      {
        name: "Signature Coffee",
        tag: "Cafe",
        blurb: "Slow-pulled and full-bodied — the heart of an all-day cafe.",
        photo: { alt: "Cup of Godwit signature coffee" },
      },
      {
        name: "Mr. Mateos Arancini",
        tag: "Signature",
        blurb:
          "Risotto-stuffed, golden-fried arancini with a cheese crisp and bright pomodoro.",
        photo: { alt: "Risotto arancini with pomodoro sauce" },
      },
      {
        name: "Burmese Khow Suey",
        tag: "Chef's pick",
        blurb: "Coconut-rich noodle bowl with a table of crunchy condiments.",
        photo: { alt: "Burmese khow suey noodle bowl with condiments" },
      },
      {
        name: "KungFu Rolls",
        blurb: "Crisp-wrapped, saucy Indo-Chinese rolls with real punch.",
        photo: { alt: "Indo-Chinese KungFu rolls" },
      },
      {
        name: "Hummus Platter",
        blurb: "Silky hummus, warm pita, olives and crudités — mezze done right.",
        photo: { alt: "Hummus mezze platter with pita" },
      },
      {
        name: "Tea Cakes",
        tag: "Bakery",
        blurb: "Soft, buttery loaf cakes baked fresh for chai o'clock.",
        photo: { alt: "Assorted fresh-baked tea cakes" },
      },
      {
        name: "Fresh-Baked Cookies",
        tag: "Bakery",
        blurb: "Warm, chunky cookies straight from the oven.",
        photo: { alt: "Fresh-baked cookies on a tray" },
      },
      {
        name: "Belgian Chocolate Jar",
        blurb: "Layered dark-chocolate dessert in a jar, deeply indulgent.",
        photo: { alt: "Belgian chocolate dessert jar" },
      },
    ],
    gallery: [
      { alt: "Godwit Raipur — Kanki Highstreet cafe interior" },
      { alt: "Godwit Raipur — warm all-day diner seating" },
      { alt: "Godwit Raipur — fresh coffee and bakery counter" },
      { alt: "Godwit Raipur — global comfort plating" },
    ],
    orderLinks: orderLinks(),
    instagram: INSTAGRAM,
  },

  // =============================================================
  // NAGPUR — new arrival
  // =============================================================
  nagpur: {
    id: "nagpur",
    city: "Nagpur",
    name: "Godwit Cafe — Nagpur",
    positioning: "The New Arrival",
    tagline: "The bird just landed in Nagpur.",
    about:
      "Freshly perched in Civil Lines. The newest, most camera-ready Godwit yet — an aesthetic, pure-veg multicuisine café built for the feed and the friends in it. Polished, buzzy, and just-opened: the grand-opening energy is real.",
    // TODO: confirm — a Bajaj Nagar outlet is also referenced
    address:
      "Ground Floor, Gupta Tower, Temple Road, Sita Kunj, Civil Lines, Nagpur, Maharashtra 440001",
    area: "Civil Lines",
    phone: "+91 90390 17400",
    hours: "12:00 PM – 11:00 PM", // TODO: verify
    costForTwo: "₹1,100 for two (approx)",
    mapsPlaceId: "", // TODO: place_id
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Godwit+Cafe+Nagpur",
    geo: { lat: 21.1498, lng: 79.0806 }, // TODO: confirm exact
    signatureDishes: [
      {
        name: "Loaded Nacho Mountain",
        tag: "Most loved",
        blurb: "A sharing-sized peak of nachos, cheese, salsa and jalapeños.",
        photo: { alt: "Loaded nachos with cheese and salsa" },
      },
      {
        name: "Lotus Biscoff Shake",
        tag: "Signature",
        blurb: "The Godwit classic — thick, caramelised and crowned with crumble.",
        photo: { alt: "Lotus Biscoff shake with cream" },
      },
      {
        name: "Wood-Fired Pizza",
        blurb: "Blistered, all-veg, leopard-spotted crust straight from the oven.",
        photo: { alt: "Wood-fired vegetarian pizza" },
      },
      {
        name: "Mezze Platter",
        blurb: "Hummus, muhammara, falafel and pita for the whole table.",
        photo: { alt: "Mediterranean mezze platter" },
      },
      {
        name: "Cheese Sizzler",
        tag: "Chef's pick",
        blurb: "A molten, smoke-rising sizzler made for slow phone-camera reveals.",
        photo: { alt: "Cheesy vegetarian sizzler steaming" },
      },
      {
        name: "Belgian Chocolate Jar",
        blurb: "Layered dark-chocolate dessert in a jar, deeply indulgent.",
        photo: { alt: "Belgian chocolate dessert jar" },
      },
      {
        name: "Pesto Garden Pasta",
        blurb: "Basil-bright pesto, fresh veg and a glossy parmesan finish.",
        photo: { alt: "Pesto pasta with vegetables" },
      },
      {
        name: "Blueberry Cheesecake",
        blurb: "Silky baked cheesecake under a glossy blueberry ripple.",
        photo: { alt: "Slice of blueberry cheesecake" },
      },
    ],
    gallery: [
      { alt: "Godwit Nagpur — bright, aesthetic interior" },
      { alt: "Godwit Nagpur — signage and entrance" },
      { alt: "Godwit Nagpur — plated dessert close-up" },
      { alt: "Godwit Nagpur — launch-day buzz" },
    ],
    orderLinks: orderLinks(),
    instagram: INSTAGRAM,
  },
};

export const outletList: Outlet[] = [
  outlets.indore,
  outlets.raipur,
  outlets.nagpur,
];

export function getOutlet(id: string): Outlet | undefined {
  return (outlets as Record<string, Outlet>)[id];
}
