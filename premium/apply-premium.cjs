/* Emerald Living World v3.0.3 — Apply premium theme to the packaged website, no game logic changes. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const root='/app';
const pages=['sobre.html','atualizacoes.html','privacidade.html','jogo/estatisticas.html','jogo/rom-lab.html','jogo/index.html','jogo/mapas-oficiais.html','jogo/campanha.html','jogo/entrar.html','jogo/quetzal-pokedex.html','jogo/frontier.html','jogo/online.html','jogo/arena.html','jogo/portal.html','jogo/teste-caminhada.html'];
let updated=0;
for(const file of pages){
 const loc=path.join(root,file);
 if(!fs.existsSync(loc))throw Error('Missing required page: '+file);
 let html=fs.readFileSync(loc,'utf8');
 if(!html.includes('</head>')||!html.includes('</body>'))throw Error('Invalid HTML page: '+file);
 const outside=!file.startsWith('jogo/');
 const prefix=outside?'jogo/':'';
 if(!html.includes('data-elw-unified')){
  html=html.replace('</body>','<script defer data-elw-unified src="'+prefix+'js/unified-shell.js?v=3.0.3"></script></body>');
 }
 if(!html.includes('css/unified-shell.css')){
  html=html.replace('</head>','<link rel="stylesheet" href="'+prefix+'css/unified-shell.css?v=3.0.3"></head>');
 }
 if(!html.includes('premium-experience.css')){
  html=html.replace('</head>','<link rel="stylesheet" href="'+prefix+'css/premium-experience.css?v=3.0.3"></head>');
 }
 if(!html.includes('premium-experience.js')){
  html=html.replace('</body>','<script defer data-elw-premium src="'+prefix+'js/premium-experience.js?v=3.0.3"></script></body>');
 }
 fs.writeFileSync(loc,html,'utf8');updated++;
}
for(const file of ['jogo/css/premium-experience.css','jogo/js/premium-experience.js']){if(!fs.statSync(path.join(root,file)).size)throw Error('Empty premium asset: '+file)}
console.log('ELW 3.0.3 Premium applied to '+updated+' pages; game and saves unchanged');
