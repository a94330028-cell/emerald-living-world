/* Emerald Living World — hotfix 3.0.4, safe overlay. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
function init(){
 const css=document.createElement('style');css.id='elw-hotfix-304';
 css.textContent=`
/* Correct Frontier link, which was not a <button> and lost the button styles */
body .introButtons a[href$="frontier.html"],body .introButtons a[href*="/frontier.html"]{
 display:inline-flex!important;align-items:center!important;justify-content:center!important;
 min-height:54px!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important;
 padding:12px 14px!important;border-radius:14px!important;
 border:1px solid #d9c189!important;background:linear-gradient(135deg,#3b3060,#674ca0)!important;
 color:#fff8dd!important;text-decoration:none!important;font-weight:900!important;font-size:14px!important;
 text-align:center!important;line-height:1.35!important;white-space:normal!important;
 box-shadow:0 5px 18px rgba(32,19,61,.32)!important;
}
body .introButtons a[href$="frontier.html"]:hover,body .introButtons a[href$="frontier.html"]:focus-visible{
 background:linear-gradient(135deg,#554187,#8064b9)!important;outline:2px solid #e7d194!important;outline-offset:2px!important;
}
body .introButtons>a{width:100%;align-self:stretch}
@media(max-width:560px){body .introButtons a[href$="frontier.html"]{width:100%!important;min-height:57px!important}}
/* Reveal and explain the game startup state without covering the controls. */
#elw-sim-hint{display:block;max-width:590px;margin:10px auto 0;padding:10px 14px;border:1px solid #59866f;border-radius:12px;color:#dfffe5;background:#163f35;font:700 12px/1.5 system-ui,sans-serif;text-align:center}
#elw-sim-hint[hidden]{display:none!important}
`;
 document.head.append(css);
 const landing=$('personalLanding'), watch=$('landingWorld'), solo=$('landingSolo'),resume=$('landingContinue');
 if(!landing||!watch||!solo)return;
 // Do not run a simulation until its user explicitly starts/continues.
 let selected=false,previous=null;
 const hint=document.createElement('p');hint.id='elw-sim-hint';hint.setAttribute('role','status');
 hint.textContent='Para assistir às IAs avançando no mapa, toque em “Assistir às IAs”. A simulação começa depois da sua escolha.';
 const buttons=landing.querySelector('.introButtons');
 (buttons||landing).after(hint);
 function update(){hint.hidden=!document.body.classList.contains('landing-active');}
 function start(){
   selected=true;
   // Let the existing handler choose/reset/restore bots first.
   setTimeout(()=>{
     if(document.body.classList.contains('landing-active')){update();return;}
     if(typeof window.emeraldResumeWorld==='function'){
       window.emeraldResumeWorld();
       const status=$('status');
       if(status&&status.textContent.includes('Pausado'))window.emeraldResumeWorld();
     }
     update();
   },150);
 }
 [watch,solo,resume].filter(Boolean).forEach(el=>el.addEventListener('click',start,{passive:true}));
 const dialog=$('worldSetupDialog');
 for(const id of ['setupStart','setupKeep']){const b=$(id);if(b)b.addEventListener('click',()=>setTimeout(()=>{if(!dialog?.open&&!document.body.classList.contains('landing-active'))window.emeraldResumeWorld?.()},160))}
 // Returning to the page should not silently resume user-paused sessions.
 const observe=new MutationObserver(update);observe.observe(document.body,{attributes:true,attributeFilter:['class']});
 update();
 // Lightweight self-check: if a started sim is still marked paused, offer a real user control.
 let warned=false;
 setInterval(()=>{
  if(!selected||document.body.classList.contains('landing-active')||warned)return;
  const status=$('status');if(status?.textContent?.includes('Pausado')){
    warned=true;
    const btn=document.createElement('button');btn.type='button';btn.textContent='▶ Retomar simulação';btn.className='introSecondary';
    btn.style.cssText='position:fixed;z-index:10100;left:50%;transform:translateX(-50%);bottom:95px;min-height:44px;padding:10px 22px;border-radius:14px;background:#b4edaa;color:#113d29;border:2px solid #94c985;font-weight:900;';
    btn.onclick=()=>{window.emeraldResumeWorld?.();btn.remove();warned=false;selected=false};
    document.body.append(btn);
  }
 },2500);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();