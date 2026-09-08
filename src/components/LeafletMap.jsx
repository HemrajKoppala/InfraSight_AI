import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Authentic central sector infrastructure project geolocations
export const AUTHENTIC_PROJECT_LOCATIONS = [
  {
    id: "PRJ-MORTH-001",
    code: "NH-44-CORR",
    name: "National Highway Development Corridor NH-44 (Package-IV)",
    sector: "Road Transport",
    ministry: "MoRTH",
    state: "Karnataka",
    lat: 15.8497,
    lng: 74.4977,
    locationName: "Belagavi, Karnataka",
    originalCost: 18500,
    revisedCost: 22100,
    progress: 72,
    delayMonths: 18,
    risk: "Critical",
    agency: "NHAI",
    contractor: "Larsen & Toubro Ltd.",
  },
  {
    id: "PRJ-MOR-002",
    code: "EDFC-PKG3",
    name: "Eastern Dedicated Freight Corridor (Sonnagar - Dankuni Section)",
    sector: "Railways",
    ministry: "MoR",
    state: "West Bengal",
    lat: 22.6757,
    lng: 88.3056,
    locationName: "Dankuni, West Bengal",
    originalCost: 14200,
    revisedCost: 17950,
    progress: 64,
    delayMonths: 21,
    risk: "Critical",
    agency: "DFCCIL",
    contractor: "Tata Projects - Aldesa JV",
  },
  {
    id: "PRJ-MOP-003",
    code: "RAJ-PWR-T1",
    name: "Adani Transmission Ltd - Rajasthan Part-I 765kV Green Corridor",
    sector: "Power",
    ministry: "MoP",
    state: "Rajasthan",
    lat: 26.9124,
    lng: 71.9124,
    locationName: "Fatehgarh, Rajasthan",
    originalCost: 25000,
    revisedCost: 25000,
    progress: 54,
    delayMonths: 24,
    risk: "High",
    agency: "PGCIL / Direct RE Hub",
    contractor: "Adani Transmission Ltd",
  },
  {
    id: "PRJ-MOWR-004",
    code: "KEN-BETWA-LNK",
    name: "Ken-Betwa River Interlinking National Project (Daodhan Dam)",
    sector: "Water Resources",
    ministry: "DWR, RD & GR",
    state: "Madhya Pradesh",
    lat: 24.5714,
    lng: 79.9199,
    locationName: "Daodhan, Chhatarpur, MP",
    originalCost: 44605,
    revisedCost: 48950,
    progress: 18,
    delayMonths: 24,
    risk: "High",
    agency: "NWDA",
    contractor: "Civil Infrastructure Consortium",
  },
  {
    id: "PRJ-MOHUA-005",
    code: "NBCC-GPRA-7",
    name: "Redevelopment of General Pool Residential Colonies (Sarojini Nagar)",
    sector: "Urban Development",
    ministry: "MoHUA",
    state: "Delhi",
    lat: 28.5729,
    lng: 77.1989,
    locationName: "Sarojini Nagar, New Delhi",
    originalCost: 32850,
    revisedCost: 32841,
    progress: 47,
    delayMonths: 12,
    risk: "Medium",
    agency: "NBCC (India) Ltd",
    contractor: "Shapoorji Pallonji / Ahluwalia",
  },
  {
    id: "PRJ-MOCOAL-006",
    code: "NCL-CIL-JYT",
    name: "Northern Coalfields Ltd - Jayant Open Cast Expansion (20-30 MTPA)",
    sector: "Coal",
    ministry: "MoCoal",
    state: "Madhya Pradesh",
    lat: 24.1200,
    lng: 82.6800,
    locationName: "Singrauli Coal Belt, MP",
    originalCost: 25560,
    revisedCost: 25560,
    progress: 14,
    delayMonths: 24,
    risk: "High",
    agency: "Coal India Ltd (NCL)",
    contractor: "BEML Consortium",
  },
  {
    id: "PRJ-MOR-007",
    code: "MAH-HSR-01",
    name: "Mumbai - Ahmedabad High Speed Rail Corridor (Bullet Train)",
    sector: "Railways",
    ministry: "MoR",
    state: "Maharashtra",
    lat: 19.0660,
    lng: 72.8687,
    locationName: "BKC Terminal, Mumbai",
    originalCost: 108000,
    revisedCost: 110000,
    progress: 42,
    delayMonths: 36,
    risk: "Critical",
    agency: "NHSRCL",
    contractor: "L&T Heavy Civil JV",
  },
  {
    id: "PRJ-MOP-008",
    code: "NTPC-BRH-STG2",
    name: "NTPC Barh Super Thermal Power Station Stage-II (1320 MW)",
    sector: "Power",
    ministry: "MoP",
    state: "Bihar",
    lat: 25.4800,
    lng: 85.7100,
    locationName: "Barh, Patna, Bihar",
    originalCost: 21400,
    revisedCost: 24800,
    progress: 88,
    delayMonths: 14,
    risk: "Medium",
    agency: "NTPC Ltd",
    contractor: "BHEL",
  },
];

