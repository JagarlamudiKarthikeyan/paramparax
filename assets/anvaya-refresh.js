(function(){
 const body=document.body,header=document.querySelector('header'),footer=document.querySelector('footer');
 function makeLink(href,text,key){const a=document.createElement('a');a.href=href;a.textContent=text;if(key)a.dataset.i18n=key;return a}
 if(header){
  const wrap=header.querySelector('.wrap'),brand=wrap&&wrap.querySelector('.brand-block'),lang=wrap&&wrap.querySelector('.lang-switch'),theme=wrap&&wrap.querySelector('#themeToggle'),auth=wrap&&wrap.querySelector('#navAuth');
  if(wrap&&brand){
   const nav=document.createElement('nav');nav.className='primary-nav';nav.setAttribute('aria-label','Main navigation');
   nav.append(makeLink('index.html','Home','nav_home'),makeLink('explore.html','Explore India','nav_explore'));
   const group=document.createElement('div');group.className='nav-menu';
   const trigger=document.createElement('button');trigger.type='button';trigger.className='nav-menu-trigger';trigger.textContent='Living Traditions';trigger.setAttribute('aria-expanded','false');
   const panel=document.createElement('div');panel.className='nav-menu-panel';
   [['crafts.html','Arts & Handicrafts'],['dance.html','Dance & Music'],['festivals.html','Culture & Festivals'],['heritage.html','Heritage Places'],['languages.html','Languages & Epigraphy'],['stories.html','Stories & Origins']].forEach(x=>panel.append(makeLink(x[0],x[1])));
   group.append(trigger,panel);nav.append(group);
   nav.append(makeLink('workshops.html','Workshops'));
   nav.append(makeLink('gallery.html','Community Gallery','nav_gallary'));
   nav.append(makeLink('artisans.html','Artisans & Communities'));
   nav.append(makeLink('about.html','About'));
   const toggle=document.createElement('button');toggle.className='mobile-menu-toggle';toggle.type='button';toggle.setAttribute('aria-label','Open navigation');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';
   const actions=document.createElement('div');actions.className='header-actions';
   if(lang)actions.append(lang);
   if(theme)actions.append(theme);
   const contribute=makeLink('gallery.html#galForm','Contribute');contribute.className='nav-auth nav-contribute';actions.append(contribute);
   if(auth)actions.append(auth);
   wrap.replaceChildren(brand,toggle,nav,actions);
   trigger.addEventListener('click',()=>{const open=group.classList.toggle('open');trigger.setAttribute('aria-expanded',String(open))});
   toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');toggle.textContent=open?'×':'☰'});
   document.addEventListener('click',e=>{if(!group.contains(e.target)){group.classList.remove('open');trigger.setAttribute('aria-expanded','false')}});
   document.addEventListener('keydown',e=>{if(e.key==='Escape'){group.classList.remove('open');nav.classList.remove('is-open');trigger.setAttribute('aria-expanded','false');toggle.setAttribute('aria-expanded','false')}});
   const here=location.pathname.split('/').pop()||'index.html';nav.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===here)a.setAttribute('aria-current','page')});
  }
 }
 if(footer){
  const oldNote=footer.querySelector('.foot-note');
  const main=document.createElement('div');main.className='wrap footer-main';
  const brand=document.createElement('div');brand.innerHTML='<div class="footer-brand">ANVAYA</div><p class="footer-tagline">India’s Living Heritage Atlas.<br>Every tradition has a story.<br>Discover. Connect. Preserve.</p>';
  const cols=document.createElement('div');cols.className='footer-columns';
  const sets=[['Discover',['Explore India|explore.html','Arts & Handicrafts|crafts.html','Dance & Music|dance.html','Heritage Places|heritage.html']],['Take part',['Workshops & Experiences|workshops.html','Artisans & Communities|artisans.html','Community Gallery|gallery.html']],['About',['About ANVAYA|about.html','How it works|how.html','Contact|contact.html','Log in|login.html']]];
  sets.forEach(set=>{const col=document.createElement('div');col.className='footer-col';const h=document.createElement('h3');h.textContent=set[0];col.append(h);set[1].forEach(v=>{const pair=v.split('|');col.append(makeLink(pair[1],pair[0]))});cols.append(col)});
  main.append(brand,cols);
  const bottom=document.createElement('div');bottom.className='footer-bottom';const inner=document.createElement('div');inner.className='wrap';if(oldNote){oldNote.className='foot-note';inner.append(oldNote)}const copyright=document.createElement('div');copyright.textContent='© '+new Date().getFullYear()+' ANVAYA — India’s Living Heritage Atlas';inner.append(copyright);bottom.append(inner);footer.replaceChildren(main,bottom);
 }
 const targets=[...document.querySelectorAll('body.anvaya-refresh main,body.anvaya-refresh .hero-inner,body.anvaya-refresh .page-head,body.anvaya-refresh .atlas-section,body.anvaya-refresh .world')];
 targets.forEach(x=>x.classList.add('content-reveal'));
 if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08});targets.forEach(x=>io.observe(x))}else targets.forEach(x=>x.classList.add('is-visible'));
})();