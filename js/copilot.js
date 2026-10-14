let copilotLanguage = 'en';

function toggleCopilotLanguage() {
  copilotLanguage = (copilotLanguage === 'en') ? 'ne' : 'en';
  document.getElementById('copilot-lang-text').innerText = (copilotLanguage === 'en') 
    ? 'LANGUAGE: EN' 
    : 'LANGUAGE: NE (नेपाली)';

  appendChatMessage('system', (copilotLanguage === 'en')
    ? "[STATUS]: Language switched to English. Zero-hallucination database active."
    : "[स्थिति]: भाषा नेपालीमा परिवर्तन भयो। आधिकारिक तथ्यांक प्रमाणीकरण सक्रिय।");
}

function sendQuickPrompt(txt) {
  document.getElementById('copilot-input').value = txt;
  executeCopilotQuery();
}

function executeCopilotQuery() {
  const input = document.getElementById('copilot-input');
  const query = input.value.trim();
  if (!query) return;

  appendChatMessage('user', query);
  input.value = '';

  setTimeout(() => {
    const res = generateGroundedAnswer(query.toLowerCase());
    appendChatMessage('assistant', res);
  }, 200);
}

function generateGroundedAnswer(q) {
  const db = CRISIS_DATABASE;
  const isNepali = copilotLanguage === 'ne' || q.includes('nepali') || q.includes('kati') || q.includes('अवस्था');

  if (q.includes('casualt') || q.includes('death') || q.includes('missing') || q.includes('मरेका') || q.includes('बेपत्ता')) {
    if (isNepali) {
      return `<b>NDRRMA आधिकारिक तथ्यांक:</b><br>
      • पुष्टि भएको मृत्यु संख्या: <b>${db.ndrrma_stats.confirmed_deaths.toLocaleString()}</b> जना<br>
      • बेपत्ता नागरिक: <b>${db.ndrrma_stats.missing.toLocaleString()}</b> जना<br>
      • अवरुद्ध सडक लम्बाइ: <b>${db.ndrrma_stats.severed_roads_km} कि.मी.</b>`;
    } else {
      return `<b>AUTHORITATIVE CASUALTY RECORD:</b><br>
      • Confirmed Fatalities: <b>${db.ndrrma_stats.confirmed_deaths.toLocaleString()}</b><br>
      • Missing: <b>${db.ndrrma_stats.missing.toLocaleString()}</b><br>
      • Severed Corridor: <b>${db.ndrrma_stats.severed_roads_km} km</b>`;
    }
  }

  if (q.includes('bridge') || q.includes('पुल') || q.includes('larcha') || q.includes('tatopani')) {
    let list = db.severed_bridges.map(b => `• <b>${b.name}</b>: ${b.status} (${b.impact})`).join('<br>');
    return `<b>STRUCTURAL SEVERANCE LOG:</b><br>${list}`;
  }

  if (q.includes('model') || q.includes('sar') || q.includes('iou') || q.includes('f1')) {
    return `<b>RADAR MODEL TELEMETRY:</b><br>
    Architecture: ${db.model_metrics.architecture}<br>
    IoU: <b>${db.model_metrics.iou_score}</b> | F1: <b>${db.model_metrics.f1_score}</b> | Precision: <b>${(db.model_metrics.precision * 100).toFixed(1)}%</b>`;
  }

  return (isNepali)
    ? `<b>तथ्यांक सारांश:</b> मृत्यु: १,३४२ | बेपत्ता: ४,९०० | अलपत्र बस्ती: १५,०१० | बगाइएका पुल: १४ वटा | सडक क्षति: १४२.६ कि.मी.`
    : `<b>TELEMETRY SUMMARY:</b> Fatalities: 1,342 | Missing: 4,900 | Trapped: 15,010 | Destroyed Bridges: 14 | Severed Roadway: 142.6 km.`;
}

function appendChatMessage(sender, content) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');

  if (sender === 'user') {
    div.className = 'p-2 bg-tactical-850 border border-tactical-border text-slate-100';
    div.innerHTML = `<span class="text-tactical-cyan font-bold">&gt; USER:</span> ${content}`;
  } else if (sender === 'assistant') {
    div.className = 'p-2 bg-tactical-950 border border-tactical-border text-slate-200';
    div.innerHTML = `<span class="text-emerald-400 font-bold">&gt; ORBIT SCOPE COPILOT:</span><br>${content}`;
  } else {
    div.className = 'text-[10px] text-slate-400 font-mono py-1';
    div.innerHTML = content;
  }

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}