"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon issue with Next.js/Webpack
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function DependencyMap() {
  const [geoData, setGeoData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => setGeoData(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load geospatial data");
      });
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full bg-background"
        style={{ background: "#030712" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {geoData?.features?.map((feature: any) => (
          <Marker
            key={feature.properties.id}
            position={[
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0],
            ]}
            icon={icon}
          >
            <Popup>
              <div className="flex flex-col gap-1 min-w-[200px]">
                <h3 className="text-primary font-bold text-base m-0">{feature.properties.name}</h3>
                <p className="text-sm text-gray-300 m-0"><strong className="text-white">Country:</strong> {feature.properties.country}</p>
                <p className="text-sm text-gray-300 m-0"><strong className="text-white">Type:</strong> {feature.properties.type}</p>
                <p className="text-sm text-gray-300 m-0"><strong className="text-white">Capacity:</strong> {feature.properties.capacity_metric}</p>
                <div className="mt-2 text-xs border-t border-border pt-2 text-gray-400 italic">
                  "{feature.properties.insight}"
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
