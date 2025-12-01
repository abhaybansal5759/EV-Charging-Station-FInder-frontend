import axios from "axios";

const API_URL = "http://localhost:8081";

export async function getNearbyStations(lat: number, lng: number, radius: number = 5000) {
  try {
    const res = await axios.get(`${API_URL}/charger/nearby`, {
      params: { lat, lng, radius },
    });

    // backend should return res.data.stations
    if (!res.data || !res.data.stations) return [];

    return res.data.stations;
  } catch (err) {
    console.error("Nearby stations API error:", err);
    return []; // <-- never return null
  }
}
