// Original local Foley-style WAVs; no music, speech or external audio service.
const audioKit=(()=>{
 const names=['paper','plastic','glass','bio','mixed','boing','chime','combo','engine','pour','sieve','horn'];
 const files=new Map(names.map(name=>[name,fetch(`assets/sounds/${name}.wav`).then(r=>{if(!r.ok)throw Error('Audio unavailable');return r.arrayBuffer()}).catch(()=>null)]));
 const buffers=new Map(),active=new Set();let ctx,master,enabled=true,epoch=0;
 function unlock(){if(!enabled)return;try{if(!ctx){ctx=new(window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=.7;master.connect(ctx.destination);for(const [name,file] of files)buffers.set(name,file.then(bytes=>bytes?ctx.decodeAudioData(bytes):null).catch(()=>null))}if(ctx.state==='suspended')ctx.resume().catch(()=>{})}catch{}}
 function stop(){epoch++;for(const source of active){try{source.stop()}catch{}}active.clear()}
 function setEnabled(value){enabled=value;if(!enabled)stop();else unlock()}
 function play(name,{delay=0,volume=1}={}){if(!enabled)return;unlock();const ticket=epoch;buffers.get(name)?.then(buffer=>{if(!buffer||!enabled||ticket!==epoch||ctx.state!=='running')return;const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffer;gain.gain.value=volume;source.connect(gain);gain.connect(master);active.add(source);source.onended=()=>{active.delete(source);source.disconnect();gain.disconnect()};source.start(ctx.currentTime+delay)})}
 return {unlock,play,stop,setEnabled};
})();
