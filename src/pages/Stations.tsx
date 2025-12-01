import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Navbar from "../components/Navbar";
import { getNearbyStations } from "../api/stations";
import { Station } from "../types/station";

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});

/* --------------------------------------------
   User Location Logic
---------------------------------------------*/

function UserLocationMarker({ onLocation }: { onLocation: (pos: [number, number]) => void }) {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords: [number, number] = [latitude, longitude];

        setPosition(coords);
        onLocation(coords);

        map.flyTo(coords, 15);
      },
      (err) => {
        console.log("Location error:", err.message);
      }
    );
  }, [map]);

  if (!position) return null;

  return <Marker position={position} />;
}

/* --------------------------------------------
   Main Stations Page
---------------------------------------------*/

export default function Stations() {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [stations, setStations] = useState<Station[]>([]);

  // Fetch stations after user location is set
  useEffect(() => {
    if (!userPos) return;

    const fetchStations = async () => {
      const [lat, lng] = userPos;

      const data = await getNearbyStations(lat, lng);
      setStations(data);

      console.log("Fetched stations:", data);
    };

    fetchStations();
  }, [userPos]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 px-4 max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Find EV Charging Stations
        </h1>

        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search city, location..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600"
          />
        </div>

        {/* Layout: Map (left) + Stations List (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Map Section */}
          <div className="bg-white h-80 rounded-lg shadow overflow-hidden">
            <MapContainer
              center={[20.5937, 78.9629]} // India center
              zoom={5}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {/* User location */}
              <UserLocationMarker onLocation={(coords) => setUserPos(coords)} />
            </MapContainer>
          </div>

          {/* Station List Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Nearby Stations</h2>

            {stations?.length === 0 ? (
              <p className="text-gray-500">Searching nearby chargers...</p>
            ) : (
              <div className="space-y-4">
                {stations?.map((s) => (
                  <div
                    key={s._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow transition cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{s.name}</h3>

                    <p className="text-sm text-gray-600 mt-1">{s.address}</p>

                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">
                        {s.type}
                      </span>

                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">
                        {s.power_kw} kW
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>Connectors:</span>
                      {s.connectors.map((c, idx) => (
                        <span key={idx} className="bg-gray-200 px-2 py-1 rounded">
                          {c}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-slate-600 mt-2 font-medium">
                      Distance: {(s.distance_meters / 1000).toFixed(2)} km
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
