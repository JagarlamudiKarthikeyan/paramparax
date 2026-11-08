/* Homepage-only discovery search and accessible editorial reveals. */
(function(){
 const form=document.getElementById('atlasSearchForm'),input=document.getElementById('atlasSearch'),clear=document.getElementById('atlasSearchClear'),status=document.getElementById('atlasSearchStatus'),worlds=[...document.querySelectorAll('.world')];
 if(!form||!input||!worlds.length)return;
 const activeCategory=()=>document.querySelector('.cat-chips .chip.active')?.dataset.cat||'all';
 function applySearch(announce){
  const query=input.value.trim().toLocaleLowerCase();let count=0;
  worlds.forEach(world=>{const cat=activeCategory(),visible=(cat==='all'||world.dataset.cat===cat)&&(!query||world.textContent.toLocaleLowerCase().includes(query));world.hidden=!visible;if(visible)count++});
  clear.hidden=!query;
  if(announce)status.textContent=query?(count?count+' heritage '+(count===1?'category':'categories')+' found. Explore the matching stories below.':'No categories found. Try a place, tradition, art form or language.'):'Discover. Connect. Preserve.';
 }
 form.addEventListener('submit',event=>{event.preventDefault();applySearch(true);document.getElementById('worlds').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})});
 input.addEventListener('input',()=>applySearch(true));
 clear.addEventListener('click',()=>{input.value='';applySearch(true);input.focus()});
 input.addEventListener('keydown',event=>{if(event.key==='Escape'){input.value='';applySearch(true)}});
 document.querySelectorAll('.cat-chips .chip').forEach(button=>button.addEventListener('click',()=>requestAnimationFrame(()=>applySearch(true))));
 const targets=[...document.querySelectorAll('.home-page .section-head,.home-page .world,.home-page .step,.home-page .cta .wrap')];targets.forEach(el=>el.classList.add('home-reveal'));
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});targets.forEach(el=>observer.observe(el))}
 else targets.forEach(el=>el.classList.add('is-visible'));
 applySearch(false);
})();