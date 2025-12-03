// // import React, { useEffect, useState } from "react";
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import L from "leaflet";

// // import Navbar from "../components/Navbar";
// // import { getNearbyStations } from "../api/stations";
// // import { Station } from "../types/station";

// // // Fix Leaflet marker icon issue
// // delete (L.Icon.Default.prototype as any)._getIconUrl;

// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
// //   iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
// //   shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
// // });

// // /* --------------------------------------------
// //    User Location Logic
// // ---------------------------------------------*/



// // function UserLocationMarker({ onLocation }: { onLocation: (pos: [number, number]) => void }) {
// //   const map = useMap();
// //   const [position, setPosition] = useState<[number, number] | null>(null);

// //   useEffect(() => {
// //     if (!navigator.geolocation) {
// //       console.log("Geolocation not supported");
// //       return;
// //     }

// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         const { latitude, longitude } = pos.coords;
// //         const coords: [number, number] = [latitude, longitude];

// //         setPosition(coords);
// //         onLocation(coords);

// //         map.flyTo(coords, 15);
// //       },
// //       (err) => {
// //         console.log("Location error:", err.message);
// //       }
// //     );
// //   }, [map]);

// //   if (!position) return null;

// //   return <Marker position={position}  interactive={false}/>;
// // }

// // /* --------------------------------------------
// //    Main Stations Page
// // ---------------------------------------------*/

// // export default function Stations() {
// //   const [userPos, setUserPos] = useState<[number, number] | null>(null);
// //   const [stations, setStations] = useState<Station[]>([]);

// //   // Fetch stations after user location is set
// //   useEffect(() => {
// //     if (!userPos) return;

// //     const fetchStations = async () => {
// //       const [lat, lng] = userPos;

// //       const data = await getNearbyStations(lat, lng);
// //       setStations(data);

// //       console.log("Fetched stations:", data);
// //     };

// //     fetchStations();
// //   }, [userPos]);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Navbar />

// //       <div className="pt-24 px-4 max-w-6xl mx-auto">
// //         {/* Page Title */}
// //         <h1 className="text-3xl font-bold text-gray-900 mb-6">
// //           Find EV Charging Stations
// //         </h1>

// //         {/* Search bar */}
// //         <div className="mb-8">
// //           <input
// //             type="text"
// //             placeholder="Search city, location..."
// //             className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600"
// //           />
// //         </div>

// //         {/* Layout: Map (left) + Stations List (right) */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// //           {/* Map Section */}
// //           <div className="bg-white h-80 rounded-lg shadow overflow-hidden">
// //             <MapContainer
// //               center={[20.5937, 78.9629]} // India center
// //               zoom={5}
// //               scrollWheelZoom={true}
// //               className="h-full w-full"
// //             >
// //               <TileLayer
// //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //                 attribution="&copy; OpenStreetMap contributors"
// //               />

// //               {/* User location */}
// //               <UserLocationMarker onLocation={(coords) => setUserPos(coords)} />
// //               {/* Charging station markers */}
// //               {stations?.map((s) => (
// //                 <Marker key={s._id} position={[s.lat, s.lng]}>
// //                   <Popup>
// //                     <div>
// //                       <h3 className="font-semibold">{s.name}</h3>
// //                       <p>{s.address}</p>
// //                       <p>{(s.distance_meters / 1000).toFixed(2)} km away</p>
// //                     </div>
// //                   </Popup>
// //                 </Marker>
// //               ))}

// //             </MapContainer>
// //           </div>

// //           {/* Station List Section */}
// //           <div className="bg-white rounded-lg shadow p-4">
// //             <h2 className="text-xl font-semibold mb-4">Nearby Stations</h2>

// //             {stations?.length === 0 ? (
// //               <p className="text-gray-500">Searching nearby chargers...</p>
// //             ) : (
// //               <div className="space-y-4">
// //                 {stations?.map((s) => (
// //                   <div
// //                     key={s._id}
// //                     className="border border-gray-200 rounded-lg p-4 hover:shadow transition cursor-pointer"
// //                   >
// //                     <h3 className="text-lg font-semibold text-gray-900">{s.name}</h3>

// //                     <p className="text-sm text-gray-600 mt-1">{s.address}</p>

// //                     <div className="flex items-center gap-3 mt-2 text-sm">
// //                       <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">
// //                         {s.type}
// //                       </span>

// //                       <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">
// //                         {s.power_kw} kW
// //                       </span>
// //                     </div>

