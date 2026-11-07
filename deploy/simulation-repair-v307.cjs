// Emerald Living World 3.0.7: fix stalled local simulator without changing saves.
'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=process.env.EMERALD_PATCH_ROOT||'/app';
function patch(relative,oldText,newText){
 const name=path.join(root,relative);
 const source=fs.readFileSync(name,'utf8');
 const matches=source.split(oldText).length-1;
 if(matches!==1)throw Error('Patch mismatch '+relative+': '+matches);
 fs.writeFileSync(name,source.replace(oldText,newText));
 console.log('[ELW 3.0.7] updated '+relative);
}
patch('jogo/js/engine.js',
 'if(controlling&&!t.battle&&!t.healing&&!t.playerJourneyCommand)continue;',
 '/* Trainer bot continues autonomously if no manual command is pending. */');
patch('jogo/js/personal-landing.js',
 "if(hadSave){window.emeraldChooseMode('player');window.emeraldSetMyBotSettings?.({...prefs,...window.emeraldGetBotPrefs?.(),starter:start.value});}\n  else{window.emeraldSetMyBotSettings?.({...prefs,starter:start.value});window.emeraldStartWorld(1,'player');window.emeraldSetMyBotSettings?.({...prefs,starter:start.value})}",
 "if(hadSave){if((window.emeraldTrainers?.length||0)<20)window.emeraldResizeBots?.(20);window.emeraldChooseMode('mixed');window.emeraldSetMyBotSettings?.({...prefs,...window.emeraldGetBotPrefs?.(),starter:start.value});}\n  else{window.emeraldSetMyBotSettings?.({...prefs,starter:start.value});window.emeraldStartWorld(20,'mixed');window.emeraldSetMyBotSettings?.({...prefs,starter:start.value})}");
patch('jogo/js/world.js',' IAs presentes',' IAs nesta área');
