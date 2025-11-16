// data.js

// Treat this as your "current" year
const CURRENT_YEAR = 2025;

/**
 * markets:
 *  - id, name, city, coords, subtitle, description
 *  - photos: id, src, label, tag, year
 */
const markets = [
  {
    id: "stuttgart",
    name: "Stuttgart Christmas Market",
    city: "Stuttgart, Germany",
    subtitle: "Schlossplatz · Stuttgarter Weihnachtsmarkt",
    coords: [48.7784, 9.1799],
    description:
      "Classic Glühwein mugs from Stuttgart and nearby Esslingen, with skyline and castle motifs.",
    photos: [
      {
        id: "stg-25-1",
        src: "https://ourworldforyou.com/wp-content/uploads/2015/12/Stuttgart-Weihnachtsmarkt-Gl%C3%BChwein-mug.jpg",
        label: "Twin Market Mugs",
        tag: "Stuttgart",
        year: 2025,
      },
      {
        id: "stg-25-2",
        src: "https://happytowander.com/wp-content/uploads/2019/11/Stuttgart-Christmas-Market-mug.jpg",
        label: "Handheld Mug",
        tag: "Schlossplatz",
        year: 2025,
      },
      {
        id: "stg-25-3",
        src: "https://wanderlustwithkids.com/wp-content/uploads/2019/11/Stuttgart-Weihnachtsmarkt-mug-closeup.jpg",
        label: "Close-Up Design",
        tag: "Weihnachtsmarkt",
        year: 2025,
      },
      {
        id: "stg-23-1",
        src: "https://europe.stripes.com/sites/default/files/styles/1200x800/public/images/2024-11/mugs_at_christmas_market.jpg",
        label: "Market Lineup",
        tag: "Region",
        year: 2023,
      },
      {
        id: "stg-22-1",
        src: "https://earthtrekkers.com/wp-content/uploads/2024/12/Esslingen-Weihnachtsmarkt-mug-red.jpg",
        label: "Esslingen Mug",
        tag: "Nearby",
        year: 2022,
      },
    ],
  },
  {
    id: "munich",
    name: "Munich Christkindlmarkt",
    city: "Munich, Germany",
    subtitle: "Marienplatz · Münchner Christkindlmarkt",
    coords: [48.1374, 11.5755],
    description:
      "Deep blue mugs and boot-shaped cups from the Bavarian capital’s main market and side squares.",
    photos: [
      {
        id: "muc-25-1",
        src: "https://happytowander.com/wp-content/uploads/2019/11/Munich-Christmas-Market-Mugs.jpg",
        label: "Mug Collection",
        tag: "Bavaria",
        year: 2025,
      },
      {
        id: "muc-24-1",
        src: "https://www.travelsewhere.net/wp-content/uploads/2022/12/Munich-Christmas-Market-Gluhwein.jpg",
        label: "Steaming Glühwein",
        tag: "Glühwein",
        year: 2024,
      },
      {
        id: "muc-23-1",
        src: "https://www.europeanbestdestinations.com/eBD/media/photos/munich-christmas-market-mugs.jpg",
        label: "Colorful Stall",
        tag: "Marienplatz",
        year: 2023,
      },
    ],
  },
  {
    id: "nuremberg",
    name: "Nuremberg Christkindlesmarkt",
    city: "Nuremberg, Germany",
    subtitle: "Hauptmarkt · Christkindlesmarkt",
    coords: [49.4521, 11.0767],
    description:
      "Iconic Christkindlesmarkt mugs with medieval old town scenes and the golden Christkind.",
    photos: [
      {
        id: "nue-25-1",
        src: "https://www.earthtrekkers.com/wp-content/uploads/2024/11/Nuremberg-Christmas-Market-Mugs.jpg",
        label: "Twin Nuremberg Mugs",
        tag: "Christkindlesmarkt",
        year: 2025,
      },
      {
        id: "nue-24-1",
        src: "https://nothingfamiliar.com/wp-content/uploads/2023/12/Nuremberg-Christmas-Market-Mugs.jpg",
        label: "Market Artwork",
        tag: "Old Town",
        year: 2024,
      },
      {
        id: "nue-23-1",
        src: "https://sidewalksafari.com/wp-content/uploads/2019/12/nuremberg-christmas-market-mugs.jpg",
        label: "Boot & Classic",
        tag: "Bavaria",
        year: 2023,
      },
    ],
  },
  {
    id: "cologne",
    name: "Cologne Christmas Markets",
    city: "Cologne, Germany",
    subtitle: "Am Dom · Heinzelmännchen & more",
    coords: [50.9413, 6.9583],
    description:
      "Boot-shaped and gnome-themed mugs from the markets around Cologne Cathedral and the Old Town.",
    photos: [
      {
        id: "cgn-25-1",
        src: "https://cathedralsandcafes.com/wp-content/uploads/2019/12/Cologne-Christmas-Markets-Cathedrals-and-Cafes-20.jpg",
        label: "Boot Mugs at the Table",
        tag: "Dom Market",
        year: 2025,
      },
      {
        id: "cgn-24-1",
        src: "https://andersonmtravels.com/wp-content/uploads/2019/12/Cologne-Christmas-Market-Mug.jpg",
        label: "Gnome Mug",
        tag: "Heinzelmännchen",
        year: 2024,
      },
      {
        id: "cgn-23-1",
        src: "https://www.dangerous-business.com/wp-content/uploads/2016/11/cologne-mug.jpg",
        label: "Red Cologne Mug",
        tag: "Altstadt",
        year: 2023,
      },
    ],
  },
  {
    id: "vienna",
    name: "Vienna Christmas Markets",
    city: "Vienna, Austria",
    subtitle: "Rathausplatz · Wiener Christkindlmarkt",
    coords: [48.2082, 16.3738],
    description:
      "Red boot mugs and midnight blue designs from the Austrian capital’s grand Rathausplatz and palace markets.",
    photos: [
      {
        id: "vie-25-1",
        src: "https://www.earthtrekkers.com/wp-content/uploads/2023/12/Vienna-Christmas-Market-Boot-Mugs.jpg",
        label: "Vienna Boot Mugs",
        tag: "Rathausplatz",
        year: 2025,
      },
      {
        id: "vie-24-1",
        src: "https://delveintoeurope.com/wp-content/uploads/2019/11/Vienna-Christmas-Market-Mug.jpg",
        label: "Single Boot Mug",
        tag: "Karlsplatz",
        year: 2024,
      },
      {
        id: "vie-23-1",
        src: "https://johnrieber.files.wordpress.com/2016/12/vienna-christmas-market-mugs.jpg",
        label: "Navy Vienna Mugs",
        tag: "Wiener",
        year: 2023,
      },
    ],
  },
  {
    id: "strasbourg",
    name: "Strasbourg Noël Markets",
    city: "Strasbourg, France",
    subtitle: "Grande Île · Capitale de Noël",
    coords: [48.5734, 7.7521],
    description:
      "Alsatian curves and bright red mugs from France’s self-declared Capital of Christmas.",
    photos: [
      {
        id: "sxb-25-1",
        src: "https://travelandtinsel.com/wp-content/uploads/2023/12/strasbourg-christmas-market-mug.jpg",
        label: "Red Strasbourg Mug",
        tag: "Alsace",
        year: 2025,
      },
      {
        id: "sxb-24-1",
        src: "https://andoreia.com/wp-content/uploads/2021/12/strasbourg-christmas-mugs.jpg",
        label: "Double Mug Cheers",
        tag: "Capitale de Noël",
        year: 2024,
      },
      {
        id: "sxb-23-1",
        src: "https://jessicalynnwrites.com/wp-content/uploads/2024/08/Strasbourg-Christmas-Market-Mug.jpg",
        label: "Strasbourg Glass",
        tag: "Vin chaud",
        year: 2023,
      },
    ],
  },
];