// //                     <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
// //                       <span>Connectors:</span>
// //                       {s.connectors.map((c, idx) => (
// //                         <span key={idx} className="bg-gray-200 px-2 py-1 rounded">
// //                           {c}
// //                         </span>
// //                       ))}
// //                     </div>

// //                     <p className="text-sm text-slate-600 mt-2 font-medium">
// //                       Distance: {(s.distance_meters / 1000).toFixed(2)} km
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Tooltip,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// import Navbar from "../components/Navbar";
// import { getNearbyStations } from "../api/stations";
// import { Station } from "../types/station";

// /* ----------------------------------------------------
//    Fix Leaflet Default Blue Pin (Your Location)
// -----------------------------------------------------*/
// delete (L.Icon.Default.prototype as any)._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: new URL(
//     "leaflet/dist/images/marker-icon-2x.png",
//     import.meta.url
//   ).toString(),
//   iconUrl: new URL(
//     "leaflet/dist/images/marker-icon.png",
//     import.meta.url
//   ).toString(),
//   shadowUrl: new URL(
//     "leaflet/dist/images/marker-shadow.png",
//     import.meta.url
//   ).toString(),
// });

// /* ----------------------------------------------------
//    RED ICON FOR CHARGER STATIONS
// -----------------------------------------------------*/
// // const chargerIcon = new L.Icon({
// //   iconUrl:
// //     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
// //   iconRetinaUrl:
// //     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red-2x.png",
// //   shadowUrl:
// //     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// //   iconSize: [25, 41],
// //   iconAnchor: [12, 41],
// //   popupAnchor: [1, -34],
// //   shadowSize: [41, 41],
// // });

// /* ----------------------------------------------------
//    User Location Marker (NO POPUP, NO CLICK, NO "MARK")
// -----------------------------------------------------*/
// function UserLocationMarker({
//   onLocation,
// }: {
//   onLocation: (pos: [number, number]) => void;
// }) {
//   const map = useMap();
//   const [position, setPosition] = useState<[number, number] | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       console.log("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         const coords: [number, number] = [latitude, longitude];

//         setPosition(coords);
//         onLocation(coords);

//         map.flyTo(coords, 15);
//       },
//       (err) => {
//         console.log("Location error:", err.message);
//       }
//     );
//   }, [map]);

//   if (!position) return null;

//   return (
//     <Marker
//       position={position}
//       interactive={false} // ❗ disables popup/hover/click
//       keyboard={false}
//       opacity={0.9}
//     />
//   );
// }

// /* ----------------------------------------------------
//    Main Page — Stations
// -----------------------------------------------------*/
// export default function Stations() {
//   const [userPos, setUserPos] = useState<[number, number] | null>(null);
//   const [stations, setStations] = useState<Station[]>([]);

//   // Fetch stations after user location is set
//   useEffect(() => {
//     if (!userPos) return;

//     const fetchStations = async () => {
//       const [lat, lng] = userPos;

//       const data = await getNearbyStations(lat, lng, 5000);
//       setStations(data);

//       console.log("Fetched stations:", data);
//     };

//     fetchStations();
//   }, [userPos]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="pt-24 px-4 max-w-6xl mx-auto">
//         {/* Page Title */}
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">
//           Find EV Charging Stations
//         </h1>

//         {/* Search bar */}
//         <div className="mb-8">
//           <input
//             type="text"
//             placeholder="Search city, location..."
//             className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-600"
//           />
//         </div>

//         {/* Layout: Map + Station List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Map Section */}
//           <div className="bg-white h-80 rounded-lg shadow overflow-hidden">
//             <MapContainer
//               center={[20.5937, 78.9629]}
//               zoom={5}
//               scrollWheelZoom={true}
//               className="h-full w-full"
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution="&copy; OpenStreetMap contributors"
//               />

//               {/* User's Blue Pin */}
//               <UserLocationMarker
//                 onLocation={(coords) => setUserPos(coords)}
//               />

//               {/* Charger Station Markers */}
//               {stations?.map((s) => (
//                 <Marker
//                   key={s._id}
//                   position={[s.lat, s.lng]}
//                   // icon={chargerIcon}
//                 >
//                   {/* Hover Tooltip */}
//                   <Tooltip direction="top" offset={[0, -20]} opacity={1}>
//                     {s.name}
//                   </Tooltip>

//                   {/* Popup on Click */}
//                   <Popup>
//                     <div>
//                       <h3 className="font-semibold">{s.name}</h3>
//                       <p>{s.address}</p>
//                       <p>{(s.distance_meters / 1000).toFixed(2)} km away</p>
//                     </div>
//                   </Popup>
//                 </Marker>
//               ))}
//             </MapContainer>
//           </div>

