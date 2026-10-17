var COL=['#0f4c45','#0e1a2b','#7a3b2e','#4b3f72','#8a6a2c','#24507a'];
var JOBS=[
{id:1,t:'Junior Accountant Trainee',c:'LedgerLane',loc:'Chandigarh',type:'Full-time',field:'Finance',pay:'₹2.4–3.0 LPA',exp:'0 years',desc:'Learn bookkeeping, GST filing and reconciliation with a small finance team. Mentorship from a chartered accountant.',skills:['Excel','Tally','Communication']},
{id:2,t:'Content Writing Intern',c:'Pixelpost',loc:'Remote',type:'Internship',field:'Marketing',pay:'₹8,000/month',exp:'0 years',desc:'Write blogs and social posts for tech brands. Portfolio samples welcome but not required.',skills:['Writing','SEO','Research']},
{id:3,t:'Graduate Engineer Trainee',c:'Brightvolt',loc:'Shimla',type:'Full-time',field:'Engineering',pay:'₹3.2–4.0 LPA',exp:'0 years',desc:'Six-month training programme across design and site operations, then a permanent role.',skills:['AutoCAD','Teamwork','Problem solving']},
{id:4,t:'Customer Support Associate',c:'Helpdeck',loc:'Remote',type:'Full-time',field:'Operations',pay:'₹2.2–2.8 LPA',exp:'0 years',desc:'Help customers by chat and email. Full training provided; flexible shifts.',skills:['Communication','Typing','Empathy']},
{id:5,t:'UI/UX Design Intern',c:'Studio Nine',loc:'Remote',type:'Internship',field:'Design',pay:'₹12,000/month',exp:'0 years',desc:'Support the design team with wireframes and Figma prototypes on live client projects.',skills:['Figma','Research','Prototyping']},
{id:6,t:'Data Entry Analyst',c:'Numera',loc:'Chandigarh',type:'Full-time',field:'Operations',pay:'₹2.0–2.6 LPA',exp:'0 years',desc:'Clean, validate and report on business data with Excel and simple dashboards.',skills:['Excel','Attention to detail','Typing']},
{id:7,t:'Sales Development Trainee',c:'Growthly',loc:'Delhi',type:'Full-time',field:'Marketing',pay:'₹3.0–3.6 LPA + incentives',exp:'0 years',desc:'Reach out to new customers, book demos and learn consultative selling.',skills:['Communication','Sales','CRM']},
{id:8,t:'Junior Web Developer',c:'Codekraft',loc:'Remote',type:'Full-time',field:'Engineering',pay:'₹3.6–5.0 LPA',exp:'0–1 years',desc:'Build features in HTML, CSS and JavaScript. Share a GitHub or project link when applying.',skills:['JavaScript','HTML/CSS','Git']}];
var SKILLS=['Excel','Communication','Figma','JavaScript','Writing','Teamwork','Research','Typing'];
var STAGES=['Applied','Reviewed','Interview','Offer'];
var S={screen:'welcome',tab:'home',q:'',type:'All',loc:'All',saved:[],apps:[],sel:1,sheet:false,toast:'',
 user:{name:'',college:'',skills:[],resume:''},errs:{}};
var $=function(i){return document.getElementById(i)};
function persist(){try{localStorage.setItem('firstday',JSON.stringify({user:S.user,saved:S.saved,apps:S.apps}))}catch(x){}}
(function(){try{var d=JSON.parse(localStorage.getItem('firstday')||'null');if(d&&d.user){S.user=d.user;S.saved=d.saved||[];S.apps=d.apps||[];if(S.user.name)S.screen='tab'}}catch(x){}})();
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function go(s,t){S.screen=s;if(t)S.tab=t;S.sheet=false;render();window.scrollTo(0,0)}
function toast(m){S.toast=m;render();setTimeout(function(){S.toast='';render()},2200)}
function pct(){var u=S.user,p=0;if(u.name)p+=20;if(u.college)p+=20;if(u.skills.length>=3)p+=20;if(u.resume)p+=40;return p}
function filtered(){return JOBS.filter(function(j){
 var q=S.q.toLowerCase();
 return (!q||(j.t+j.c+j.field+j.skills.join(' ')).toLowerCase().indexOf(q)>-1)&&(S.type==='All'||j.type===S.type)&&(S.loc==='All'||(S.loc==='Remote'?j.loc==='Remote':j.loc!=='Remote'))})}
