import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoicGFnbGllIiwiYSI6ImNtaW9sd25xMjAyZTczZnM5a3k4bjFxYTgifQ.TDL9kEFOXdbQDr91_YB2UA";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

function MapboxMap({ address, coordinates }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map only once
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [7.686, 45.07], // Piemonte (Torino area)
        zoom: 9,
      });
    }

    // Update map center and marker when coordinates change
    if (coordinates && coordinates.length === 2) {
      const [lng, lat] = coordinates;
      map.current.flyTo({
        center: [lng, lat],
        zoom: 15,
        duration: 1500,
      });

      // Remove existing marker if any
      if (marker.current) {
        marker.current.remove();
      }

      // Add new marker
      marker.current = new mapboxgl.Marker({ color: "#0d9488" })
        .setLngLat([lng, lat])
        .addTo(map.current);
    }

    return () => {
      // Cleanup is optional here; we keep the map instance
    };
  }, [coordinates, address]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Anteprima Posizione</label>
      <div
        ref={mapContainer}
        className="w-full h-96 border border-gray-300 rounded overflow-hidden"
      />
    </div>
  );
}

export default MapboxMap;