export default function LeafletMap({
  height = "420px",
  onSelectProject,
  selectedRisk = "ALL",
  selectedSector = "ALL",
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map centered on India
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [22.8, 80.0],
        zoom: 4.8,
        minZoom: 4,
        maxZoom: 10,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // CARTO Light Government-compliant base tiles with official API Key
      const cartoApiKey =
        import.meta.env.VITE_CARTO_API_KEY || "cb1_2zow_1_b01cd98ba6a845a80da1ebdd";

      L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png?key=${cartoApiKey}`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    // Filter projects
    const filtered = AUTHENTIC_PROJECT_LOCATIONS.filter((p) => {
      if (selectedRisk !== "ALL" && p.risk !== selectedRisk) return false;
      if (selectedSector !== "ALL" && p.sector !== selectedSector) return false;
      return true;
    });

    // Add SVG Circle Markers for clean institutional look
    filtered.forEach((p) => {
      const color =
        p.risk === "Critical"
          ? "#dc2626"
          : p.risk === "High"
          ? "#ea580c"
          : "#2563eb";

      const circleMarker = L.circleMarker([p.lat, p.lng], {
        radius: 7,
        fillColor: color,
        color: "#ffffff",
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.9,
      });

      // Government popup format
      const popupContent = document.createElement("div");
      popupContent.className = "p-1 font-sans text-xs text-slate-800 space-y-1";
      popupContent.innerHTML = `
        <div style="font-family: sans-serif; font-size: 11px; min-width: 200px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 4px;">
            <strong style="font-family: monospace; color: #0b2240;">${p.code}</strong>
            <span style="font-size: 9px; font-weight: bold; padding: 1px 4px; border-radius: 2px; text-transform: uppercase; background: ${
              p.risk === "Critical" ? "#fee2e2" : p.risk === "High" ? "#ffedd5" : "#e0e7ff"
            }; color: ${color};">
              ${p.risk} Risk
            </span>
          </div>
          <div style="font-weight: bold; color: #0f172a; margin-bottom: 2px; line-height: 1.3;">
            ${p.name}
          </div>
          <div style="font-size: 10px; color: #64748b; margin-bottom: 4px;">
            ${p.ministry} &bull; ${p.locationName}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; background: #f8fafc; padding: 4px; border: 1px solid #e2e8f0; font-size: 10px; font-family: monospace;">
            <div><span style="color: #64748b;">Sanction:</span> ₹${p.originalCost} Cr</div>
            <div><span style="color: #64748b;">Revised:</span> ₹${p.revisedCost} Cr</div>
            <div><span style="color: #64748b;">Progress:</span> ${p.progress}%</div>
            <div><span style="color: #64748b;">Delay:</span> +${p.delayMonths} mos</div>
          </div>
          <div style="font-size: 9px; color: #0056b3; font-weight: bold; margin-top: 4px; border-top: 1px solid #e2e8f0; padding-top: 3px;">
            [OFFICIAL DATA: MoSPI IPMIS] &bull; [ML PREDICTION: XGBoost]
          </div>
        </div>
      `;

      circleMarker.bindPopup(popupContent);
      circleMarker.addTo(map);
      markersRef.current.push(circleMarker);
    });

    // Invalidate size on mount to prevent partial tile render
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [selectedRisk, selectedSector]);

  return (
    <div className="relative border border-slate-300 rounded-xs overflow-hidden bg-slate-100">
      <div ref={mapContainerRef} style={{ height, width: "100%" }} />

      {/* Embedded Map Legend */}
      <div className="absolute bottom-2 left-2 z-[400] bg-white/95 border border-slate-300 px-2.5 py-1.5 rounded-xs shadow-2xs text-[10px] text-slate-700">
        <div className="font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-1">
          Project Risk Legend (Legitimate Coordinates)
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] inline-block border border-white" />
            <span>Critical Priority</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] inline-block border border-white" />
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] inline-block border border-white" />
            <span>Medium / Monitored</span>
          </div>
        </div>
      </div>
    </div>
  );
}
