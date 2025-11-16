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
        src: "https://happytowander.com/wp-content/uploads/Stuttgart-Christmas-Market-in-Stuttgart-Germany-09245-1.jpg",
        label: "Classic Market Mug",
        tag: "Stuttgart",
        year: 2025,
      },
      {
        id: "stg-24-1",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULuuxSoVRTTG2cq96HKKmYM6c2MbQRJV5AWEmdQzGSg&s",
        label: "Handheld Glühwein",
        tag: "Weihnachtsmarkt",
        year: 2024,
      },
      {
        id: "stg-23-1",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6_BQuLW-bYmzTV_zWkhpxAs7l-n5H_emXg&s",
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
        src: "https://www.shutterstock.com/image-photo/munich-germany-december-7-2017-260nw-2141472617.jpg",
        label: "Mug Collection",
        tag: "Munich",
        year: 2025,
      },
      {
        id: "muc-24-1",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVY7xIDxUV_LFS0XTVh8AwgTbzER5RYt3V8w&s",
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