function card(j){var sv=S.saved.indexOf(j.id)>-1,ap=S.apps.some(function(a){return a.id===j.id});
 return '<div class="job'+(j.id===S.sel&&S.screen==='detail'?' sel':'')+'" data-open="'+j.id+'" tabindex="0" role="button" aria-label="'+esc(j.t)+' at '+esc(j.c)+'"><div class="logo" style="background:'+COL[j.id%6]+'">'+j.c[0]+'</div><h3 style="padding-right:30px">'+esc(j.t)+'</h3><small>'+esc(j.c)+' • '+esc(j.loc)+'</small>'+
 '<button class="save" data-save="'+j.id+'" aria-label="'+(sv?'Remove from saved':'Save job')+'">'+(sv?'♥':'♡')+'</button>'+
 '<div class="meta"><span class="pill">'+j.type+'</span><span class="pill y">'+j.pay+'</span><span class="pill g">'+j.exp+'</span>'+(ap?'<span class="pill">Applied</span>':'')+'</div></div>'}
function chips(list,cur,attr){return '<div class="chips">'+list.map(function(x){return '<button class="chip'+(x===cur?' on':'')+'" '+attr+'="'+x+'">'+x+'</button>'}).join('')+'</div>'}
function vHome(){var l=filtered();
 return '<h2>'+(S.user.name?'Hi '+esc(S.user.name.split(' ')[0])+', find your first job':'Find your first job')+'</h2><input type="search" id="q" placeholder="Search role, company or skill" value="'+esc(S.q)+'" aria-label="Search jobs">'+
 chips(['All','Full-time','Internship'],S.type,'data-type')+chips(['All','Remote','On-site'],S.loc==='On-site'?'On-site':S.loc,'data-loc')+
 '<p style="font-size:.85rem;color:#5b6578;margin:2px 0">'+l.length+' fresher-friendly '+(l.length===1?'job':'jobs')+'</p>'+
 (l.length?l.map(card).join(''):'<div class="empty">No jobs match these filters.<br>Clear a filter or try a broader search.<button class="btn alt" data-clear>Clear filters</button></div>')}
function vDetail(){var j=JOBS.filter(function(x){return x.id===S.sel})[0],ap=S.apps.some(function(a){return a.id===j.id}),sv=S.saved.indexOf(j.id)>-1;
 return '<button class="back" data-back>‹ Back to jobs</button><div class="logo" style="background:'+COL[j.id%6]+';width:52px;height:52px;border-radius:14px;display:grid;place-items:center;color:#fff;font-weight:800;font-size:1.4rem">'+j.c[0]+'</div>'+
 '<h2 style="margin-top:10px">'+esc(j.t)+'</h2><small style="color:#5b6578">'+esc(j.c)+' • '+esc(j.loc)+'</small>'+
 '<div class="meta" style="display:flex;gap:6px;flex-wrap:wrap;margin:10px 0"><span class="pill">'+j.type+'</span><span class="pill y">'+j.pay+'</span><span class="pill g">Experience: '+j.exp+'</span></div>'+
 '<h3>About the role</h3><p style="margin:4px 0 12px;font-size:.92rem">'+esc(j.desc)+'</p><h3>Skills to have</h3><div class="meta" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">'+j.skills.map(function(s){var has=S.user.skills.indexOf(s)>-1;return '<span class="pill'+(has?'':' g')+'">'+(has?'✓ ':'')+s+'</span>'}).join('')+'</div>'+
 '<button class="btn" data-apply="'+j.id+'" '+(ap?'disabled':'')+'>'+(ap?'Applied':'Apply now')+'</button><button class="btn alt" data-save="'+j.id+'">'+(sv?'♥ Saved':'♡ Save job')+'</button>'}
function vSaved(){var l=JOBS.filter(function(j){return S.saved.indexOf(j.id)>-1});
 return '<h2>Saved jobs</h2>'+(l.length?l.map(card).join(''):'<div class="empty">Nothing saved yet.<br>Tap the heart on a job to keep it here.<button class="btn" data-tab="home">Browse jobs</button></div>')}
function vApps(){
 return '<h2>My applications</h2>'+(S.apps.length?S.apps.map(function(a){var j=JOBS.filter(function(x){return x.id===a.id})[0];
 return '<div class="job" style="cursor:default"><div class="logo" style="background:'+COL[j.id%6]+'">'+j.c[0]+'</div><h3>'+esc(j.t)+'</h3><small>'+esc(j.c)+' • Applied '+a.date+'</small>'+
 '<div class="steps" aria-hidden="true">'+STAGES.map(function(s,i){return '<i class="'+(i<=a.stage?'d':'')+'"></i>'}).join('')+'</div>'+
 '<div style="display:flex;justify-content:space-between;font-size:.8rem;margin-top:4px"><b style="color:#075e53">'+STAGES[a.stage]+'</b><span style="color:#5b6578">Resume: '+esc(a.resume)+'</span></div>'+
 (a.stage<3?'<button class="btn alt" style="padding:8px;font-size:.8rem" data-adv="'+a.id+'">Demo: move to next stage</button>':'<p style="color:#075e53;font-size:.85rem;margin:6px 0 0">🎉 Offer received. Congratulations!</p>')+'</div>'}).join(''):
 '<div class="empty">You haven’t applied anywhere yet.<br>Your applications and their status will show up here.<button class="btn" data-tab="home">Find jobs</button></div>')}
