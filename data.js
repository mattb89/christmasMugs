// data.js
const CURRENT_YEAR = 2025;

// Simple sample markets and photos
const markets = [
  {
    id: "stuttgart",
    name: "Stuttgart Christmas Market",
    city: "Stuttgart, Germany",
    subtitle: "Schlossplatz · Stuttgarter Weihnachtsmarkt",
    coords: [48.7784, 9.1799],
    description:
      "Classic mugs and nearby Esslingen designs from the Stuttgart region.",
    photos: [
      {
        id: "stg-25-1",
        scr: "data:image/jpeg;base64,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",
        label: "Classic Market Mug",
        tag: "Stuttgart",
        year: 2025,
      },
      {
        id: "stg-24-1",
        src: "https://happytowander.com/wp-content/uploads/2019/11/Stuttgart-Christmas-Market-mug.jpg",
        label: "Handheld Glühwein",
        tag: "Weihnachtsmarkt",
        year: 2024,
      },
      {
        id: "stg-23-1",
        src: "https://wanderlustwithkids.com/wp-content/uploads/2019/11/Stuttgart-Weihnachtsmarkt-mug-closeup.jpg",
        label: "Detail Design",
        tag: "Design",
        year: 2023,
      },
      {
        id: "stg-23-2",
        src: "https://europe.stripes.com/sites/default/files/styles/1200x800/public/images/2024-11/mugs_at_christmas_market.jpg",
        label: "Market Lineup",
        tag: "Germany",
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
      "Mugs from the heart of Bavaria, around Marienplatz and nearby markets.",
    photos: [
      {
        id: "muc-25-1",
        src: "https://happytowander.com/wp-content/uploads/2019/11/Munich-Christmas-Market-Mugs.jpg",
        label: "Mug Collection",
        tag: "Munich",
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
        label: "Colorful Designs",
        tag: "Bavaria",
        year: 2023,
      },
    ],
  },
];

// Leaderboard demo data
const users = [
  { id: "u1", name: "Matt", mugsUploaded: 7, totalLikes: 42 },
  { id: "u2", name: "Anna", mugsUploaded: 5, totalLikes: 35 },
  { id: "u3", name: "Lukas", mugsUploaded: 3, totalLikes: 18 },
];

// Popular mugs demo list (references some of the same photos)
const popularMugs = [
  {
    id: "stg-25-1",
    src: markets[0].photos[0].src,
    label: markets[0].photos[0].label,
    location: markets[0].city,
    market: markets[0].name,
    year: 2025,
    likes: 30,
  },
  {
    id: "muc-25-1",
    src: markets[1].photos[0].src,
    label: markets[1].photos[0].label,
    location: markets[1].city,
    market: markets[1].name,
    year: 2025,
    likes: 24,
  },
  {
    id: "stg-23-1",
    src: markets[0].photos[2].src,
    label: markets[0].photos[2].label,
    location: markets[0].city,
    market: markets[0].name,
    year: 2023,
    likes: 18,
  },
];

function getAvailableYears() {
  const years = new Set();
  markets.forEach((m) =>
    m.photos.forEach((p) => {
      years.add(p.year);
    })
  );
  return Array.from(years).sort((a, b) => b - a);
}