//           {/* Station List */}
//           <div className="bg-white rounded-lg shadow p-4">
//             <h2 className="text-xl font-semibold mb-4">Nearby Stations</h2>

//             {stations?.length === 0 ? (
//               <p className="text-gray-500">Searching nearby chargers...</p>
//             ) : (
//               <div className="space-y-4">
//                 {stations?.map((s) => (
//                   <div
//                     key={s._id}
//                     className="border border-gray-200 rounded-lg p-4 hover:shadow transition cursor-pointer"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {s.name}
//                     </h3>

//                     <p className="text-sm text-gray-600 mt-1">{s.address}</p>

//                     <div className="flex items-center gap-3 mt-2 text-sm">
//                       <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">
//                         {s.type}
//                       </span>

//                       <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">
//                         {s.power_kw} kW
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
//                       <span>Connectors:</span>
//                       {s.connectors.map((c, idx) => (
//                         <span
//                           key={idx}
//                           className="bg-gray-200 px-2 py-1 rounded"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>

//                     <p className="text-sm text-slate-600 mt-2 font-medium">
//                       Distance: {(s.distance_meters / 1000).toFixed(2)} km
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Navbar from "../components/Navbar";
import { getNearbyStations } from "../api/stations";
import { Station } from "../types/station";

/* ----------------------------------------------------
   Fix Leaflet Default Blue Pin (Your Location)
-----------------------------------------------------*/
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});

/* ----------------------------------------------------
   RED ICON FOR CHARGER STATIONS
-----------------------------------------------------*/
const redIconUrl = 'data:image/svg+xml;base64,' + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41">
  <path fill="#ff0000" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z"/>
  <circle fill="#ffffff" cx="12.5" cy="12.5" r="6"/>
</svg>
`);

const chargerIcon = new L.Icon({
  iconUrl:
    redIconUrl,
  iconRetinaUrl:
    redIconUrl,
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/* ----------------------------------------------------
   USER LOCATION MARKER (NO POPUP, NO CLICK)
-----------------------------------------------------*/
function UserLocationMarker({
  onLocation,
}: {
  onLocation: (pos: [number, number]) => void;
}) {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setPosition(coords);
        onLocation(coords);
        map.flyTo(coords, 14);
      },
      (err) => console.log("Location error:", err.message)
    );
  }, [map]);

  if (!position) return null;

  return (
    <Marker
      position={position}
      interactive={false}
      keyboard={false}
      opacity={0.9}
    />
  );
}

/* ----------------------------------------------------
   MAIN PAGE
-----------------------------------------------------*/
export default function Stations() {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [stations, setStations] = useState<Station[]>([]);

  // Reference to map instance
  const mapRef = useRef<L.Map | null>(null);

  // Store marker refs to open popup programmatically
  const markerRefs = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!userPos) return;

    const fetchStations = async () => {
      const [lat, lng] = userPos;
      const data = await getNearbyStations(lat, lng, 5000);
      setStations(data);
      console.log("Fetched stations:", data);
    };

    fetchStations();
  }, [userPos]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 px-4 max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MAP SECTION */}
          <div className="bg-white h-80 rounded-lg shadow overflow-hidden">
<MapContainer
  center={[20.5937, 78.9629]}
  zoom={5}
  scrollWheelZoom={true}
  className="h-full w-full"
  ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {/* User Location */}
              <UserLocationMarker onLocation={(coords) => setUserPos(coords)} />

              {/* Charging Station Markers */}
              {stations.map((s) => (
                <Marker
                  key={s._id}
                  position={[s.lat, s.lng]}
                  icon={chargerIcon}
                  ref={(ref) => {
                    if (ref) markerRefs.current[s._id] = ref;
                  }}
                >
                  <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                    {s.name}
                  </Tooltip>

                  <Popup>
                    <h3 className="font-semibold">{s.name}</h3>
                    <p>{s.address}</p>
                    <p>{(s.distance_meters / 1000).toFixed(2)} km away</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* LIST SECTION */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Nearby Stations</h2>

            {stations.length === 0 ? (
              <p className="text-gray-500">Searching nearby chargers...</p>
            ) : (
              <div className="space-y-4">
                {stations.map((s) => (
                  <div
                    key={s._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow transition cursor-pointer"
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.flyTo([s.lat, s.lng], 16);
                      }

                      const marker = markerRefs.current[s._id];
                      if (marker) marker.openPopup();
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {s.name}
                    </h3>

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
                        <span
                          key={idx}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
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
