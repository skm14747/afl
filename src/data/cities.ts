export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timeZone: string;
}

export const CITIES: City[] = [
  { name: "New York", country: "United States", latitude: 40.7128, longitude: -74.006, timeZone: "America/New_York" },
  { name: "Los Angeles", country: "United States", latitude: 34.0522, longitude: -118.2437, timeZone: "America/Los_Angeles" },
  { name: "Chicago", country: "United States", latitude: 41.8781, longitude: -87.6298, timeZone: "America/Chicago" },
  { name: "Houston", country: "United States", latitude: 29.7604, longitude: -95.3698, timeZone: "America/Chicago" },
  { name: "Phoenix", country: "United States", latitude: 33.4484, longitude: -112.074, timeZone: "America/Phoenix" },
  { name: "Miami", country: "United States", latitude: 25.7617, longitude: -80.1918, timeZone: "America/New_York" },
  { name: "Honolulu", country: "United States", latitude: 21.3069, longitude: -157.8583, timeZone: "Pacific/Honolulu" },
  { name: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832, timeZone: "America/Toronto" },
  { name: "Vancouver", country: "Canada", latitude: 49.2827, longitude: -123.1207, timeZone: "America/Vancouver" },
  { name: "Mexico City", country: "Mexico", latitude: 19.4326, longitude: -99.1332, timeZone: "America/Mexico_City" },
  { name: "São Paulo", country: "Brazil", latitude: -23.5558, longitude: -46.6396, timeZone: "America/Sao_Paulo" },
  { name: "Rio de Janeiro", country: "Brazil", latitude: -22.9068, longitude: -43.1729, timeZone: "America/Sao_Paulo" },
  { name: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816, timeZone: "America/Argentina/Buenos_Aires" },
  { name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, timeZone: "Europe/London" },
  { name: "Sandringham", country: "United Kingdom", latitude: 52.8286, longitude: 0.5144, timeZone: "Europe/London" },
  { name: "Manchester", country: "United Kingdom", latitude: 53.4808, longitude: -2.2426, timeZone: "Europe/London" },
  { name: "Dublin", country: "Ireland", latitude: 53.3498, longitude: -6.2603, timeZone: "Europe/Dublin" },
  { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, timeZone: "Europe/Paris" },
  { name: "Berlin", country: "Germany", latitude: 52.52, longitude: 13.405, timeZone: "Europe/Berlin" },
  { name: "Madrid", country: "Spain", latitude: 40.4168, longitude: -3.7038, timeZone: "Europe/Madrid" },
  { name: "Rome", country: "Italy", latitude: 41.9028, longitude: 12.4964, timeZone: "Europe/Rome" },
  { name: "Amsterdam", country: "Netherlands", latitude: 52.3676, longitude: 4.9041, timeZone: "Europe/Amsterdam" },
  { name: "Lisbon", country: "Portugal", latitude: 38.7223, longitude: -9.1393, timeZone: "Europe/Lisbon" },
  { name: "Moscow", country: "Russia", latitude: 55.7558, longitude: 37.6173, timeZone: "Europe/Moscow" },
  { name: "Istanbul", country: "Turkey", latitude: 41.0082, longitude: 28.9784, timeZone: "Europe/Istanbul" },
  { name: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357, timeZone: "Africa/Cairo" },
  { name: "Lagos", country: "Nigeria", latitude: 6.5244, longitude: 3.3792, timeZone: "Africa/Lagos" },
  { name: "Johannesburg", country: "South Africa", latitude: -26.2041, longitude: 28.0473, timeZone: "Africa/Johannesburg" },
  { name: "Nairobi", country: "Kenya", latitude: -1.2921, longitude: 36.8219, timeZone: "Africa/Nairobi" },
  { name: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708, timeZone: "Asia/Dubai" },
  { name: "Mumbai", country: "India", latitude: 19.076, longitude: 72.8777, timeZone: "Asia/Kolkata" },
  { name: "Delhi", country: "India", latitude: 28.6139, longitude: 77.209, timeZone: "Asia/Kolkata" },
  { name: "Bengaluru", country: "India", latitude: 12.9716, longitude: 77.5946, timeZone: "Asia/Kolkata" },
  { name: "Chennai", country: "India", latitude: 13.0827, longitude: 80.2707, timeZone: "Asia/Kolkata" },
  { name: "Kolkata", country: "India", latitude: 22.5726, longitude: 88.3639, timeZone: "Asia/Kolkata" },
  { name: "Hyderabad", country: "India", latitude: 17.385, longitude: 78.4867, timeZone: "Asia/Kolkata" },
  { name: "Jaipur", country: "India", latitude: 26.9124, longitude: 75.7873, timeZone: "Asia/Kolkata" },
  { name: "Kochi", country: "India", latitude: 9.9312, longitude: 76.2673, timeZone: "Asia/Kolkata" },
  { name: "Kathmandu", country: "Nepal", latitude: 27.7172, longitude: 85.324, timeZone: "Asia/Kathmandu" },
  { name: "Colombo", country: "Sri Lanka", latitude: 6.9271, longitude: 79.8612, timeZone: "Asia/Colombo" },
  { name: "Dhaka", country: "Bangladesh", latitude: 23.8103, longitude: 90.4125, timeZone: "Asia/Dhaka" },
  { name: "Karachi", country: "Pakistan", latitude: 24.8607, longitude: 67.0011, timeZone: "Asia/Karachi" },
  { name: "Bangkok", country: "Thailand", latitude: 13.7563, longitude: 100.5018, timeZone: "Asia/Bangkok" },
  { name: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, timeZone: "Asia/Singapore" },
  { name: "Jakarta", country: "Indonesia", latitude: -6.2088, longitude: 106.8456, timeZone: "Asia/Jakarta" },
  { name: "Manila", country: "Philippines", latitude: 14.5995, longitude: 120.9842, timeZone: "Asia/Manila" },
  { name: "Hong Kong", country: "China", latitude: 22.3193, longitude: 114.1694, timeZone: "Asia/Hong_Kong" },
  { name: "Shanghai", country: "China", latitude: 31.2304, longitude: 121.4737, timeZone: "Asia/Shanghai" },
  { name: "Beijing", country: "China", latitude: 39.9042, longitude: 116.4074, timeZone: "Asia/Shanghai" },
  { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, timeZone: "Asia/Tokyo" },
  { name: "Seoul", country: "South Korea", latitude: 37.5665, longitude: 126.978, timeZone: "Asia/Seoul" },
  { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, timeZone: "Australia/Sydney" },
  { name: "Melbourne", country: "Australia", latitude: -37.8136, longitude: 144.9631, timeZone: "Australia/Melbourne" },
  { name: "Auckland", country: "New Zealand", latitude: -36.8509, longitude: 174.7645, timeZone: "Pacific/Auckland" },
];

export function searchCities(query: string): City[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return CITIES.slice(0, 8);
  return CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(q) ||
      city.country.toLowerCase().includes(q),
  ).slice(0, 8);
}

export function cityLabel(city: City): string {
  return `${city.name}, ${city.country}`;
}
