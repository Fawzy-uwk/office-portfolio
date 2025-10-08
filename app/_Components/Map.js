"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import L from "leaflet";

// Dynamic import Leaflet components (client-only)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Default marker icon fix
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

function Map() {
  const [mapReady, setMapReady] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      setMapReady(true);
      L.Marker.prototype.options.icon = DefaultIcon;
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative w-full sm:h-full h-[400px] rounded-md overflow-hidden">
      {!mapReady && (
        <Image
          src="/static-map.webp" // Export a pre-generated WebP image
          alt="Static map preview"
          fill
          className="object-cover"
          priority
        />
      )}
      {mapReady && (
        <MapContainer
          center={[27.8850671, 34.2986195]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full z-10 rounded-md"
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[27.8850671, 34.2986195]}>
            <Popup>
              <p className="text-lg font-bold">
                مكتب أحمد عبدالقوى للمحاسبة القانونية
              </p>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