function vProfile(){var u=S.user,p=pct();
 return '<h2>My profile</h2><div class="job" style="cursor:default"><div style="display:flex;justify-content:space-between;font-size:.85rem"><b>Profile strength</b><b>'+p+'%</b></div><div class="bar" role="progressbar" aria-valuenow="'+p+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+p+'%"></i></div>'+
 '<div style="margin-top:8px"><div class="check'+(u.name?' ok':'')+'">'+(u.name?'✓':'○')+' Add your name</div><div class="check'+(u.college?' ok':'')+'">'+(u.college?'✓':'○')+' Add your college</div><div class="check'+(u.skills.length>=3?' ok':'')+'">'+(u.skills.length>=3?'✓':'○')+' Pick 3 or more skills</div><div class="check'+(u.resume?' ok':'')+'">'+(u.resume?'✓':'○')+' Upload your resume</div></div></div>'+
 '<h3 style="margin-top:12px">Basic info</h3><input type="text" id="pname" placeholder="Full name" value="'+esc(u.name)+'" style="margin-top:6px" aria-label="Full name"><input type="text" id="pcol" placeholder="College and degree (e.g. HPU, B.Com)" value="'+esc(u.college)+'" style="margin-top:8px" aria-label="College and degree">'+
 '<h3 style="margin-top:14px">Skills</h3><div class="chips" style="flex-wrap:wrap">'+SKILLS.map(function(s){return '<button class="chip'+(u.skills.indexOf(s)>-1?' on':'')+'" data-skill="'+s+'">'+s+'</button>'}).join('')+'</div>'+
 '<h3 style="margin-top:8px">Resume</h3>'+(u.resume?'<div class="job" style="cursor:default;margin-top:6px">📄 '+esc(u.resume)+'<button class="save" data-rmres style="font-size:.8rem;color:#c23b17">Remove</button></div>':'<p style="font-size:.85rem;color:#5b6578;margin:4px 0">PDF or Word, up to 5 MB.</p>')+
 '<label class="btn alt" style="text-align:center;cursor:pointer" for="file">'+(u.resume?'Replace resume':'Upload resume')+'</label><input type="file" id="file" accept=".pdf,.doc,.docx" style="position:absolute;opacity:0;width:1px;height:1px"><button class="btn alt" data-reset style="margin-top:18px">Reset demo data</button>'}
function vSheet(){var j=JOBS.filter(function(x){return x.id===S.sel})[0],u=S.user;
 return '<div class="sheet"><div role="dialog" aria-label="Apply"><h3 style="font-size:1.15rem">Apply to '+esc(j.c)+'</h3><p style="font-size:.85rem;color:#5b6578;margin:4px 0 10px">'+esc(j.t)+'</p>'+
 (u.resume?'<div class="job" style="cursor:default;margin:0">📄 '+esc(u.resume)+'<br><small>Your saved resume will be sent</small></div>':'<div class="err" style="margin:0 0 6px">Add a resume before you apply.</div><label class="btn alt" style="text-align:center;cursor:pointer;margin:0" for="file2">Upload resume</label><input type="file" id="file2" accept=".pdf,.doc,.docx" style="position:absolute;opacity:0;width:1px;height:1px">')+
 '<input type="text" id="note" placeholder="Add a short note (optional)" style="margin-top:10px" aria-label="Note to recruiter"><button class="btn" data-submit '+(u.resume?'':'disabled')+'>Submit application</button><button class="btn alt" data-close>Cancel</button></div></div>'}
