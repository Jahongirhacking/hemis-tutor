import { STATUS_COLORS } from '@/pages/dashboard/statistics/components/GeoLocationMapCard';
import { IGeoLocation } from '@/services/profile/type';
import {
  getLivingStatusCode,
  getLivingStatusName,
  StudentLivingStatus,
} from '@/services/student/type';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const UZBEKISTAN_CENTER: [number, number] = [64, 41.5];
const UZBEKISTAN_BOUNDS = {
  minLat: 37.2,
  maxLat: 45.6,
  minLng: 56,
  maxLng: 73.2,
};

const BOUNDS: L.LatLngBoundsExpression = [
  [UZBEKISTAN_BOUNDS.minLat, UZBEKISTAN_BOUNDS.minLng],
  [UZBEKISTAN_BOUNDS.maxLat, UZBEKISTAN_BOUNDS.maxLng],
];

interface LeafletMapProps {
  locations: IGeoLocation[];
  onLocationSelect: (name: string) => void;
  selectedLocation: IGeoLocation | null;
}

export function LeafletMap({
  locations = [],
  onLocationSelect,
  selectedLocation,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapRefInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapRefInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [UZBEKISTAN_CENTER[1], UZBEKISTAN_CENTER[0]],
      zoom: 6,
      minZoom: 6,
      maxZoom: 20,
      maxBounds: BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
    });

    // Basemap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
      minZoom: 6,
    }).addTo(map);

    // Light Uzbekistan rectangle
    L.rectangle(BOUNDS as L.LatLngBoundsExpression, {
      color: '#14b8a525',
      fillOpacity: 0,
      opacity: 0.1,
    }).addTo(map);

    map.setMaxBounds(BOUNDS);
    map.fitBounds(BOUNDS);

    mapRefInstance.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Add/Update markers
  useEffect(() => {
    if (!mapRefInstance.current) return;
    const map = mapRefInstance.current;

    // Clear old markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    if (!locations.length) return;

    const createIcon = (color: string, isSelected = false) =>
      L.divIcon({
        className: 'custom-div-icon',
        html: `
    <div 
    class="map-marker"
    style="
      background: ${color};
      width: ${isSelected ? 36 : 28}px;
      height: ${isSelected ? 36 : 28}px;
      border-radius: 50%;
      border: 4px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="background: white; width: 6px; height: 6px; border-radius: 50%;"></div>
    </div>
  `,
        iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
        iconAnchor: [isSelected ? 18 : 14, isSelected ? 18 : 14],
      });

    locations.forEach(loc => {
      if (!loc.latitude || !loc.longitude) return;

      const color =
        STATUS_COLORS?.[
          getLivingStatusCode(loc?.students?.[0]?.living_status_name)
        ] ||
        loc?.students?.[0]?.living_status_color ||
        '#999'; // fallback color

      L.marker([loc?.latitude, loc?.longitude], {
        icon: createIcon(
          color,
          selectedLocation?.geo_location === loc.geo_location
        ),
      })
        .bindPopup(
          `
      <div style="font-family: system-ui; padding: 8px; min-width: 180px;">
      ${loc?.students?.map(
        student => `
        <div class="mb-3">
          <b style="color: #1f2937;">${student?.address || ''}</b>
          <p style="color: #6b7280; margin-top: 4px">Talaba: ${student?.full_name || ''} - <span style="color: ${
            STATUS_COLORS?.[
              getLivingStatusCode(loc?.students?.[0]?.living_status_name)
            ] ||
            loc?.students?.[0]?.living_status_color ||
            '#999'
          }">${student?.living_status_name || getLivingStatusName(StudentLivingStatus.UNKNOWN)}<span>
          </p>
        </div>
        `
      )}
      </div>
    `
        )
        ?.on('click', () => onLocationSelect(loc?.geo_location || ''))
        ?.addTo(map);
    });

    const markers = locations
      .filter(loc => loc.latitude && loc.longitude)
      .map(loc => L.marker([loc.latitude!, loc.longitude!]));

    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.3), { maxZoom: 11 });
    }
  }, [locations, onLocationSelect, selectedLocation]);

  useEffect(() => {
    if (!mapRefInstance.current || !selectedLocation?.latitude) return;
    mapRefInstance.current.setView(
      [selectedLocation.latitude, selectedLocation.longitude],
      12,
      { animate: true }
    );
  }, [selectedLocation]);

  // ⭐⭐⭐ ADD BOLD COUNTRY BORDERS (no logic changed)
  useEffect(() => {
    if (!mapRefInstance.current) return;
    const map = mapRefInstance.current;

    fetch('/geo/uzbekistan.geo.json')
      .then(res => res.json())
      .then(geojson => {
        const layer = L.geoJSON(geojson, {
          style: {
            color: '#14b8a58c',
            weight: 5,
            fillOpacity: 0.3,
          },
        }).addTo(map);

        map.fitBounds(layer.getBounds());
      })
      .catch(err => console.error('UZB geojson error:', err));
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-lg"
      style={{ height: '560px' }}
    />
  );
}
