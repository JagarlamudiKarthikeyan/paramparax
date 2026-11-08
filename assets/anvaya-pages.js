(function(){
 const data=window.ANVAYA_ATLAS;if(!data)return;
 const lang=()=>data.currentLanguage?data.currentLanguage():'en';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const copy={
 en:{kicker:'Living traditions / archive',all:'All entries',search:'Search within this archive',clear:'Clear search',empty:'No entries match this search. Try a place or tradition name.',count:n=>n+' '+(n===1?'entry':'entries')+' in this archive',cta:'Explore India',stories:'From the ANVAYA archive',region:'Regional practice',craft:'Explore regional traditions',more:'Find more in the atlas'},
 hi:{kicker:'जीवित परंपराएँ / संग्रह',all:'सभी प्रविष्टियाँ',search:'इस संग्रह में खोजें',clear:'खोज साफ़ करें',empty:'इस खोज से कोई प्रविष्टि नहीं मिली। किसी स्थान या परंपरा का नाम आज़माएँ।',count:n=>'इस संग्रह में '+n+' प्रविष्टियाँ',cta:'भारत की खोज',stories:'ANVAYA संग्रह से',region:'क्षेत्रीय परंपराएँ',craft:'क्षेत्रीय परंपराएँ देखें',more:'एटलस में और खोजें'},
 te:{kicker:'సజీవ సంప్రదాయాలు / ఆర్కైవ్',all:'అన్ని నమోదులు',search:'ఈ ఆర్కైవ్‌లో వెతకండి',clear:'వెతుకులాట తొలగించండి',empty:'ఈ వెతుకులాటకు నమోదులు లేవు. ప్రదేశం లేదా సంప్రదాయం పేరుతో ప్రయత్నించండి.',count:n=>'ఈ ఆర్కైవ్‌లో '+n+' నమోదులు',cta:'భారతదేశాన్ని అన్వేషించండి',stories:'ANVAYA ఆర్కైవ్ నుండి',region:'ప్రాంతీయ ఆచారాలు',craft:'ప్రాంతీయ సంప్రదాయాలు చూడండి',more:'అట్లాస్‌లో మరిన్ని చూడండి'}
 };
 const labels={
 en:{crafts:'Arts & Handicrafts',dance:'Dance & Music',festivals:'Culture & Festivals',places:'Heritage Places',languages:'Languages & Epigraphy',stories:'Stories & Origins'},
 hi:{crafts:'कला और हस्तशिल्प',dance:'नृत्य और संगीत',festivals:'संस्कृति और त्योहार',places:'विरासत स्थल',languages:'भाषाएँ और अभिलेख',stories:'कहानियाँ और उत्पत्ति'},
 te:{crafts:'కళలు & హస్తకళలు',dance:'నృత్యం & సంగీతం',festivals:'సంస్కృతి & పండుగలు',places:'వారసత్వ ప్రదేశాలు',languages:'భాషలు & శాసనాలు',stories:'కథలు & మూలాలు'}
 };
 const intro={
 en:{crafts:'Explore the materials, methods and regional craft traditions represented in the ANVAYA archive.',dance:'Discover dance, music and performance traditions represented in the ANVAYA archive.',festivals:'Explore cultural gatherings and seasonal practices represented in the archive.',places:'Find places and landscapes connected to India’s living heritage.',languages:'Explore languages, scripts and oral traditions represented in the archive.',stories:'Read the stories and origins shared through India’s living traditions.'},
 hi:{crafts:'ANVAYA संग्रह में दर्ज सामग्री, विधियों और क्षेत्रीय हस्तशिल्प परंपराओं को जानें।',dance:'ANVAYA संग्रह में दर्ज नृत्य, संगीत और प्रदर्शन परंपराओं को जानें।',festivals:'संग्रह में दर्ज सांस्कृतिक मेलों और मौसमी परंपराओं को जानें।',places:'भारत की जीवित विरासत से जुड़े स्थानों और भू-दृश्यों को खोजें।',languages:'संग्रह में दर्ज भाषाओं, लिपियों और मौखिक परंपराओं को जानें।',stories:'भारत की जीवित परंपराओं से जुड़ी कहानियाँ और उत्पत्ति पढ़ें।'},
 te:{crafts:'ANVAYA ఆర్కైవ్‌లోని పదార్థాలు, పద్ధతులు, ప్రాంతీయ హస్తకళా సంప్రదాయాలను అన్వేషించండి.',dance:'ANVAYA ఆర్కైవ్‌లోని నృత్యం, సంగీతం, ప్రదర్శనా సంప్రదాయాలను కనుగొనండి.',festivals:'ఆర్కైవ్‌లోని సాంస్కృతిక ఉత్సవాలు, కాలానుగుణ ఆచారాలను అన్వేషించండి.',places:'భారత సజీవ వారసత్వంతో ముడిపడిన ప్రదేశాలు, ప్రకృతి ప్రాంతాలను కనుగొనండి.',languages:'ఆర్కైవ్‌లోని భాషలు, లిపులు, మౌఖిక సంప్రదాయాలను అన్వేషించండి.',stories:'భారత సజీవ సంప్రదాయాల కథలు, మూలాలను చదవండి.'}
 };
 const category=document.body.dataset.atlasCategory;
 if(category&&document.getElementById('archiveGrid')){
  const form=document.getElementById('archiveSearchForm'),input=document.getElementById('archiveSearch'),clear=document.getElementById('archiveClear'),grid=document.getElementById('archiveGrid'),empty=document.getElementById('archiveEmpty'),status=document.getElementById('archiveCount');
  function render(){
   const l=lang(),tx=copy[l]||copy.en,name=(labels[l]||labels.en)[category],items=(data.worlds[category][l]||data.worlds[category].en);
   document.title='ANVAYA — '+name;
   document.getElementById('archiveKicker').textContent=tx.kicker;
   document.getElementById('archiveTitle').textContent=name;
   document.getElementById('archiveIntro').textContent=(intro[l]||intro.en)[category];
   document.getElementById('archiveSectionTitle').textContent=tx.stories;
   input.placeholder=tx.search;clear.textContent=tx.clear;empty.textContent=tx.empty;
   grid.innerHTML=items.map(pair=>{
    const file=data.worldFiles[parseInt(pair[0].slice(1),10)-1];
    const source='/uploads/'+encodeURIComponent(file);
    return '<article class="atlas-story" data-search="'+esc(pair[1].toLocaleLowerCase())+'"><img loading="lazy" src="'+source+'" alt="'+esc(pair[1])+'"><div class="atlas-story-body"><span class="atlas-story-type">'+esc(name)+'</span><h3>'+esc(pair[1])+'</h3></div></article>';
   }).join('');
   filter();
  }
  function filter(){
   const l=lang(),tx=copy[l]||copy.en,q=input.value.trim().toLocaleLowerCase();let n=0;
   grid.querySelectorAll('.atlas-story').forEach(card=>{const ok=!q||card.dataset.search.includes(q);card.hidden=!ok;if(ok)n++});
   status.textContent=tx.count(n);empty.hidden=n>0;clear.hidden=!q;
  }
  form.addEventListener('submit',e=>{e.preventDefault();filter();grid.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})});
  input.addEventListener('input',filter);clear.addEventListener('click',()=>{input.value='';filter();input.focus()});
  document.querySelectorAll('.lang-switch button').forEach(b=>b.addEventListener('click',()=>setTimeout(render,0)));
  render();
 }
 if(document.body.dataset.anvayaPage==='artisans'&&document.getElementById('communityGrid')){
  const grid=document.getElementById('communityGrid');
  function renderCommunities(){
   const l=lang(),list=Object.entries(data.states||{}).map(([code,entry])=>{const x=entry[l]||entry.en;return{code,name:x[0],craft:x[1],about:x[2]}}); 
   grid.innerHTML=list.map(x=>'<a class="region-card" href="explore.html?state='+encodeURIComponent(x.name)+'"><strong>'+esc(x.name)+'</strong><span>'+esc(x.craft)+'</span><p>'+esc(x.about)+'</p></a>').join('');
  }
  document.querySelectorAll('.lang-switch button').forEach(b=>b.addEventListener('click',()=>setTimeout(renderCommunities,0)));
  renderCommunities();
 }
})();