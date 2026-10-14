// Global Tab Switcher (Guaranteed to work regardless of CSS class conflicts)
window.switchTab = function(tabId) {
  const tabs = ['map-view', 'ai-copilot', 'network-tracer', 'validation', 'reports'];
  
  tabs.forEach(id => {
    const page = document.getElementById('page-' + id);
    const btn = document.getElementById('tab-btn-' + id);
    
    if (page) {
      if (id === tabId) {
        page.style.display = 'flex';
        page.classList.remove('hidden');
      } else {
        page.style.display = 'none';
        page.classList.add('hidden');
      }
    }

    if (btn) {
      if (id === tabId) {
        btn.classList.add('active', 'border-tactical-cyan/60', 'bg-tactical-cyan/10', 'text-tactical-cyan');
        btn.classList.remove('border-tactical-border', 'text-slate-400');
      } else {
        btn.classList.remove('active', 'border-tactical-cyan/60', 'bg-tactical-cyan/10', 'text-tactical-cyan');
        btn.classList.add('border-tactical-border', 'text-slate-400');
      }
    }
  });

  // Force Leaflet to recalculate container bounds whenever entering GIS view
  if (tabId === 'map-view' && window.map) {
    setTimeout(() => {
      window.map.invalidateSize(true);
    }, 100);
    setTimeout(() => {
      window.map.invalidateSize(true);
    }, 300);
  }
};

function renderIsolatedVillagesTable() {
  const tbody = document.getElementById('isolated-villages-table-body');
  if (!tbody || typeof CRISIS_DATABASE === 'undefined' || !CRISIS_DATABASE.isolated_villages) return;

  tbody.innerHTML = CRISIS_DATABASE.isolated_villages.map(v => `
    <tr class="hover:bg-tactical-900 transition">
      <td class="p-2 text-white font-bold">${v.name}</td>
      <td class="p-2 text-slate-400">${v.sub}</td>
      <td class="p-2 text-tactical-red font-bold">${v.population.toLocaleString()}</td>
      <td class="p-2 text-tactical-amber">${v.bridge}</td>
      <td class="p-2 text-slate-300">${v.hosp}</td>
      <td class="p-2 text-tactical-cyan">${v.need}</td>
    </tr>
  `).join('');
}

// Fail-safe initialization
window.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof initMap === 'function') initMap();
  } catch (e) {
    console.error('Error initializing map:', e);
  }

  try {
    if (typeof initCharts === 'function') initCharts();
  } catch (e) {
    console.error('Error initializing charts:', e);
  }

  try {
    renderIsolatedVillagesTable();
    if (typeof renderSitRep === 'function') renderSitRep();
    if (typeof renderTechReport === 'function') renderTechReport();
  } catch (e) {
    console.error('Error rendering reports/tables:', e);
  }

  // Ensure default tab is actively shown
  window.switchTab('map-view');
});