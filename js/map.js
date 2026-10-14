window.map = null;
let layerGroups = {
  flood: L.layerGroup(),
  bridges: L.layerGroup(),
  villages: L.layerGroup(),
  hotspots: L.layerGroup()
};
let satelliteTile, labelsTile;

function initMap() {
  if (typeof L === 'undefined') {
    console.error('[ORBIT_SCOPE]: Leaflet library is not loaded.');
    return;
  }

  const mapContainer = document.getElementById('gis-map');
  if (!mapContainer) {
    console.error('[ORBIT_SCOPE]: #gis-map container not found.');
    return;
  }

  // Prevent re-initialization if map already exists
  if (window.map) {
    window.map.remove();
  }

  // 1. Initialize Map instance
  window.map = L.map('gis-map', {
    center: [27.91, 85.60],
    zoom: 11,
    minZoom: 2,
    maxZoom: 18,
    zoomControl: true,
    attributionControl: false,
    worldCopyJump: true
  });

  // 2. High-Resolution Satellite Layer (ESRI World Imagery)
  satelliteTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    updateWhenIdle: true
  }).addTo(window.map);

  // 3. Crisp World Borders and Placenames
  labelsTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    opacity: 0.9,
    updateWhenIdle: true
  }).addTo(window.map);

  // 4. Render Vector Overlays
  if (typeof CRISIS_DATABASE !== 'undefined') {
    drawFloodPolygons();
    drawSeveredBridges();
    drawIsolatedVillages();
    drawHotspots();
  }

  // 5. Add layers to map
  Object.values(layerGroups).forEach(lg => lg.addTo(window.map));

  // 6. Force viewport calculation
  setTimeout(() => {
    if (window.map) window.map.invalidateSize(true);
  }, 100);
  setTimeout(() => {
    if (window.map) window.map.invalidateSize(true);
  }, 350);
}

function drawFloodPolygons() {
  const bhoteKoshiFloods = [
    [27.985, 85.965], [27.965, 85.955], [27.950, 85.940],
    [27.915, 85.930], [27.870, 85.910], [27.820, 85.895],
    [27.785, 85.890], [27.780, 85.900], [27.825, 85.912],
    [27.875, 85.925], [27.920, 85.945], [27.960, 85.968],
    [27.985, 85.965]
  ];

  const trishuliFloods = [
    [28.170, 85.340], [28.120, 85.310], [28.050, 85.280],
    [27.980, 85.230], [27.940, 85.210], [27.935, 85.225],
    [27.975, 85.245], [28.040, 85.295], [28.110, 85.325],
    [28.170, 85.340]
  ];

  const style = {
    color: '#ff2a51',
    weight: 2,
    opacity: 0.95,
    fillColor: '#ff2a51',
    fillOpacity: 0.45,
    dashArray: '4, 4'
  };

  L.polygon(bhoteKoshiFloods, style).bindPopup(`
    <div style="font-family: monospace;">
      <b style="color: #ff2a51;">BHOTE KOSHI SURGE</b><br>
      Max Velocity: 14.2 m/s | Depth: 8.4m<br>
      SAR Coherence Drop: -7.4 dB
    </div>
  `).addTo(layerGroups.flood);

  L.polygon(trishuliFloods, style).bindPopup(`
    <div style="font-family: monospace;">
      <b style="color: #ff2a51;">TRISHULI DEBRIS FIELD</b><br>
      Sediment Thickness: 4.8m<br>
      Turbine Intake Choked
    </div>
  `).addTo(layerGroups.flood);
}

function drawSeveredBridges() {
  if (!CRISIS_DATABASE.severed_bridges) return;
  CRISIS_DATABASE.severed_bridges.forEach(b => {
    L.circleMarker([b.lat, b.lng], {
      radius: 6,
      fillColor: '#ffaa00',
      color: '#ffffff',
      weight: 1.5,
      fillOpacity: 1
    }).bindPopup(`
      <div style="font-family: monospace;">
        <b style="color: #ffaa00;">${b.name}</b><br>
        STATUS: <span style="color:#ff2a51; font-weight:bold;">${b.status}</span><br>
        ${b.impact}
      </div>
    `).addTo(layerGroups.bridges);
  });
}

function drawIsolatedVillages() {
  if (!CRISIS_DATABASE.isolated_villages) return;
  CRISIS_DATABASE.isolated_villages.forEach(v => {
    L.circleMarker([v.lat, v.lng], {
      radius: 7,
      fillColor: '#c084fc',
      color: '#ffffff',
      weight: 1.5,
      fillOpacity: 0.95
    }).bindPopup(`
      <div style="font-family: monospace;">
        <b style="color: #c084fc;">${v.name}</b><br>
        Trapped Pop: <b style="color:#ff2a51;">${v.population.toLocaleString()}</b><br>
        Access: ${v.hosp}<br>
        Need: ${v.need}
      </div>
    `).addTo(layerGroups.villages);
  });
}

function drawHotspots() {
  if (!CRISIS_DATABASE.critical_nodes) return;
  CRISIS_DATABASE.critical_nodes.forEach(n => {
    L.circleMarker([n.lat, n.lng], {
      radius: 7,
      fillColor: '#00d2ff',
      color: '#ffffff',
      weight: 1.5,
      fillOpacity: 1
    }).bindPopup(`
      <div style="font-family: monospace;">
        <b style="color: #00d2ff;">${n.name}</b><br>
        DAMAGE: ${n.damage}<br>
        ${n.status}
      </div>
    `).addTo(layerGroups.hotspots);
  });
}

function toggleLayer(type) {
  const cb = document.getElementById(`layer-${type}`);
  if (!cb || !window.map) return;
  if (cb.checked) {
    window.map.addLayer(layerGroups[type]);
  } else {
    window.map.removeLayer(layerGroups[type]);
  }
}

function updateSplitOpacity(val) {
  if (satelliteTile) {
    satelliteTile.setOpacity(val / 100);
  }
}

function flyToLoc(lat, lng) {
  if (window.map) {
    window.map.flyTo([lat, lng], 13.5, { animate: true, duration: 1.0 });
  }
}

function resetToNepalAOI() {
  if (window.map) {
    window.map.flyTo([27.91, 85.60], 11, { animate: true, duration: 1.2 });
  }
}

function zoomToWorld() {
  if (window.map) {
    window.map.flyTo([20.0, 0.0], 2.5, { animate: true, duration: 1.5 });
  }
}