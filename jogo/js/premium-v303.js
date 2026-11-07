/* Emerald Living World — Premium UI 3.0.3. Independent presentation layer. */
(()=>{'use strict';
const startup=()=>{
 if(document.getElementById('elw-premium-topbar'))return;
 const script=document.currentScript||document.querySelector('script[src*="premium-v303"]');
 const root=new URL('/jogo/',location.href);
 const url=p=>new URL(p,root).href;
 const page=document.body.dataset.elwSection||'hub';
 const meta={
 hub:['Central Emerald','Seu universo Pokémon em um só lugar','✦'],mundo:['Mundo Compartilhado','Sua aventura acontece em Hoenn','🌍'],
 simulacao:['Simulação de Treinadores','Acompanhe cada história em tempo real','🤖'],arena:['Arena Competitiva','Construa seu legado entre os melhores','⚔️'],
 frontier:['Battle Frontier','Desafios que vão além da Liga','🏆'],jornada:['Jornada de Hoenn','O caminho até a Liga começa aqui','📖'],
 pokedex:['Pokédex','Descubra espécies, habitats e equipes','📗'],mapas:['Mapa de Hoenn','Explore rotas e lugares de cada região','🗺️'],
 estatisticas:['Ranking e Estatísticas','Acompanhe o universo Emerald','📊'],conta:['Conta de Treinador','Seu progresso protegido num só lugar','👤']};
 const [name,description,emoji]=meta[page]||meta.hub;
 const css=document.createElement('link');css.rel='stylesheet';css.href=url('css/premium-v303.css');document.head.append(css);
 document.body.classList.add('elw-premium');
 let lite=false;try{lite=localStorage.getItem('elw-lite')==='1'}catch{}
 document.body.classList.toggle('elw-lite',lite);
 const top=document.createElement('header');top.id='elw-premium-topbar';top.className='elw-premium-topbar';
 top.innerHTML='<a class="elw-brand" href="'+url('portal.html')+'" aria-label="Emerald Living World: página inicial"><span class="elw-brand-icon">E<span>✦</span></span><span class="elw-brand-name">EMERALD<small>LIVING WORLD</small></span></a>'+
 '<nav class="elw-main-links" aria-label="Navegação entre modos"><a href="'+url('portal.html')+'" data-section="hub">Central</a><a href="'+url('online.html')+'" data-section="mundo">Mundo</a><a href="'+url('index.html#jogo')+'" data-section="simulacao">Simulação</a><a href="'+url('arena.html')+'" data-section="arena">Arena</a><a href="'+url('frontier.html')+'" data-section="frontier">Frontier</a><a href="'+url('quetzal-pokedex.html')+'" data-section="pokedex">Pokédex</a></nav>'+
 '<div class="elw-top-actions"><span class="elw-top-status"><i aria-hidden="true"></i>HOENN ONLINE</span><a class="elw-account-action" href="'+url('entrar.html')+'">👤 <span>Minha conta</span></a><button type="button" class="elw-lite-switch" aria-label="Alternar efeitos visuais" title="Alternar modo leve">⚙</button></div>';
 top.querySelectorAll('[data-section]').forEach(a=>{if(a.dataset.section===page)a.setAttribute('aria-current','page')});
 document.body.insertBefore(top,document.body.firstChild);
 const liteBtn=top.querySelector('.elw-lite-switch');
 const updateLite=()=>{liteBtn.title=document.body.classList.contains('elw-lite')?'Ativar efeitos visuais':'Ativar modo leve';liteBtn.setAttribute('aria-pressed',String(document.body.classList.contains('elw-lite')))};
 updateLite();
 liteBtn.addEventListener('click',()=>{document.body.classList.toggle('elw-lite');try{localStorage.setItem('elw-lite',document.body.classList.contains('elw-lite')?'1':'0')}catch{}updateLite()});
 if(!['hub'].includes(page)&&!document.body.classList.contains('elw-premium-heading')){
   const main=document.querySelector('main');
   if(main&&document.body.dataset.elwLayout!=='info'&&document.body.dataset.elwLayout!=='account'){
     const hero=document.createElement('section');hero.className='elw-premium-heading';hero.setAttribute('aria-label','Área atual');
     const pageText=document.createElement('div');pageText.className='elw-premium-heading-content';
     const eyebrow=document.createElement('span');eyebrow.className='elw-premium-eyebrow';eyebrow.textContent='EMERALD LIVING WORLD  /  '+name.toUpperCase();
     const h=document.createElement('h2');h.textContent=emoji+' '+name;
     const desc=document.createElement('p');desc.textContent=description;
     pageText.append(eyebrow,h,desc);
     const actions=document.createElement('div');actions.className='elw-premium-heading-actions';
     const back=document.createElement('a');back.href=url('portal.html');back.textContent='← Central';
     const account=document.createElement('a');account.href=url('entrar.html');account.textContent='Minha conta ↗';
     actions.append(back,account);hero.append(pageText,actions);main.insertBefore(hero,main.firstChild);
   }
 }
 if(page==='hub'){
   const main=document.querySelector('.portal-main');const section=main&&main.querySelector('.cards-section');
   if(section&&!main.querySelector('.elw-premium-overview')){
     const overview=document.createElement('section');overview.className='elw-premium-overview';overview.setAttribute('aria-label','Áreas da comunidade');
     overview.innerHTML='<div><span class="elw-pulse-dot" aria-hidden="true"></span><strong>UM ÚNICO UNIVERSO</strong><small>Seus modos de jogo conectados numa só Central</small></div><div><strong>100</strong><small>Treinadores IA configuráveis</small></div><div><strong>08</strong><small>Ginásios de Hoenn</small></div><div><strong>07</strong><small>Desafios Frontier LAB</small></div>';
     section.parentNode.insertBefore(overview,section);
   }
   const hero=main&&main.querySelector('.portal-hero');
   if(hero&&!hero.querySelector('.elw-premium-hero-mark')){
     const mark=document.createElement('div');mark.className='elw-premium-hero-mark';mark.textContent='HOENN  •  EXPLORE  /  BATALHE  /  EVOLUA';hero.append(mark);
   }
 }
 const dock=document.getElementById('elw-world-dock');if(dock)dock.classList.add('elw-premium-dock');
 const menu=document.getElementById('elw-extra-pages');if(menu)menu.classList.add('elw-premium-menu');
 document.documentElement.classList.add('elw-premium-ready');
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startup,{once:true});else startup();
})();
