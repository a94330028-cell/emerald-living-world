/* Emerald Living World — 3.0.5: one header on every page. */
(()=>{'use strict';
function fix(){
 if(document.getElementById('elw-one-header-style'))return;
 const style=document.createElement('style');style.id='elw-one-header-style';
 style.textContent=`
/* Premium header is the ONLY global masthead. */
body.elw-premium header.elw-premium-topbar:not(#elw-premium-topbar),
body.elw-premium .portal-header,
body.elw-premium header.arenaHeader,
body.elw-premium header.frontierHeader,
body.elw-premium header.frontier-header{display:none!important}
body.elw-premium .elw-premium-heading{margin-top:clamp(12px,2vw,24px)!important}
body.elw-premium .arenaContainer{padding-top:clamp(10px,2vw,22px)!important}
body.elw-premium .elw-top-actions .elw-explore-action,
body.elw-premium .elw-top-actions .elw-arena-theme{display:inline-flex;align-items:center;justify-content:center;min-height:40px;max-width:110px;padding:7px 11px;border-radius:11px;background:#153d38;border:1px solid #487965;color:#e8ffeb;font-size:12px;font-weight:800;text-decoration:none;white-space:nowrap;cursor:pointer}
body.elw-premium .elw-top-actions .elw-arena-theme{max-width:95px}
@media(max-width:750px){body.elw-premium .elw-top-actions .elw-explore-action{display:none!important}}
@media(max-width:540px){body.elw-premium .elw-top-actions .elw-arena-theme{min-height:39px;font-size:11px;padding:6px 8px;max-width:50px;overflow:hidden}body.elw-premium .elw-top-actions .elw-account-action{min-width:39px}}
`;document.head.append(style);
 const actions=document.querySelector('#elw-premium-topbar .elw-top-actions');
 if(!actions)return;
 // Search remains accessible on the premium bar and via the mobile "Mais" menu.
 const legacy=document.querySelector('header.elw-premium-topbar:not(#elw-premium-topbar)');
 const explore=legacy?.querySelector('button.elw-premium-action');
 if(explore){explore.classList.add('elw-explore-action');explore.removeAttribute('style');actions.prepend(explore)}
 const theme=document.getElementById('arenaTheme');
 if(theme){theme.classList.add('elw-arena-theme');theme.title='Alternar tema da Arena';actions.insertBefore(theme,actions.querySelector('.elw-lite-switch'))}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix,{once:true});else fix();
})();