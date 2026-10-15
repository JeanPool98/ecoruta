const C="ecoruta-5bc2efaa";
const FILES=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "fonts/fonts.css", "fonts/480c062501.woff2", "fonts/547d85f3a1.woff2", "fonts/98f94fdc95.woff2", "fonts/a4fe79f7ca.woff2", "fonts/a972324267.woff2", "fonts/ba16536d41.woff2", "fonts/c68e6695ea.woff2", "fonts/e769ef355f.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request; const u=new URL(r.url); if(r.method!=="GET"||u.origin!==location.origin) return;
  const isPage=r.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html");
  if(isPage){
    e.respondWith(Promise.race([fetch(r,{cache:"no-store"}).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put("index.html",cp));}return res;}),new Promise((_,rej)=>setTimeout(rej,5000))]).catch(()=>caches.match("index.html").then(h=>h||caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;})));});
