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
      "Deep blue mugs and boot-shaped cups from the Bavarian capital’s main market and side squa
