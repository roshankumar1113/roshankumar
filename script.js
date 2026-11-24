try{lucide.createIcons()}catch(e){}
gsap.registerPlugin(ScrollTrigger);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// theme
const root=document.documentElement;
$('#th').onclick=()=>{const l=getComputedStyle(root).colorScheme==='light';root.dataset.theme=l?'dark':'light'};
// clock
const tick=()=>{const t=new Date().toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'});$('#clock2').textContent='Local time '+t+' IST';$('#clock2b').textContent=t+' IST'};tick();setInterval(tick,30000);
let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
// cursor + magnetic + tilt
const cu=$('.cur'),rg=$('.ring'),qx=gsap.quickTo(rg,'x',{duration:.4,ease:'power3'}),qy=gsap.quickTo(rg,'y',{duration:.4,ease:'power3'});
addEventListener('pointermove',e=>{gsap.set(cu,{x:e.clientX,y:e.clientY});qx(e.clientX);qy(e.clientY)});
$$('[data-h]').forEach(el=>{el.addEventListener('mouseenter',()=>rg.classList.add('h'));el.addEventListener('mouseleave',()=>rg.classList.remove('h'))});
$$('.mag').forEach(el=>{el.addEventListener('pointermove',e=>{const b=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-b.left-b.width/2)*.25,y:(e.clientY-b.top-b.height/2)*.35,duration:.4})});el.addEventListener('pointerleave',()=>gsap.to(el,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'}))});
$$('.card').forEach(el=>{el.addEventListener('pointermove',e=>{const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width,y=(e.clientY-b.top)/b.height;el.style.setProperty('--x',x*100+'%');el.style.setProperty('--y',y*100+'%');if(!el.classList.contains('pr'))gsap.to(el,{rotateY:(x-.5)*8,rotateX:(.5-y)*8,transformPerspective:800,duration:.4})});el.addEventListener('pointerleave',()=>gsap.to(el,{rotateX:0,rotateY:0,duration:.6}))});
// reveals
$$('.rv:not(h2)').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
gsap.to('#prog',{scaleX:1,ease:'none',scrollTrigger:{scrub:.3,start:0,end:'max'}});
gsap.to('.tl .fill',{scaleY:1,ease:'none',scrollTrigger:{trigger:'.tl',start:'top 70%',end:'bottom 70%',scrub:true}});
gsap.to('.ph img',{yPercent:-9,ease:'none',scrollTrigger:{trigger:'.ph',scrub:true}});
gsap.from('.giant',{yPercent:40,opacity:0,scrollTrigger:{trigger:'.giant',start:'top 100%',end:'top 60%',scrub:true}});
$$('section[id]').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 50%',end:'bottom 50%',onToggle:v=>{const a=$(`nav a[href="#${s.id}"]`);a&&a.classList.toggle('on',v.isActive)}}));
$('#up').onclick=()=>gsap.to(window,{scrollTo:0,duration:0}) && scrollTo({top:0,behavior:'smooth'});
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

// hero extras
$('#hp').src=$('.ph img').src;
const ri=$('.rwi'),rtl=gsap.timeline({repeat:-1,delay:3});[1,2,3].forEach(i=>rtl.to(ri,{yPercent:-25*i,duration:.8,ease:'power4.inOut'},'+=1.8'));rtl.set(ri,{yPercent:0});
$$('.hs b[data-n]').forEach(b=>{const o={v:0},n=+b.dataset.n;ScrollTrigger.create({trigger:b,start:'top 95%',once:true,onEnter:()=>gsap.to(o,{v:n,duration:1.6,delay:.4,ease:'power2.out',onUpdate:()=>b.textContent=Math.round(o.v)})})});
const hero=$('.hero');hero.addEventListener('pointermove',e=>{const b=hero.getBoundingClientRect();hero.style.setProperty('--mx',(e.clientX-b.left)+'px');hero.style.setProperty('--my',(e.clientY-b.top)+'px');$$('.fl').forEach(f=>gsap.to(f,{x:mx*+f.dataset.d*2,y:my*+f.dataset.d*2,duration:.9,ease:'power3'}))});
gsap.to('.pt',{y:-60,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
// certificate lightbox
const lb=$('#lb');lb.querySelector('img').src=$('#certimg').src;
const open=e=>{e&&e.preventDefault();lb.style.display='grid';gsap.fromTo('#lb img',{scale:.9,opacity:0},{scale:1,opacity:1,duration:.5,ease:'power3.out'})};
$('#cert').onclick=open;$('#zoom').onclick=open;lb.onclick=()=>lb.style.display='none';addEventListener('keydown',e=>{if(e.key==='Escape')lb.style.display='none'});

// split headings
$$('h2[data-sp]').forEach(h=>{const tw=document.createTreeWalker(h,NodeFilter.SHOW_TEXT),ns=[];while(tw.nextNode())ns.push(tw.currentNode);ns.forEach(n=>{const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.append(' ');return}const w=document.createElement('span');w.className='w';const i=document.createElement('span');i.textContent=p;w.append(i);f.append(w)});n.replaceWith(f)});gsap.from(h.querySelectorAll('.w>span'),{yPercent:115,rotate:4,duration:1,stagger:.06,ease:'power4.out',scrollTrigger:{trigger:h,start:'top 88%',once:true}})});
// marquee speeds up with scroll
let msp=1;ScrollTrigger.create({onUpdate:s=>{msp=Math.min(1+Math.abs(s.getVelocity())/300,8)}});
gsap.ticker.add(()=>{msp+=(1-msp)*.06;const a=$('.mq div').getAnimations()[0];if(a)a.playbackRate=msp});
// mobile menu
const mn=$('#menu'),mb=$('#mb');let mo=false;
const tm=o=>{mo=o;mn.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';if(o)gsap.fromTo('#menu a',{y:50,opacity:0},{y:0,opacity:1,stagger:.06,duration:.7,ease:'power3.out'})};
mb.onclick=()=>tm(!mo);$$('#menu a').forEach(a=>a.addEventListener('click',()=>tm(false)));addEventListener('resize',()=>{if(innerWidth>900&&mo)tm(false)});
// utkala demo
(()=>{const box=$('#chat'),wave=$('.wv'),lbl=$('.lbl'),sl=ms=>new Promise(r=>setTimeout(r,ms));
wave.innerHTML=Array.from({length:34},(_,i)=>`<i style="--i:${i};--h:${10+(i*37%30)}px"></i>`).join('');
const sc=[['u','Hello! Can you hear me?'],['a','Loud and clear. What would you like to talk about today?'],['u','Explain AI agents in simple words.'],['a','An AI agent reasons about a task, picks the right tools, and takes steps until the goal is done.']];
const type=async(el,s)=>{for(let i=1;i<=s.length;i++){el.textContent=s.slice(0,i);box.scrollTop=box.scrollHeight;await sl(s.length>40?16:26)}};
async function run(){for(;;){box.innerHTML='';for(const[w,s]of sc){const m=document.createElement('div');m.className='m '+w;box.append(m);gsap.from(m,{y:16,opacity:0,duration:.4});box.scrollTop=box.scrollHeight;
if(w==='u'){wave.classList.add('on');lbl.textContent='Listening…';await sl(1200);wave.classList.remove('on');await type(m,s)}
else{lbl.textContent='Thinking…';m.innerHTML='<i class="td"></i><i class="td"></i><i class="td"></i>';await sl(1100);lbl.textContent='Speaking…';wave.classList.add('on');await type(m,s);wave.classList.remove('on')}
await sl(700)}lbl.textContent='Tap to talk';await sl(2800)}}
let st=0;ScrollTrigger.create({trigger:'#utkal',start:'top 70%',onEnter:()=>{if(!st){st=1;run()}}});
gsap.fromTo('.dev',{rotateY:-16,rotateX:7,y:70},{rotateY:0,rotateX:0,y:0,ease:'none',scrollTrigger:{trigger:'.ur',start:'top 95%',end:'center 55%',scrub:true}});
})();
// preloader → intro
const cnt={v:0},tl=gsap.timeline();
tl.to(cnt,{v:100,duration:1.6,ease:'power2.inOut',onUpdate:()=>$('#pre .n').textContent=Math.round(cnt.v)})
 .to('#pre',{yPercent:-100,duration:1,ease:'power4.inOut'})
 .set('#pre',{display:'none'})
 .from('.hero h1 .ln>span',{yPercent:110,duration:1.3,stagger:.15,ease:'power4.out'},'-=.5')
 .from('.hero .chip,.hero .hi,.hero .rot,.hero .role,.hero .cta,.hero .soc2',{y:30,opacity:0,stagger:.1,duration:.9,ease:'power3.out'},'-=1')
 .from('.pt',{scale:.5,opacity:0,rotate:-40,duration:1.5,ease:'expo.out'},'-=1.2')
 .from('.blob,.orbit',{opacity:0,duration:1.6},'-=1.5')
 .from('.fl',{scale:0,opacity:0,stagger:.12,ease:'back.out(2.2)',duration:.8},'-=.8')
 .from('.hstats .hs',{y:40,opacity:0,stagger:.1,duration:.8},'-=.6')
 .from('header',{y:-80,opacity:0,duration:.9,ease:'power3.out'},'-=.9');
