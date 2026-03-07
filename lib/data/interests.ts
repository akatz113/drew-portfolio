export interface City {
  name: string;
  lat: number;
  lng: number;
}

export interface Trip {
  id: string;
  title: string;
  year: string;
  description: string;
  album: string;
  mapColor: string;
  routeStyle: "dashed" | "solid";
  cities: City[];
}

export interface Adventure {
  id: string;
  title: string;
  location: string;
  type: "climbing" | "cycling";
  description: string;
  album: string;
  accentColor: string;
}

export const trips: Trip[] = [
  {
    id: "spain",
    title: "Spain",
    year: "Summer 2024",
    description:
      "A week-long road trip across Spain — from the buzz of Barcelona's Gothic Quarter and Sagrada Família, through the grandeur of Madrid's museums and Retiro Park, the medieval walls of Segovia and Toledo, the white sand beaches of Ibiza, the Alhambra at golden hour in Granada, and finally the seafront promenade in Málaga.",
    album: "spain",
    mapColor: "#f59e0b",
    routeStyle: "dashed",
    cities: [
      { name: "Barcelona", lat: 41.3851, lng: 2.1734 },
      { name: "Madrid", lat: 40.4168, lng: -3.7038 },
      { name: "Segovia", lat: 40.9429, lng: -4.1088 },
      { name: "Toledo", lat: 39.8628, lng: -4.0273 },
      { name: "Ibiza", lat: 38.9067, lng: 1.4206 },
      { name: "Granada", lat: 37.1773, lng: -3.5986 },
      { name: "Málaga", lat: 36.7213, lng: -4.4213 },
    ],
  },
  {
    id: "europe",
    title: "Europe Grad Trip",
    year: "Summer 2024",
    description:
      "A graduation trip through nine of Europe's greatest cities — biking Amsterdam's canals, watching the changing of the guard in London, climbing the Eiffel Tower at dusk in Paris, tossing a coin in Rome's Trevi Fountain, eating real Neapolitan pizza in Naples, marveling at Renaissance art in Florence, gliding through Venice's canals, sipping coffee in Viennese cafés, and wandering the fairytale spires of Prague.",
    album: "europe",
    mapColor: "#38bdf8",
    routeStyle: "dashed",
    cities: [
      { name: "Amsterdam", lat: 52.3676, lng: 4.9041 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Paris", lat: 48.8566, lng: 2.3522 },
      { name: "Rome", lat: 41.9028, lng: 12.4964 },
      { name: "Naples", lat: 40.8518, lng: 14.2681 },
      { name: "Florence", lat: 43.7696, lng: 11.2558 },
      { name: "Venice", lat: 45.4408, lng: 12.3155 },
      { name: "Vienna", lat: 48.2082, lng: 16.3738 },
      { name: "Prague", lat: 50.0755, lng: 14.4378 },
    ],
  },
];

export const adventures: Adventure[] = [
  {
    id: "boulder",
    title: "Boulder",
    location: "Colorado",
    type: "climbing",
    description:
      "The Flatirons as a backdrop and world-class bouldering at your fingertips. Warm sandstone, bluebird skies, and thousands of routes from beginner slabs to overhanging testpieces.",
    album: "boulder",
    accentColor: "#f97316",
  },
  {
    id: "rrg",
    title: "Red River Gorge",
    location: "Kentucky",
    type: "climbing",
    description:
      "One of the most iconic sport climbing destinations in the country. Deep sandstone pockets, juggy roofs, and the kind of place that pulls you back every season.",
    album: "rrg",
    accentColor: "#ef4444",
  },
  {
    id: "nrg",
    title: "New River Gorge",
    location: "West Virginia",
    type: "climbing",
    description:
      "America's newest national park and one of the best trad climbing areas on the East Coast. Classic crack lines on the Endless Wall with the New River hundreds of feet below.",
    album: "nrg",
    accentColor: "#a8a29e",
  },
  {
    id: "otet",
    title: "Ohio to Erie Trail",
    location: "Cincinnati → Cleveland",
    type: "cycling",
    description:
      "326 miles of cycling through the heart of Ohio — rail trails, small towns, and open countryside. OTET is a different kind of adventure: no summit, no crux, just miles and momentum.",
    album: "otet",
    accentColor: "#34d399",
  },
];
