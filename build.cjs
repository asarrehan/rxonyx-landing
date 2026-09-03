// build.cjs — يبني index.html من أصول المصمم كما هي (لا يُرفع للريبو: مذكور في .gitignore)
// التشغيل: node build.cjs
const fs = require('fs');
const path = require('path');
const ID = 'C:/Users/drasa/RxOnyx/الهوية/';
const clean = (s) => s.replace(/<\?xml[^>]*>\s*/, '').replace(/\s*<!--[\s\S]*?-->\s*/g, '').trim();
const wmL = clean(fs.readFileSync(ID + 'rxonyx-wordmark.svg', 'utf8'));
const wmD = clean(fs.readFileSync(ID + 'rxonyx-wordmark-dark.svg', 'utf8'));
const icon = clean(fs.readFileSync(ID + 'rxonyx-icon.svg', 'utf8')).replace(/width="512" height="512"/, 'width="72" height="72"');
const small = clean(fs.readFileSync(ID + 'rxonyx-icon-small.svg', 'utf8'));
const favicon = `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(small).replace(/'/g, '%27')}">`;
if (!/<svg/.test(wmL) || !/<svg/.test(wmD) || !/<svg/.test(icon) || !/<svg/.test(small)) throw new Error('assets missing');

const css = `
:root{--gold:#C9A227;--gold-dark:#B08E1F;--bg:#FFFFFF;--surface:#F7F9FA;--line:#E3E8EC;--ink:#1F2A33;--ink2:#66747E;--head:#14141B;--chartline:#1E2A5A;--footbg:#14141B;--footink:#B7BFC7;--tilering:transparent;color-scheme:light}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0E0E12;--surface:#17171F;--line:#2A2A36;--ink:#E6E9EE;--ink2:#A3ACB6;--head:#FFFFFF;--chartline:#8496DC;--footbg:#0A0A0D;--footink:#8E97A1;--tilering:#33333F;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0E0E12;--surface:#17171F;--line:#2A2A36;--ink:#E6E9EE;--ink2:#A3ACB6;--head:#FFFFFF;--chartline:#8496DC;--footbg:#0A0A0D;--footink:#8E97A1;--tilering:#33333F;color-scheme:dark}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 -apple-system,"Segoe UI",Inter,Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.wrap{max-width:1040px;margin:0 auto;padding:0 24px}
header{position:sticky;top:0;z-index:10;border-bottom:1px solid var(--line);background:var(--bg)}
.nav{display:flex;align-items:center;justify-content:space-between;height:72px}
.logo svg{height:30px;width:auto;display:block}
.logo .wm-dark{display:none}
:root[data-theme="dark"] .logo .wm-light{display:none}:root[data-theme="dark"] .logo .wm-dark{display:block}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .logo .wm-light{display:none}:root:not([data-theme="light"]) .logo .wm-dark{display:block}}
.right{display:flex;align-items:center;gap:10px}
.nav a.cta{font-weight:600;font-size:14px;color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:9px 16px}
.nav a.cta:hover{border-color:var(--ink2)}
.tgl{width:38px;height:38px;border:1px solid var(--line);border-radius:8px;background:transparent;color:var(--ink);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
.tgl:hover{border-color:var(--ink2)}
.tgl svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.tgl .sun{display:none}
:root[data-theme="dark"] .tgl .sun{display:block}:root[data-theme="dark"] .tgl .moon{display:none}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .tgl .sun{display:block}:root:not([data-theme="light"]) .tgl .moon{display:none}}
.hero{padding:88px 0 56px;text-align:center}
.hero .gem{display:inline-block;border-radius:18px;overflow:hidden;margin-bottom:26px;box-shadow:0 0 0 1px var(--tilering)}
.hero .gem svg{display:block}
h1{font-size:clamp(30px,4.6vw,48px);line-height:1.15;letter-spacing:-.02em;margin:0 0 16px;color:var(--head);font-weight:700}
.hero p{font-size:18px;color:var(--ink2);max-width:560px;margin:0 auto 32px}
.btn{display:inline-block;background:var(--gold);color:#14141B;font-weight:700;font-size:16px;padding:14px 28px;border-radius:10px}
.btn:hover{background:var(--gold-dark)}
.chart{padding:24px 0 72px}
.chart .card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:28px 28px 24px}
.chart svg{width:100%;height:auto;display:block}
.chart .lines{text-align:center;margin-top:22px}
.chart .lines b{display:block;font-size:22px;color:var(--head);letter-spacing:-.01em}
.chart .lines span{display:block;font-size:16px;color:var(--ink2);margin-top:6px}
.three{padding:0 0 72px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.item{border:1px solid var(--line);border-radius:14px;padding:22px;background:var(--bg)}
.item i{display:block;width:32px;height:3px;background:var(--gold);border-radius:2px;margin-bottom:16px}
.item b{display:block;font-size:17px;color:var(--head);margin-bottom:6px}
.item p{margin:0;color:var(--ink2);font-size:15px}
.contact{padding:56px 0 72px;text-align:center;border-top:1px solid var(--line)}
.contact h2{font-size:26px;margin:0 0 8px;color:var(--head);letter-spacing:-.01em}
.contact p{color:var(--ink2);margin:0 0 24px}
footer{background:var(--footbg);color:var(--footink);padding:36px 0;font-size:13px}
footer .row{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
footer .wm svg{height:24px;width:auto;display:block}
@media(max-width:760px){.grid{grid-template-columns:1fr}.hero{padding:56px 0 40px}}
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>RxOnyx — Pharmacy performance software</title>
<meta name="description" content="RxOnyx reads your pharmacy system's data and turns it into decisions that raise performance and grow profit.">
${favicon}
<style>${css}</style>
</head>
<body id="top">

<header><div class="wrap nav">
  <a class="logo" href="#top"><span class="wm-light">${wmL}</span><span class="wm-dark">${wmD}</span></a>
  <span class="right">
    <a class="cta" href="#contact">Request a demo</a>
    <button class="tgl" type="button" id="tgl" aria-label="Toggle dark mode" title="Dark / light">
      <svg class="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      <svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    </button>
  </span>
</div></header>

<section class="hero"><div class="wrap">
  <span class="gem">${icon}</span>
  <h1>Your pharmacy already has the numbers.<br>RxOnyx turns them into profit.</h1>
  <p>It reads the data your pharmacy system already produces and tells you what to do with it. Nothing to type in.</p>
  <a class="btn" href="#contact">Request a demo</a>
</div></section>

<section class="chart"><div class="wrap"><div class="card">
  <svg viewBox="0 0 960 300" role="img" aria-label="Performance rising over time">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A227" stop-opacity=".22"/><stop offset="1" stop-color="#C9A227" stop-opacity="0"/></linearGradient></defs>
    <g stroke="var(--line)" stroke-width="1"><line x1="40" y1="60" x2="920" y2="60"/><line x1="40" y1="120" x2="920" y2="120"/><line x1="40" y1="180" x2="920" y2="180"/><line x1="40" y1="240" x2="920" y2="240"/></g>
    <path d="M40 232 C 160 226, 240 214, 320 200 S 480 168, 560 146 S 720 96, 800 76 S 880 52, 920 44 L 920 260 L 40 260 Z" fill="url(#g)"/>
    <path d="M40 232 C 160 226, 240 214, 320 200 S 480 168, 560 146 S 720 96, 800 76 S 880 52, 920 44" fill="none" stroke="var(--chartline)" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="920" cy="44" r="7" fill="#C9A227" stroke="var(--surface)" stroke-width="3"/>
  </svg>
  <div class="lines">
    <b>We raise pharmacy performance.</b>
    <span>Fewer expiries, fewer stockouts, sharper buying — and a profit line that moves the right way.</span>
  </div>
</div></div></section>

<section class="three"><div class="wrap"><div class="grid">
  <div class="item"><i></i><b>Expiry &amp; returns</b><p>Know what expires, when, and how much it is worth — before the return window closes.</p></div>
  <div class="item"><i></i><b>Ordering</b><p>A suggested order from real sales velocity, with the reason behind every quantity.</p></div>
  <div class="item"><i></i><b>Customers</b><p>Chronic patients due for a refill, and the ones who stopped coming — before they are gone.</p></div>
</div></div></section>

<section class="contact" id="contact"><div class="wrap">
  <h2>See it on your own pharmacy&#39;s data</h2>
  <p>One file from your pharmacy system. A live walkthrough, no commitment.</p>
  <a class="btn" href="https://wa.me/20XXXXXXXXXX" target="_blank" rel="noopener">Message us on WhatsApp</a>
</div></section>

<footer><div class="wrap row">
  <span class="wm">${wmD}</span>
  <span>&copy; 2026 RxOnyx &middot; Pharmacy performance software &middot; Egypt</span>
</div></footer>

<script>
(function(){
  var root=document.documentElement,key='rxonyx-theme';
  try{var saved=localStorage.getItem(key);if(saved==='dark'||saved==='light')root.setAttribute('data-theme',saved);}catch(e){}
  document.getElementById('tgl').addEventListener('click',function(){
    var sys=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
    var cur=root.getAttribute('data-theme')||(sys?'dark':'light');
    var next=cur==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem(key,next);}catch(e){}
  });
})();
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('rebuilt', html.length, 'bytes | h1', (html.match(/<h1>/g) || []).length, '| footer', (html.match(/<footer>/g) || []).length, '| RxOnyx', (html.match(/RxOnyx/g) || []).length, '| odd spellings', (html.match(/Rx Onyx|RXONYX|Rxonyx/g) || []).length);
