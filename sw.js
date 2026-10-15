const C="ecoruta-v4";
const FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request; if(r.method!=="GET") return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&res.ok&&(new URL(r.url).origin===location.origin||r.url.includes("fonts.g"))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}).catch(()=>hit||caches.match("index.html"));return hit||net;}));});