function vWelcome(){return '<div class="welcome"><div style="font:400 1.7rem Instrument Serif,Georgia,serif;letter-spacing:.02em;color:#e0c488;position:absolute;top:30px">Firstday</div><h2>Your first job starts here.</h2><p>Jobs that don’t ask for experience. One profile, one tap to apply.</p><input type="text" id="wname" placeholder="Your name" aria-label="Your name" value="'+esc(S.user.name)+'">'+(S.errs.w?'<div class="err" style="color:#ffd2c4">'+S.errs.w+'</div>':'')+'<button class="btn" style="background:#d9b76e;color:#0e1a2b;box-shadow:none" data-start>Get started</button><button class="btn" style="background:transparent;border:1px solid rgba(255,255,255,.5)" data-guest>Browse as guest</button></div>'}
function toastH(){return S.toast?'<div class="toast" role="status">'+S.toast+'</div>':''}
function render(){persist();var el=$('app'),keepQ=document.activeElement&&document.activeElement.id==='q',l0=document.querySelector('.list'),lt=l0?l0.scrollTop:0;
 if(S.screen==='welcome'){el.className='app is-welcome';el.innerHTML=vWelcome()+toastH();return}
 el.className='app';
 var btns=[['home','⌕','Jobs'],['saved','♡','Saved'],['apps','☰','Applied'],['profile','☺','Profile']].map(function(t){var on=S.tab===t[0];return '<button data-tab="'+t[0]+'" class="'+(on?'on':'')+'"'+(on?' aria-current="page"':'')+'><em>'+t[1]+'</em> <span>'+t[2]+(t[0]==='apps'&&S.apps.length?' ('+S.apps.length+')':'')+'</span></button>'}).join('');
 var b=S.tab==='home'?'<div class="split'+(S.screen==='detail'?' show-det':'')+'"><div class="list">'+vHome()+'</div><div class="det">'+(S.sel?vDetail():'<div class="empty">Select a job to see details.</div>')+'</div></div>':S.tab==='saved'?vSaved():S.tab==='apps'?vApps():vProfile();
 el.innerHTML='<aside class="side"><div class="brand">Firstday</div><nav aria-label="Main">'+btns+'</nav><a class="cs" href="case-study.html">Read the case study</a></aside><main class="main">'+b+'</main><nav class="tabs" aria-label="Main">'+btns+'</nav>'+(S.sheet?vSheet():'')+toastH();
 var l1=document.querySelector('.list');if(l1)l1.scrollTop=lt;
 if(keepQ){var q=$('q');if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length)}}}
function addRes(f){if(!f)return;if(f.size>5*1024*1024){toast('File is over 5 MB. Choose a smaller file.');return}S.user.resume=f.name;toast('Resume uploaded');}
$('app').addEventListener('click',function(e){var t=e.target,d=function(a){var n=t.closest('['+a+']');return n?n.getAttribute(a):null};
 if(t.closest('[data-save]')){var id=+d('data-save'),i=S.saved.indexOf(id);i>-1?S.saved.splice(i,1):S.saved.push(id);e.stopPropagation();return render()}
 var o=d('data-open');if(o){S.sel=+o;return go('detail','home')}
 var tb=d('data-tab');if(tb)return go('tab','home'),S.screen='tab',S.tab=tb,render();
 var ty=d('data-type');if(ty){S.type=ty;return render()}
 var lc=d('data-loc');if(lc){S.loc=lc;return render()}
 if(t.closest('[data-clear]')){S.q='';S.type='All';S.loc='All';return render()}
 if(t.closest('[data-back]'))return go('tab','home');
 var ap=d('data-apply');if(ap){S.sheet=true;return render()}
 if(t.closest('[data-close]')){S.sheet=false;return render()}
 if(t.closest('[data-submit]')){var d0=new Date();S.apps.unshift({id:S.sel,stage:0,date:d0.getDate()+' '+d0.toLocaleString('en',{month:'short'}),resume:S.user.resume});S.sheet=false;S.screen='tab';S.tab='apps';render();return toast('Application submitted')}
 if(t.closest('[data-reset]')){try{localStorage.removeItem('firstday')}catch(x){}S.saved=[];S.apps=[];S.user={name:'',college:'',skills:[],resume:''};S.screen='welcome';S.tab='home';return render()}var ad=d('data-adv');if(ad){S.apps.forEach(function(a){if(a.id==+ad&&a.stage<3)a.stage++});return render()}
 var sk=d('data-skill');if(sk){var k=S.user.skills.indexOf(sk);k>-1?S.user.skills.splice(k,1):S.user.skills.push(sk);return render()}
 if(t.closest('[data-rmres]')){S.user.resume='';return render()}
 if(t.closest('[data-start]')){var n=$('wname').value.trim();if(!n){S.errs.w='Enter your name to continue.';return render()}S.errs={};S.user.name=n;S.screen='tab';S.tab='home';return render()}
 if(t.closest('[data-guest]')){S.screen='tab';S.tab='home';return render()}});
$('app').addEventListener('input',function(e){var i=e.target.id;if(i==='q'){S.q=e.target.value;render()}if(i==='pname')S.user.name=e.target.value;if(i==='pcol')S.user.college=e.target.value});
$('app').addEventListener('focusout',function(e){if(e.target.id==='pname'||e.target.id==='pcol')render()});
$('app').addEventListener('change',function(e){if(e.target.type==='file')addRes(e.target.files[0]);if(e.target.type==='file')render()});
$('app').addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.open)e.target.click()});
render();
