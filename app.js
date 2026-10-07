const $=id=>document.getElementById(id);
const params=new URLSearchParams(location.search);
const property=window.PROPERTIES[params.get('home')]||window.PROPERTIES.flamingo;
$('hero-address').textContent=property.address;$('hero-location').textContent=property.location;
for(const [id,key] of [['fact-beds','beds'],['fact-area','area'],['fact-water','water'],['fact-year','year']])$(id).textContent=property[key];
$('hero-image').src=property.hero;$('hero-image').alt=property.photos[0].alt;
$('story-image').src=property.storyImage||property.hero;$('story-image').alt=`Poolside view of ${property.address}`;
$('social-image').src=property.social;$('social-image').alt=`Property spotlight for ${property.address}`;$('sample-download').href=property.social;$('sample-download').download=`${property.address.replaceAll(' ','-')}-Property-Spotlight.png`;
$('listing-source').href=property.source;$('attribution').textContent=property.attribution;
document.title=`${property.address} · A Marketing Vision | Palm Beach Real Estate Pros`;
const tabs=[...document.querySelectorAll('[role=tab]')];
function setStory(key,focus=false){const s=property.stories[key];$('story-kicker').textContent=s.kicker;$('story-title').textContent=s.title;$('story-copy').textContent=s.copy;$('story-panel').setAttribute('aria-labelledby',`tab-${key}`);tabs.forEach(t=>{let selected=t.dataset.story===key;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;if(selected&&focus)t.focus()})}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>setStory(tab.dataset.story));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();setStory(tabs[n].dataset.story,true)}})});setStory('lifestyle');
let photoIndex=0,playing=false,timer=null;
function showPhoto(i){photoIndex=(i+property.photos.length)%property.photos.length;const p=property.photos[photoIndex];$('film-image').src=p.src;$('film-image').alt=p.alt;$('film-kicker').textContent=p.title;$('film-title').textContent=property.address;$('film-subtitle').textContent=p.subtitle;$('film-count').textContent=`${String(photoIndex+1).padStart(2,'0')} / ${String(property.photos.length).padStart(2,'0')}`;const im=$('film-image');im.style.animation='none';requestAnimationFrame(()=>requestAnimationFrame(()=>{im.style.animation=''}))}
function play(on){clearInterval(timer);timer=null;playing=on;$('film-play').textContent=on?'Pause':'Play';if(on)timer=setInterval(()=>showPhoto(photoIndex+1),6500)}
function openFilm(i=0){showPhoto(i);$('film-dialog').showModal();document.body.style.overflow='hidden';play(!matchMedia('(prefers-reduced-motion: reduce)').matches)}
$('film-open').addEventListener('click',()=>openFilm());document.querySelector('.dialog-close').addEventListener('click',()=>$('film-dialog').close());$('film-dialog').addEventListener('close',()=>{play(false);document.body.style.overflow=''});$('film-dialog').addEventListener('click',e=>{if(e.target===$('film-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}});$('film-prev').addEventListener('click',()=>{play(false);showPhoto(photoIndex-1)});$('film-next').addEventListener('click',()=>{play(false);showPhoto(photoIndex+1)});$('film-play').addEventListener('click',()=>play(!playing));$('film-dialog').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){play(false);showPhoto(photoIndex+1)}if(e.key==='ArrowLeft'){play(false);showPhoto(photoIndex-1)}});
property.photos.forEach((p,i)=>{const b=document.createElement('button');b.className='gallery-item';b.setAttribute('aria-label',`View ${p.title.toLowerCase()}`);const im=document.createElement('img');im.src=p.src;im.alt=p.alt;im.loading='lazy';const label=document.createElement('span');label.textContent=`0${i+1} · ${p.title}`;b.append(im,label);b.addEventListener('click',()=>openFilm(i));$('gallery').append(b)});

$('spotlight-preview').src=property.social;
$('spotlight-open').addEventListener('click',()=>$('spotlight-dialog').showModal());
$('spotlight-close').addEventListener('click',()=>$('spotlight-dialog').close());
$('spotlight-dialog').addEventListener('click',e=>{if(e.target===$('spotlight-dialog'))$('spotlight-dialog').close()});
