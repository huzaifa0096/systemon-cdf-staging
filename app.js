(()=>{'use strict';
const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)];
const logo=qsa('.official-cdf-image');logo.forEach(img=>{const onload=()=>img.classList.add('loaded');if(img.complete&&img.naturalWidth)onload();else img.addEventListener('load',onload,{once:true})});
const menu=qs('[data-menu]'),mobile=qs('#mobileNav');const closeMenu=()=>{if(mobile){mobile.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation')}};if(menu&&mobile){menu.addEventListener('click',()=>{const on=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(on));menu.setAttribute('aria-label',on?'Close navigation':'Open navigation')});mobile.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()})}
qsa('.nav details').forEach(d=>document.addEventListener('click',e=>{if(!d.contains(e.target))d.open=false}));document.addEventListener('keydown',e=>{if(e.key!=='Escape'||qs('#searchDialog')?.open)return;if(mobile?.classList.contains('open')){closeMenu();menu?.focus()}const expanded=qs('.nav details[open]');if(expanded){expanded.open=false;expanded.querySelector('summary')?.focus()}});
const cmsIndexEl=qs('#cmsSearchIndex');let cmsIndex=[];if(cmsIndexEl){try{cmsIndex=JSON.parse(cmsIndexEl.textContent)}catch(e){}}
const searchData=[['Staff and board','CDF executives directors leadership governance','about.html#leadership'],['CDF history and strategy','Freedom Fund CARE history strategic framework','about.html#history'],['Funding guide','Grant eligibility process and application information','programs.html#funding-guide'],['Native American Food Economies','Cooperative programs and webinar recordings','programs.html#program-details'],['Official CDF content directory','Pages events newsletter news archive','resources.html#official-directory'],['Annual reports and research','Sector reports equity inclusion studies','impact.html#research'],['Contact CDF','Email phone address Washington DC','get-involved.html#contact'],['About CDF','Mission, history and cooperative model','about.html'],['Funds & grants','Education, rural development, disaster recovery, application information','programs.html#grants'],['Cooperative Development Fund','Research, technical assistance, development','programs.html#grants'],['Cooperative Education Fund','Research, education and scholarships','programs.html#grants'],['Disaster Recovery Fund','Cooperative recovery grants','programs.html#grants'],['Rural Cooperative Grant','Rural cooperative development grant','programs.html#grants'],['Cooperative Leaders & Scholars','Fellowship, leadership development, networking','programs.html#programs'],['Home Care Cooperative Initiative','Worker-owned home care','programs.html#programs'],['Affordable Housing Initiative','Shared-equity housing, affordable ownership','programs.html#programs'],['Co-op 5K','Community cooperative event','programs.html'],['Impact','Stories, 2026 USDA grant and fellowship','impact.html'],['News & announcements','Co-op news and grant updates','news.html'],['Resources & archive','Reports, history, housing catalog, Hall of Fame','resources.html'],['Careers','Official U.S. Co-ops employment and RFP listings','careers.html'],['Hall of Fame','Cooperative Hall of Fame and inductees','https://www.heroes.coop/'],['Donate','Support CDF through their secure payment platform','https://wl.donorperfect.net/weblink/weblink.aspx?id=189&name=E332248'],['Get involved','Support, giving, participation and partnerships','get-involved.html'],['Editor demonstration','Browser-local CMS concept (no live sign-in)','editor-demo.html'],...cmsIndex];
const dlg=qs('#searchDialog'),open=qs('#searchOpen'),close=qs('#searchClose'),search=qs('#siteSearch'),results=qs('#searchResults'),summary=qs('#searchSummary');function doSearch(){if(!results)return;const query=(search.value||'').trim().toLowerCase(),parts=query.split(/\s+/).filter(Boolean);const filtered=searchData.filter(item=>parts.every(p=>(item[0]+' '+item[1]).toLowerCase().includes(p))).slice(0,12);results.replaceChildren();filtered.forEach(([title,desc,link])=>{const li=document.createElement('li'),a=document.createElement('a'),strong=document.createElement('strong'),small=document.createElement('small');a.href=link;strong.textContent=title;small.textContent=desc;a.append(strong,small);li.append(a);results.append(li)});if(!filtered.length){const li=document.createElement('li');li.className='micro';li.style.padding='17px 10px';li.textContent='No results. Try “grant”, “leadership” or “donate”.';results.append(li)}summary.textContent=`${filtered.length} matching ${filtered.length===1?'destination':'destinations'} found.`}if(dlg&&open&&close&&search){open.addEventListener('click',()=>{closeMenu();search.value='';doSearch();dlg.showModal();search.focus()});close.addEventListener('click',()=>dlg.close());search.addEventListener('input',doSearch);dlg.addEventListener('keydown',e=>{if(e.key==='Escape'&&dlg.open){e.preventDefault();dlg.close()}});dlg.addEventListener('close',()=>open.focus());dlg.addEventListener('click',e=>{if(e.target===dlg){const r=dlg.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close()}});results.addEventListener('click',e=>{if(e.target.closest('a'))dlg.close()})}
const filterBtns=qsa('[data-filter]'),cards=qsa('[data-category]'),count=qs('#filterCount');function filterCards(f){cards.forEach(c=>c.hidden=f!=='all'&&c.dataset.category!==f);filterBtns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===f)));if(count)count.textContent=`Showing ${cards.filter(c=>!c.hidden).length} of ${cards.length} programs, funds and events.`}filterBtns.forEach(b=>b.addEventListener('click',()=>filterCards(b.dataset.filter)));if(cards.length)filterCards('all');
const newsInput = qs('#newsSearch');
if (newsInput) {
  const newsRows = qsa('[data-news]');
  const newsCount = qs('#newsCount');
  const filterNews = () => {
    const terms = newsInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    for (const row of newsRows) {
      const text = (row.textContent + ' ' + row.dataset.news).toLowerCase();
      row.hidden = !terms.every(term => text.includes(term));
    }
    const count = newsRows.filter(row => !row.hidden).length;
    newsCount.textContent = count
      ? `Showing ${count} of ${newsRows.length} stories.`
      : 'No matching stories. Try another search or browse the full archive.';
  };
  newsInput.addEventListener('input', filterNews);
  filterNews();
}
const directoryInput = qs('#directorySearch');
if (directoryInput) {
  const groups = qsa('.directory-groups details');
  const directoryCount = qs('#directoryCount');
  directoryInput.closest('label').hidden = false;
  directoryInput.addEventListener('input', () => {
    const terms = directoryInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const group of groups) {
      let matches = 0;
      for (const entry of group.querySelectorAll('li')) {
        entry.hidden = !terms.every(term => entry.textContent.toLowerCase().includes(term));
        if (!entry.hidden) matches += 1;
      }
      group.hidden = matches === 0;
      group.open = terms.length > 0 && matches > 0;
      count += matches;
    }
    directoryCount.textContent = terms.length ? `${count} matching links` : '';
  });
}
const topBtn=qs('#backTop');if(topBtn){const scrollCheck=()=>topBtn.classList.toggle('shown',scrollY>500);addEventListener('scroll',scrollCheck,{passive:true});scrollCheck();topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}))}
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const revelations=qsa('.reveal');if('IntersectionObserver' in window&&!reduced){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{rootMargin:'0px 0px -35px 0px',threshold:.08});revelations.forEach(el=>obs.observe(el))}else revelations.forEach(el=>el.classList.add('visible'));
const form=qs('#editorForm');if(form){const items=['Label','Title','Body'];const inputs=items.map(n=>qs('#edit'+n));const outputs=items.map(n=>qs('#preview'+n));const defaults=inputs.map(x=>x.defaultValue);const status=qs('#editorStatus');function render(){inputs.forEach((inp,i)=>outputs[i].textContent=inp.value.trim()||'…')}const key='systemon-cdf-editor-demo-v3';try{const existing=JSON.parse(localStorage.getItem(key)||'null');if(Array.isArray(existing)&&existing.length===3)inputs.forEach((inp,i)=>inp.value=String(existing[i]).slice(0,inp.maxLength))}catch(e){}render();inputs.forEach(x=>x.addEventListener('input',render));form.addEventListener('submit',e=>{e.preventDefault();try{localStorage.setItem(key,JSON.stringify(inputs.map(x=>x.value)));status.textContent='Saved in this browser only.'}catch(e){status.textContent='Preview updated; browser storage unavailable.'}render()});qs('#editorReset')?.addEventListener('click',()=>{inputs.forEach((inp,i)=>inp.value=defaults[i]);try{localStorage.removeItem(key)}catch(e){}render();status.textContent='Restored the original sample content.'});qs('#editorExport')?.addEventListener('click',()=>{const data={type:'CDF proposal content draft',category:inputs[0].value,title:inputs[1].value,description:inputs[2].value,createdAt:new Date().toISOString(),demoOnly:true};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='cdf-content-draft.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);status.textContent='JSON draft exported. Not published.'})}
})();