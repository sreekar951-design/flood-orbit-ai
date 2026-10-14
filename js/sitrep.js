let sitrepLang = 'en';

function toggleSitRepLang() {
  sitrepLang = (sitrepLang === 'en') ? 'ne' : 'en';
  document.getElementById('sitrep-lang-label').innerText = (sitrepLang === 'en')
    ? 'LANG: ENGLISH / NEPALI'
    : 'LANG: नेपाली / ENGLISH';
  renderSitRep();
}

function renderSitRep() {
  const container = document.getElementById('sitrep-content');
  const db = CRISIS_DATABASE;

  if (sitrepLang === 'en') {
    container.innerHTML = `
      <div class="border-b border-tactical-border pb-3 mb-3 flex justify-between items-start">
        <div>
          <div class="text-[9px] font-bold text-tactical-red uppercase tracking-wider">RESTRICTED // NDRRMA INCIDENT BRIEFING</div>
          <div class="text-base font-bold text-white uppercase mt-0.5">SITUATION REPORT #04 — AUGUST 2026 NEPAL GLOF</div>
          <div class="text-[10px] text-slate-400">Trishuli & Bhote Koshi Rapid Satellite Vectorization</div>
        </div>
        <div class="text-right text-[10px] font-mono text-slate-400">
          <div>DATE: 18-AUG-2026</div>
          <div>PROTOCOL: COPERNICUS EMSR927</div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-2 my-3 text-center">
        <div class="p-2 bg-tactical-950 border border-tactical-border">
          <div class="text-[9px] text-slate-400 uppercase">CONFIRMED DEAD</div>
          <div class="text-base font-bold text-tactical-red">${db.ndrrma_stats.confirmed_deaths.toLocaleString()}</div>
        </div>
        <div class="p-2 bg-tactical-950 border border-tactical-border">
          <div class="text-[9px] text-slate-400 uppercase">MISSING</div>
          <div class="text-base font-bold text-tactical-amber">${db.ndrrma_stats.missing.toLocaleString()}</div>
        </div>
        <div class="p-2 bg-tactical-950 border border-tactical-border">
          <div class="text-[9px] text-slate-400 uppercase">ROAD BREACH</div>
          <div class="text-base font-bold text-tactical-red">${db.ndrrma_stats.severed_roads_km} km</div>
        </div>
        <div class="p-2 bg-tactical-950 border border-tactical-border">
          <div class="text-[9px] text-slate-400 uppercase">BRIDGES DOWN</div>
          <div class="text-base font-bold text-tactical-amber">${db.ndrrma_stats.severed_bridges_count} Units</div>
        </div>
      </div>

      <div class="space-y-2 text-[11px] text-slate-300 leading-relaxed">
        <div><b>1. SITUATION SUMMARY:</b> High-altitude moraine rupture triggered catastrophic flood and sediment wave through Upper Bhote Koshi and Trishuli gorges. <b>${db.ndrrma_stats.total_trapped_population.toLocaleString()} civilians</b> across Tatopani, Larcha, Bahrabise North, and Syabrubesi are isolated with zero vehicular egress.</div>
        <div><b>2. CRITICAL ARTERY STATUS:</b> Araniko Highway breached at 9 discrete points. All 14 major spans including Miteri and Larcha Bailey bridges washed away. Trishuli Hydropower (85 MW) offline due to heavy gravel inundation.</div>
        <div><b>3. OPERATIONAL DIRECTIVES:</b> Deploy Nepalese Army air wings for medical airdrops to Tatopani; deploy Bailey reconstruction battalions to Larcha sector immediately.</div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="border-b border-tactical-border pb-3 mb-3 flex justify-between items-start">
        <div>
          <div class="text-[9px] font-bold text-tactical-red uppercase tracking-wider">आपतकालीन विपद् वस्तुस्थिति प्रतिवेदन</div>
          <div class="text-base font-bold text-white uppercase mt-0.5">प्रतिवेदन संख्या #०४ — भदौ २०८३ बाढी तथा लेदो प्रवाह</div>
          <div class="text-[10px] text-slate-400">त्रिशुली तथा भोटेकोशी जलाधार क्षेत्र उपग्रह विश्लेषण</div>
        </div>
        <div class="text-right text-[10px] font-mono text-slate-400">
          <div>मिति: २०८३ भदौ २</div>
          <div>स्रोत: NDRRMA / EMSR927</div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-2 my-3 text-center">
        <div class="p-2 bg-tactical-950 border border-tactical-border">
          <div class="text-[9px] text-slate-400 uppercase">मृत्यु पुष्टि</div>
          <div class="text-base font-bold text-tactical-red">${db.ndrrma_stats.confirmed_deaths.toLocaleString()}</div>
        </div>
        <div class="p-2 bg-tactical-950 border border-tactical-border">
          <div class="text-[9px] text-slate-400 uppercase">बेपत्ता</div>
          <div class="text-base font-bold text-tactical-amber">${db.ndrrma_stats.missing.toLocaleString()}</div>
        </div>
        <div class="p-2 bg-tactical-950 border border-tactical-border">
          <div class="text-[9px] text-slate-400 uppercase">सडक विच्छेद</div>
          <div class="text-base font-bold text-tactical-red">${db.ndrrma_stats.severed_roads_km} कि.मी.</div>
        </div>
        <div class="p-2 bg-tactical-950 border border-tactical-border">
          <div class="text-[9px] text-slate-400 uppercase">पुल क्षति</div>
          <div class="text-base font-bold text-tactical-amber">${db.ndrrma_stats.severed_bridges_count} वटा</div>
        </div>
      </div>

      <div class="space-y-2 text-[11px] text-slate-300 leading-relaxed">
        <div><b>१. समग्र अवस्था:</b> हिमताल फुट्दा आएको बाढीले १४ वटा मुख्य पुलहरू पूर्ण नष्ट गरेको छ। तातोपानी, लार्चा, बाह्रबिसे र स्याफ्रुबेसीका <b>${db.ndrrma_stats.total_trapped_population.toLocaleString()} नागरिकहरू</b> बाह्य पहुँचबाट पूर्ण रूपमा विच्छेद भएका छन्।</div>
        <div><b>२. पूर्वाधार क्षति:</b> अरनिको राजमार्ग ९ ठाउँमा पूर्ण अवरुद्ध। त्रिशुली (८५ मेगावाट) बाँधको टर्बाइन इन्टेक ४.२ लाख घनमिटर गेग्रानले पुरिएको छ।</div>
        <div><b>३. तत्काल चालिनुपर्ने कदम:</b> तातोपानीमा हेलिकप्टरमार्फत औषधि खसाल्ने; लार्चामा तत्काल सेनामार्फत बेलीब्रिज जडान गर्ने।</div>
      </div>
    `;
  }
}

function renderTechReport() {
  const container = document.getElementById('tech-report-container');
  container.innerHTML = `
    <div class="text-[11px] font-bold text-slate-200 uppercase mb-2">
      ORBIT SCOPE AI // TECHNICAL SPECIFICATIONS & SENSOR LIMITATIONS
    </div>
    <div class="space-y-2 text-[10px] text-slate-300">
      <div class="p-2 bg-tactical-950 border border-tactical-border">
        <b class="text-tactical-cyan">RADAR SENSOR PIPELINE:</b> C-band SAR penetrates persistent monsoon cloud covers. Coherence difference &lt; -4.5 dB successfully maps surface water inundation.
      </div>
      <div class="p-2 bg-tactical-950 border border-tactical-border">
        <b class="text-tactical-amber">OPERATIONAL REVISIT LATENCY LIMITATION:</b> Standard Sentinel-1 repeat orbit cycles entail an 18 to 36-hour blind coverage window over narrow Himalayan canyons unless ad-hoc commercial constellations (Capella/ICEYE) are triggered.
      </div>
    </div>
  `;
}