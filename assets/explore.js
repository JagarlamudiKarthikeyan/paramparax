(function(){
 const atlas=window.ANVAYA_ATLAS;if(!atlas)return;
 const form=document.getElementById('exploreSearchForm'),input=document.getElementById('exploreSearch'),clear=document.getElementById('exploreClear'),status=document.getElementById('exploreStatus'),regions=document.getElementById('regionGrid'),stories=document.getElementById('storyGrid'),filters=document.getElementById('exploreFilters'),regionEmpty=document.getElementById('regionEmpty'),storyEmpty=document.getElementById('storyEmpty');
 const cats=[['all','All'],['crafts','Arts & Handicrafts'],['dance','Dance & Music'],['festivals','Culture & Festivals'],['places','Heritage Places'],['languages','Languages'],['stories','Stories & Origins']];
 let selected='all';
 const L=()=>atlas.currentLanguage()||'en';
 const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const catNames={en:['All','Arts & Handicrafts','Dance & Music','Culture & Festivals','Heritage Places','Languages','Stories & Origins'],hi:['सभी','कला और हस्तशिल्प','नृत्य और संगीत','संस्कृति और त्योहार','विरासत स्थल','भाषाएँ','कहानियाँ और उत्पत्ति'],te:['అన్నీ','కళలు & హస్తకళలు','నృత్యం & సంగీతం','సంస్కృతి & పండుగలు','వారసత్వ ప్రదేశాలు','భాషలు','కథలు & మూలాలు']};
 function renderFilters(){filters.innerHTML='';cats.forEach(([key],i)=>{const b=document.createElement('button');b.type='button';b.className='explore-filter';b.dataset.cat=key;b.setAttribute('aria-pressed',String(selected===key));b.textContent=(catNames[L()]||catNames.en)[i];b.addEventListener('click',()=>{selected=key;renderFilters();filter();});filters.appendChild(b);});}
 function render(){
  const lang=L(),stateEntries=Object.entries(atlas.states).map(([code,item])=>({code,name:(item[lang]||item.en)[0],craft:(item[lang]||item.en)[1],about:(item[lang]||item.en)[2]}));
  regions.innerHTML=stateEntries.map(s=>'<button type="button" class="region-card" data-state="'+safe(s.name)+'"><strong>'+safe(s.name)+'</strong><span>'+safe(s.craft)+'</span><p>'+safe(s.about)+'</p></button>').join('');
  stories.innerHTML=Object.entries(atlas.worlds).flatMap(([cat,versions])=>(versions[lang]||versions.en).map(([file,caption])=>{
   const catIndex=cats.findIndex(x=>x[0]===cat),label=(catNames[lang]||catNames.en)[catIndex];
   const src='/uploads/'+encodeURIComponent(atlas.worldFiles[parseInt(file.slice(1),10)-1]);
   return '<article class="atlas-story" data-cat="'+safe(cat)+'" data-search="'+safe((caption+' '+label).toLocaleLowerCase())+'"><img loading="lazy" src="'+src+'" alt="'+safe(caption)+'"><div class="atlas-story-body"><span class="atlas-story-type">'+safe(label)+'</span><h3>'+safe(caption)+'</h3></div></article>';
  })).join('');
  regions.querySelectorAll('.region-card').forEach(card=>card.addEventListener('click',()=>{input.value=card.dataset.state;filter();document.getElementById('exploreStories').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
  renderFilters();filter();
 }
 function filter(){
  const q=input.value.trim().toLocaleLowerCase();let nr=0,ns=0;
  regions.querySelectorAll('.region-card').forEach(card=>{const ok=!q||card.textContent.toLocaleLowerCase().includes(q);card.hidden=!ok;if(ok)nr++;});
  stories.querySelectorAll('.atlas-story').forEach(card=>{const ok=(selected==='all'||card.dataset.cat===selected)&&(!q||card.dataset.search.includes(q));card.hidden=!ok;if(ok)ns++;});
  regionEmpty.hidden=nr>0;storyEmpty.hidden=ns>0;clear.hidden=!q;
  status.textContent=nr+' places · '+ns+' atlas entries';
 }
 form.addEventListener('submit',e=>{e.preventDefault();filter();document.getElementById('regionGrid').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
 input.addEventListener('input',filter);clear.addEventListener('click',()=>{input.value='';filter();input.focus();});
 document.querySelectorAll('.lang-switch button').forEach(b=>b.addEventListener('click',()=>setTimeout(render,0)));
 const initialState=new URLSearchParams(location.search).get('state');if(initialState)input.value=initialState;
 render();
})();