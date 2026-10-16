
(function(){
'use strict';
var cards=Array.from(document.querySelectorAll('.blog-post-card')), grid=cards[0]&&cards[0].parentElement;
function norm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function category(s){s=norm(s);if(/suplant|identidad|redes.sociales/.test(s))return 'identidad';if(/marca|falsific|marketplace|productos/.test(s))return 'marcas';if(/competencia.desleal/.test(s))return 'competencia';return 'evidencia';}
var topics={identidad:'Identidad y redes',marcas:'Marcas y marketplaces',competencia:'Competencia desleal',evidencia:'Evidencia digital'};
function dateFrom(url){var m=url.match(/(20\d{6})\.html/);return m?m[1]:'';}
cards.sort(function(a,b){return dateFrom(b.querySelector('a').href).localeCompare(dateFrom(a.querySelector('a').href));});
cards.forEach(function(card){
grid.appendChild(card);
var a=card.querySelector('a'),h=card.querySelector('h3'),im=card.querySelector('img'),date=dateFrom(a.href);
card.dataset.topic=category(a.href+' '+h.textContent);card.dataset.search=norm(card.textContent);
if(im){im.loading='lazy';im.decoding='async';}
var meta=document.createElement('span');meta.className='vd-card-meta';meta.textContent=topics[card.dataset.topic]+(date?' · '+date.slice(6,8)+'/'+date.slice(4,6)+'/'+date.slice(0,4):'');h.before(meta);
var read=document.createElement('span');read.className='vd-card-read';read.textContent='Leer artículo ↗';a.appendChild(read);
});
var search=document.getElementById('vd-blog-search'),filters=Array.from(document.querySelectorAll('[data-topic-filter]')),more=document.getElementById('vd-blog-more'),results=document.getElementById('vd-blog-results'),empty=document.getElementById('vd-blog-empty'),topic='all',limit=12;
function update(){var q=norm(search.value.trim()),matched=cards.filter(function(c){return(topic==='all'||c.dataset.topic===topic)&&(!q||c.dataset.search.includes(q));});cards.forEach(function(c){c.hidden=true;});matched.slice(0,limit).forEach(function(c){c.hidden=false;});results.textContent=matched.length+' artículos'+(q?' para «'+search.value.trim()+'»':'')+' · Mostrando '+Math.min(limit,matched.length);empty.hidden=matched.length!==0;more.hidden=matched.length<=limit;}
if(search){document.getElementById('vd-blog-tools').hidden=false;search.addEventListener('input',function(){limit=12;update();});filters.forEach(function(b){b.addEventListener('click',function(){topic=b.dataset.topicFilter;limit=12;filters.forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});update();});});more.addEventListener('click',function(){limit+=12;update();});update();}
var article=document.querySelector('.blog-article');
if(article){var headings=Array.from(article.querySelectorAll('h2'));if(headings.length>2){var toc=document.createElement('details');toc.className='vd-toc';var summary=document.createElement('summary');summary.textContent='En este artículo';toc.appendChild(summary);var ol=document.createElement('ol');headings.forEach(function(h,i){if(!h.id)h.id='apartado-'+(i+1);var li=document.createElement('li'),a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;li.appendChild(a);ol.appendChild(li);});toc.appendChild(ol);article.prepend(toc);}
var title=document.querySelector('h1'),meta=document.createElement('p');meta.className='vd-card-meta';meta.textContent=Math.max(1,Math.ceil(article.textContent.split(/\s+/).length/220))+' min de lectura · '+topics[category(location.pathname)];if(title)title.after(meta);}
})();