// Base like counts (mocked) – think of this as “global” likes from your future backend.
const BASE_LIKES = {
  "stg-25-1": 34,
  "stg-25-2": 21,
  "stg-25-3": 17,
  "stg-23-1": 9,
  "stg-22-1": 6,

  "muc-25-1": 28,
  "muc-24-1": 19,
  "muc-23-1": 14,

  "nue-25-1": 26,
  "nue-24-1": 18,
  "nue-23-1": 12,

  "cgn-25-1": 24,
  "cgn-24-1": 16,
  "cgn-23-1": 11,

  "vie-25-1": 27,
  "vie-24-1": 18,
  "vie-23-1": 13,

  "sxb-25-1": 25,
  "sxb-24-1": 20,
  "sxb-23-1": 15,
};

// Demo leaderboard data (unchanged)
const users = [
  { id: "u1", name: "Matt", mugsUploaded: 12, totalLikes: 120 },
  { id: "u2", name: "Anna", mugsUploaded: 9, totalLikes: 95 },
  { id: "u3", name: "Lukas", mugsUploaded: 6, totalLikes: 60 },
];

// Helper for previous-years page
function getAvailableYears() {
  const years = new Set();
  markets.forEach((m) =>
    m.photos.forEach((p) => {
      years.add(p.year);
    })
  );
  return Array.from(years).sort((a, b) => b - a);
}
