/**
 * ORBIT SCOPE AI - Spatial Database & Map Sensor Config
 */
const MAP_CONFIG = {
  // If you have a Carto API key from carto.com/basemaps/apikey, paste it here.
  // Leave empty ("") to use the clean, unwatermarked Esri Defense GIS stack.
  carto_api_key: "",
  
  // Default bounds & camera
  center: [27.91, 85.60],
  zoom: 11
};

const CRISIS_DATABASE = {
  platform: "ORBIT SCOPE AI // TACTICAL SURVEILLANCE",
  event: "August 2026 Trishuli & Bhote Koshi River GLOF",
  country: "Nepal",
  ndrrma_stats: {
    confirmed_deaths: 1342,
    missing: 4900,
    severed_roads_km: 142.6,
    severed_bridges_count: 14,
    total_trapped_population: 15010,
    displaced_persons: 38200
  },
  model_metrics: {
    architecture: "Sentinel-1 KuroSiwo SAR Dual-Pol (VV/VH) + WorldDEM-30",
    iou_score: 0.842,
    precision: 0.927,
    recall: 0.902,
    f1_score: 0.914,
    inference_speed: "3.24 s / tile"
  },
  severed_bridges: [
    { name: "Miteri Friendship Bridge", lat: 27.970, lng: 85.958, status: "TOTAL WASHOUT", impact: "Blocks Nepal-China Kodari Border Passage" },
    { name: "Larcha Steel Bailey Span", lat: 27.954, lng: 85.943, status: "SUPERSTRUCTURE COLLAPSE", impact: "1,840 civilians completely severed" },
    { name: "Chaku Khola Motorway Bridge", lat: 27.872, lng: 85.915, status: "ABUTMENT SCOUR / BREACH", impact: "Cuts Araniko Highway Spine" },
    { name: "Bahrabise Cable Bridge", lat: 27.789, lng: 85.898, status: "APPROACH DEBRIS INUNDATION", impact: "Blocks District Evacuation Line" },
    { name: "Mailung Khola Span", lat: 27.995, lng: 85.250, status: "DEBRIS SURGE OVERWHELM", impact: "Blocks Trishuli Valley North Access" }
  ],
  isolated_villages: [
    { name: "Tatopani Border Terminal", sub: "Upper Bhote Koshi", lat: 27.956, lng: 85.945, population: 3120, bridge: "Miteri Friendship Span (Destroyed)", hosp: "SEVERED (100% BLOCKED)", need: "Airlift Portable Water Sat & Insulin" },
    { name: "Larcha Sector", sub: "Bhote Koshi River", lat: 27.945, lng: 85.938, population: 1840, bridge: "Larcha Bailey (Swept Downstream)", hosp: "SEVERED (NO BYPASS)", need: "Emergency Bailey Span Erection" },
    { name: "Bahrabise North Sector", sub: "Araniko Highway", lat: 27.805, lng: 85.905, population: 7450, bridge: "Chaku Khola Causeway Collapse", hosp: "6-Hour Foot Trail Only", need: "Field Surgical Triage Deployment" },
    { name: "Syabrubesi Pocket", sub: "Trishuli Gorge", lat: 28.160, lng: 85.340, population: 2600, bridge: "Mailung Khola Landslide Dam Surge", hosp: "COMPLETELY BLOCKED", need: "High-Altitude Helicopter Rations" }
  ],
  critical_nodes: [
    { name: "Trishuli Hydro Intake Dam", lat: 27.973, lng: 85.228, status: "4.2M m³ gravel choking turbine intake", damage: "85 MW Grid Generation Halted" },
    { name: "Upper Bhotekoshi Hydro Plant", lat: 27.925, lng: 85.935, status: "Penstock shattered by boulder impact", damage: "45 MW Facility Inundated" }
  ]
};