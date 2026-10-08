import {createHmac,randomBytes} from "node:crypto";
import {S3Client} from "bun";
const TOKEN=(Bun.env.BOT_TOKEN||"").trim();
const API=TOKEN?"https://api.telegram.org/bot"+TOKEN:"";
const DOMAIN=Bun.env.RAILWAY_PUBLIC_DOMAIN||"";
const PORT=Number(Bun.env.PORT||"3000");
const VERIFY_URL=Bun.env.N7R_VERIFY_BRIDGE_URL||"";
const VERIFY_SECRET=Bun.env.N7R_VERIFY_BRIDGE_SECRET||"";
const DISCORD=Bun.env.DISCORD_INVITE_URL||"https://discord.gg/b6P5MnhUb";
const VERIFY_ON=Boolean(VERIFY_URL&&VERIFY_SECRET);
const SECRET=TOKEN?createHmac("sha256",TOKEN).update("n7r-mods-webhook").digest("hex"):"";
// N7R continuation checkpoint
const RIGHTS="© N7R Community • Developed by Fozan";
type Studio={id:string,n:string,d:string};
type Game={id:string,s:string,n:string,d:string};
type Mod={id:string,g:string,n:string,cat:string,desc:string,compat:string,req:string,install:string[],url:string};
type SaveFile={id:string,g:string,n:string,desc:string,compat:string,install:string[],url:string};
const STUDIOS:Studio[]=[
{id:"rockstar",n:"⭐ Rockstar",d:"Grand Theft Auto وRed Dead وBully."},
{id:"bethesda",n:"🧙 Bethesda",d:"Skyrim وFallout وStarfield وOblivion."},
{id:"cdpr",n:"🌃 CD Projekt RED",d:"Cyberpunk وThe Witcher."},
{id:"from",n:"⚔️ FromSoftware",d:"Elden Ring وDark Souls وSekiro."},
{id:"taleworlds",n:"🏰 TaleWorlds",d:"Mount & Blade."},
{id:"capcom",n:"🧟 Capcom",d:"Resident Evil وMonster Hunter وDragon’s Dogma."},
{id:"warhorse",n:"🛡️ Warhorse",d:"Kingdom Come: Deliverance."},
{id:"avalanche",n:"🪄 Avalanche",d:"Hogwarts Legacy."},
{id:"techland",n:"🧟 Techland",d:"Dying Light."},
{id:"ubisoft",n:"🗡️ Ubisoft",d:"Assassin’s Creed."},
{id:"gamescience",n:"🐒 Game Science",d:"Black Myth: Wukong."},
{id:"mafia",n:"🚘 Mafia",d:"Mafia Definitive Edition."},
{id:"santa",n:"🏹 Santa Monica",d:"God of War."},
{id:"rocksteady",n:"🦇 Rocksteady",d:"Batman: Arkham Knight."}
];
const G:Game[]=[
{id:"gtav",s:"rockstar",n:"Grand Theft Auto V",d:"مودات رسومات، سيارات، أدوات، خرائط، Gameplay ومحتوى طور القصة."},
{id:"rdr2",s:"rockstar",n:"Red Dead Redemption 2",d:"مودات أوفلاين، رسومات، أنظمة لعب وأدوات وتجارب إضافية."},
{id:"rdr1",s:"rockstar",n:"Red Dead Redemption",d:"مودات وتحسينات للنسخة الحديثة على PC."},
{id:"gtaiv",s:"rockstar",n:"Grand Theft Auto IV",d:"تحسينات ورسومات وسيارات وإصلاحات وتجربة اللعب."},
{id:"bully",s:"rockstar",n:"Bully: Scholarship Edition",d:"إصلاحات ورسومات وتحسينات وتجارب إضافية."},
{id:"skyrim",s:"bethesda",n:"Skyrim Special Edition",d:"رسومات، واجهة، Gameplay، Quests ومحتوى."},
{id:"fallout4",s:"bethesda",n:"Fallout 4",d:"أسلحة ورسومات ومحتوى وبناء وتحسينات Gameplay."},
{id:"starfield",s:"bethesda",n:"Starfield",d:"واجهة ورسومات وجودة حياة ومحتوى وGameplay."},
{id:"oblivion",s:"bethesda",n:"Oblivion",d:"إصلاحات ورسومات وواجهة ومحتوى."},
{id:"fallout3",s:"bethesda",n:"Fallout 3",d:"إصلاحات ورسومات وأسلحة وواجهة."},
{id:"cyberpunk",s:"cdpr",n:"Cyberpunk 2077",d:"رسومات، واجهة، سيارات، ملابس وGameplay."},
{id:"witcher3",s:"cdpr",n:"The Witcher 3: Wild Hunt",d:"رسومات، واجهة، قتال وجودة حياة."},
{id:"elden",s:"from",n:"Elden Ring",d:"أداء، واجهة، Gameplay، Randomizer وتجارب أوفلاين."},
{id:"ds3",s:"from",n:"Dark Souls III",d:"رسومات، Gameplay، Randomizer ومحتوى أوفلاين."},
{id:"sekiro",s:"from",n:"Sekiro: Shadows Die Twice",d:"أداء، واجهة، Skins وGameplay."},
{id:"bannerlord",s:"taleworlds",n:"Mount & Blade II: Bannerlord",d:"جيوش، أنظمة، خرائط، فصائل ومحتوى."},
{id:"warband",s:"taleworlds",n:"Mount & Blade: Warband",d:"Total Conversions وجيوش وخرائط وتجارب كاملة."},
{id:"re4",s:"capcom",n:"Resident Evil 4 (2023)",d:"رسومات، شخصيات، واجهة وأسلحة."},
{id:"re2",s:"capcom",n:"Resident Evil 2 (2019)",d:"شخصيات ورسومات وواجهة وجودة حياة."},
{id:"re3",s:"capcom",n:"Resident Evil 3 (2020)",d:"شخصيات ورسومات وتحسينات."},
{id:"revillage",s:"capcom",n:"Resident Evil Village",d:"رسومات وشخصيات وواجهة وأسلحة."},
{id:"re5",s:"capcom",n:"Resident Evil 5",d:"إصلاحات وواجهة ورسومات."},
{id:"re6",s:"capcom",n:"Resident Evil 6",d:"تحسينات ورسومات وواجهة وشخصيات."},
{id:"mhw",s:"capcom",n:"Monster Hunter: World",d:"واجهة وجودة حياة ومظهر وتجربة اللعب."},
{id:"mhr",s:"capcom",n:"Monster Hunter Rise",d:"واجهة ومظهر وأداء وجودة حياة."},
{id:"dd2",s:"capcom",n:"Dragon’s Dogma 2",d:"أداء وواجهة ومظهر وجودة حياة وGameplay."},
{id:"kcd",s:"warhorse",n:"Kingdom Come: Deliverance",d:"رسومات وواجهة وواقعية وجودة حياة."},
{id:"kcd2",s:"warhorse",n:"Kingdom Come: Deliverance II",d:"رسومات وواجهة وجودة حياة."},
{id:"hogwarts",s:"avalanche",n:"Hogwarts Legacy",d:"أداء ورسومات وملابس وواجهة."},
{id:"dying1",s:"techland",n:"Dying Light",d:"أسلحة ورسومات وصعوبة وGameplay."},
{id:"dying2",s:"techland",n:"Dying Light 2 Stay Human",d:"رسومات وأسلحة وGameplay وتحسينات."},
{id:"acu",s:"ubisoft",n:"Assassin’s Creed Unity",d:"رسومات وواجهة وملابس وإصلاحات."},
{id:"ac4",s:"ubisoft",n:"Assassin’s Creed IV: Black Flag",d:"رسومات وإصلاحات وواجهة."},
{id:"aco",s:"ubisoft",n:"Assassin’s Creed Odyssey",d:"رسومات وواجهة وشخصيات وGameplay."},
{id:"acs",s:"ubisoft",n:"Assassin’s Creed Syndicate",d:"رسومات وملابس وإصلاحات."},
{id:"acv",s:"ubisoft",n:"Assassin’s Creed Valhalla",d:"رسومات وواجهة وشخصيات وجودة حياة."},
{id:"wukong",s:"gamescience",n:"Black Myth: Wukong",d:"أداء ورسومات وواجهة وشخصيات."},
{id:"mafia1",s:"mafia",n:"Mafia: Definitive Edition",d:"رسومات وشخصيات وسيارات وتحسينات."},
{id:"mafia2",s:"mafia",n:"Mafia II: Definitive Edition",d:"رسومات وشخصيات وإصلاحات."},
{id:"mafia3",s:"mafia",n:"Mafia III: Definitive Edition",d:"رسومات وشخصيات وتحسينات."},
{id:"gow",s:"santa",n:"God of War (2018)",d:"رسومات وأداء وشخصيات وواجهة."},
{id:"arkham",s:"rocksteady",n:"Batman: Arkham Knight",d:"Skins ورسومات وGameplay وإصلاحات."}
];
const SM=Object.fromEntries(STUDIOS.map(x=>[x.id,x]));
const GM=Object.fromEntries(G.map(x=>[x.id,x]));
const DATA_S3=new S3Client({
accessKeyId:Bun.env.MODS_S3_ACCESS_KEY_ID||"",
secretAccessKey:Bun.env.MODS_S3_SECRET_ACCESS_KEY||"",
bucket:Bun.env.MODS_S3_BUCKET||"",
endpoint:Bun.env.MODS_S3_ENDPOINT||"",
region:Bun.env.MODS_S3_REGION||"auto"
});
let MODS:Mod[]=[],SAVES:SaveFile[]=[];
try{
const idx:any=await DATA_S3.file("index.json").json();
const ma:any[]=await Promise.all((idx.modKeys||[]).map((k:string)=>DATA_S3.file(k).json()));
const sa:any[]=await Promise.all((idx.saveKeys||[]).map((k:string)=>DATA_S3.file(k).json()));
MODS=ma.flat(); SAVES=sa.flat();
console.log("N7RModsBot data loaded",MODS.length,SAVES.length);
 console.log("N7RModsBot breakdown",JSON.stringify(MODS.reduce((a:any,x:Mod)=>{a[x.g]=(a[x.g]||0)+1;return a},{})));
console.log("N7RModsBot game counts",JSON.stringify(Object.fromEntries(G.map(g=>[g.id,MODS.filter(m=>m.g===g.id).length]))));
}catch(err){console.error("N7RModsBot data load error",String(err))}















const PERSIST_RE8_E:Mod[]=[
{id:"revillage-perfect-guard",g:"revillage",n:"Perfect Guard",cat:"🛡️ Gameplay",desc:"يضيف Perfect Guard؛ الحراسة في اللحظة الأخيرة تلغي الضرر وتفتح فرصة Counterattack.",compat:"Resident Evil Village.",req:"REFramework.",install:["ثبّت REFramework.","ضع guard.lua داخل reframework/autorun.","اضبط نافذة التوقيت حسب رغبتك."],url:"https://www.nexusmods.com/residentevilvillage/mods/834"},
{id:"revillage-walk-speed",g:"revillage",n:"Walk Speed",cat:"🏃 Gameplay",desc:"يتيح جعل حركة Ethan أبطأ أو أسرع من 10% إلى 50% في المنظور الأول.",compat:"First Person.",req:"Fluffy Mod Manager.",install:["اختر ملف سرعة واحدًا.","ضع ZIP في Games/RE8/Mods.","فعّله عبر Fluffy."],url:"https://www.nexusmods.com/residentevilvillage/mods/826"},
{id:"revillage-sor-no-power-gauge",g:"revillage",n:"Shadows of Rose - No Power Gauge",cat:"🖥️ واجهة",desc:"يزيل مؤشر قوة Rose فقط مع إبقاء بقية الـHUD والـCrosshair.",compat:"Shadows of Rose DLC.",req:"Fluffy Mod Manager.",install:["ضع ZIP في Games/RE8/Mods.","فعّله عبر Fluffy."],url:"https://www.nexusmods.com/residentevilvillage/mods/823"},
{id:"revillage-sor-first-person-vr",g:"revillage",n:"First Person VR - Shadows of Rose",cat:"🥽 VR",desc:"يصلح اتجاه جسم Rose ودوران HMD لمود First Person VR في Shadows of Rose.",compat:"Shadows of Rose + VR.",req:"REFramework VR + مود First Person الأصلي.",install:["ثبّت المود الأصلي أولًا.","انسخ ملفات هذا الإصلاح حسب الصفحة.","اختبر دوران HMD داخل VR."],url:"https://www.nexusmods.com/residentevilvillage/mods/832"},
{id:"revillage-the-baby",g:"revillage",n:"The Baby - Harmless Invisible Variant",cat:"🎮 QoL",desc:"يجعل Baby غير مرئي وغير قادر على الهجوم أو حجب الطريق مع إبقاء أصواته المرعبة.",compat:"Resident Evil Village.",req:"Fluffy Mod Manager.",install:["ثبّت عبر Fluffy.","اختبر منطقة House Beneviento."],url:"https://www.nexusmods.com/residentevilvillage/mods/810"},
{id:"revillage-vr-holster-guide",g:"revillage",n:"Holster Weapons in VR",cat:"🥽 VR",desc:"إعداد يفعّل ميزة Holster مخفية في Praydog VR لوضع السلاح فوق الكتف.",compat:"PCVR.",req:"Praydog REFramework VR.",install:["راجع إعدادات REFramework المذكورة في الصفحة.","طبّق Config الخاص بالـHolster.","اختبر وضع واسترجاع السلاح في VR."],url:"https://www.nexusmods.com/residentevilvillage/mods/814"},
{id:"revillage-face-eaters-diet",g:"revillage",n:"Face Eaters on a Diet",cat:"🎮 QoL",desc:"يجعل Face Eaters في Shadows of Rose غير مؤذين؛ يطاردونك لكن لا يسببون ضررًا أو Grab.",compat:"Shadows of Rose DLC.",req:"Fluffy Mod Manager.",install:["ضع ZIP داخل Games/RE8/Mods.","فعّله عبر Fluffy.","اختبر منطقة Face Eaters."],url:"https://www.nexusmods.com/residentevilvillage/mods/821"},
{id:"revillage-reframework-upscaler",g:"revillage",n:"REFramework - Upscaler Version for RE8",cat:"⚡ أداء",desc:"نسخة REFramework مخصصة توفر دعم Upscaler/DLSS في RE8.",compat:"Resident Evil Village.",req:"ملفات DLSS/Upscaler المطابقة.",install:["اتبع إصدارات المتطلبات المذكورة في الصفحة.","ضع dinput8.dll والملفات المطلوبة بجانب re8.exe.","اختبر الاستقرار قبل VR."],url:"https://www.nexusmods.com/residentevilvillage/mods/830"},
{id:"revillage-no-hud-effects",g:"revillage",n:"No-HUD-No-Effects - Toggle Yellow Tape and MORE",cat:"🖥️ واجهة",desc:"يتيح تبديل HUD والمؤثرات وعلامات Yellow Tape لتحسين الانغماس والتصوير.",compat:"Resident Evil Village.",req:"ShaderToggler حسب صفحة المود.",install:["ثبّت المتطلبات.","انسخ ملفات المود حسب الصفحة.","استخدم الاختصارات لتبديل العناصر المطلوبة."],url:"https://www.nexusmods.com/residentevilvillage/mods/624"},
{id:"revillage-turn-speed-adjustment",g:"revillage",n:"RE8 Turn Speed Wider Adjustment",cat:"🎮 تحكم",desc:"يوسّع نطاق ضبط سرعة دوران الكاميرا/التحكم.",compat:"Resident Evil Village.",req:"راجع تعليمات الصفحة.",install:["ثبّت الملف حسب الصفحة.","اضبط Turn Speed تدريجيًا ثم اختبر التحكم."],url:"https://www.nexusmods.com/residentevilvillage/mods/738"}
];
try{const ix:any=await DATA_S3.file("index.json").json(),k="mods/revillage-batch-20261008-e.json";if(!ix.modKeys?.includes(k)){await DATA_S3.file(k).write(JSON.stringify(PERSIST_RE8_E),{type:"application/json"});await DATA_S3.file("index.json").write(JSON.stringify({...ix,modKeys:[...(ix.modKeys||[]),k]}),{type:"application/json"});console.log("persisted RE8 E",PERSIST_RE8_E.length)}}catch(e){console.error("persist RE8 E error",String(e))}


























try{const extra=JSON.parse(Bun.env.EXTRA_MODS_JSON||"[]");if(Array.isArray(extra))MODS.push(...extra.filter((x:Mod)=>x&&x.id&&x.g&&!MODS.some(m=>m.id===x.id||m.url===x.url)))}catch{}

try{const LOCAL_MODS:Mod[]=await Bun.file("./data/additions.json").json();const ids=new Set(MODS.map(x=>x.id)),urls=new Set(MODS.map(x=>x.url));const ACCEPTED_LOCAL=LOCAL_MODS.filter(x=>!ids.has(x.id)&&!urls.has(x.url));MODS.push(...ACCEPTED_LOCAL);console.log("N7RModsBot local additions",LOCAL_MODS.length,"accepted",ACCEPTED_LOCAL.length);console.log("N7RModsBot final library",MODS.length,SAVES.length,JSON.stringify(Object.fromEntries(G.map(g=>[g.id,MODS.filter(m=>m.g===g.id).length]))))}catch(e){console.error("local additions load error",String(e))}
const MM=Object.fromEntries(MODS.map(x=>[x.id,x]));
const SFM=Object.fromEntries(SAVES.map(x=>[x.id,x]));
const searching=new Set<number>();
function esc(v:any){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function b64(v:Buffer|string){return Buffer.isBuffer(v)?v.toString("base64url"):Buffer.from(v).toString("base64url")}
function verifyLink(t:number,c:number){
const p=b64(JSON.stringify({tid:String(t),chat:String(c),bot:"N7RModsBot",iat:Date.now(),nonce:b64(randomBytes(12))}));
const s=createHmac("sha256",VERIFY_SECRET).update(p).digest("base64url");
return VERIFY_URL.replace(/\/$/,"")+"/discord/authorize?bridge="+encodeURIComponent(p+"."+s);
}
async function verified(t:number){
if(!VERIFY_ON)return true;
try{
const r=await fetch(VERIFY_URL.replace(/\/$/,"")+"/discord/status",{method:"POST",headers:{"content-type":"application/json","x-n7r-verify-secret":VERIFY_SECRET},body:JSON.stringify({telegram_id:String(t)}),signal:AbortSignal.timeout(7000)});
if(!r.ok)return false; const j:any=await r.json(); return j?.verified===true;
}catch{return false}
}
async function tg(m:string,b:any={}){
if(!API)throw new Error("BOT_TOKEN missing");
const r=await fetch(API+"/"+m,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(b)});
const j:any=await r.json().catch(()=>({ok:false}));
if(!j.ok)throw new Error("Telegram "+m+": "+(j.description||r.status));
return j;
}
const send=(c:number,t:string,k?:any)=>tg("sendMessage",{chat_id:c,text:t,parse_mode:"HTML",disable_web_page_preview:true,...(k?{reply_markup:k}:{})});
const edit=(c:number,m:number,t:string,k?:any)=>tg("editMessageText",{chat_id:c,message_id:m,text:t,parse_mode:"HTML",disable_web_page_preview:true,...(k?{reply_markup:k}:{})});
function homeKb(){
const rows:any[]=[];
for(let i=0;i<STUDIOS.length;i+=2)rows.push(STUDIOS.slice(i,i+2).map(x=>({text:x.n,callback_data:"s:"+x.id})));
rows.push([{text:"🔎 البحث عن لعبة",callback_data:"search"},{text:"🔗 المصادر",callback_data:"sources"}]);
rows.push([{text:"━━━━━━━━ ✦ N7R ✦ ━━━━━━━━",callback_data:"noop"}]);
rows.push([{text:"ℹ️ عن البوت",callback_data:"about"}]);
return {inline_keyboard:rows};
}
function studioKb(id:string){
const a=G.filter(x=>x.s===id),rows:any[]=[];
for(const x of a)rows.push([{text:x.n,callback_data:"g:"+x.id}]);
rows.push([{text:"⬅️ رجوع",callback_data:"home"}]);
return {inline_keyboard:rows};
}
function gameKb(g:Game){
return {inline_keyboard:[
[{text:"🧩 المودات",callback_data:"mods:"+g.id+":0"},{text:"💾 التخزينات",callback_data:"saves:"+g.id}],
[{text:"📖 دليل التركيب",callback_data:"guide:"+g.id},{text:"🔗 المصادر",callback_data:"gsources:"+g.id}],
[{text:"⬅️ رجوع",callback_data:"s:"+g.s},{text:"🏠 الرئيسية",callback_data:"home"}]
]};
}
function gameText(g:Game){
return "🎮 <b>"+esc(g.n)+"</b>\n\n"+esc(g.d)+"\n\n🧩 <b>المودات</b> — تعديلات وإضافات خاصة باللعبة.\n💾 <b>التخزينات</b> — ملفات تقدم جاهزة عند توفرها.\n\nاختر القسم المطلوب من الأسفل.";
}
function modListKb(gid:string,page=0){
const all=MODS.filter(x=>x.g===gid),size=8,max=Math.max(1,Math.ceil(all.length/size)); page=Math.max(0,Math.min(page,max-1));
const rows:any[]=all.slice(page*size,page*size+size).map(x=>[{text:x.cat+" • "+x.n,callback_data:"m:"+x.id+":"+page}]);
const nav:any[]=[]; if(page>0)nav.push({text:"⬅️ السابق",callback_data:"mods:"+gid+":"+(page-1)}); if(page<max-1)nav.push({text:"التالي ➡️",callback_data:"mods:"+gid+":"+(page+1)}); if(nav.length)rows.push(nav);
rows.push([{text:"⬅️ رجوع للعبة",callback_data:"g:"+gid}]); return {inline_keyboard:rows};
}
function saveListKb(gid:string){
const a=SAVES.filter(x=>x.g===gid),rows:any[]=a.map(x=>[{text:"💾 "+x.n,callback_data:"sv:"+x.id}]);
rows.push([{text:"⬅️ رجوع للعبة",callback_data:"g:"+gid}]); return {inline_keyboard:rows};
}
function modText(x:Mod){
return x.cat+"\n<b>"+esc(x.n)+"</b>\n\n"+esc(x.desc)+"\n\n🎮 <b>التوافق</b>\n"+esc(x.compat)+"\n\n📌 <b>المتطلبات</b>\n"+esc(x.req)+"\n\n📖 <b>طريقة التركيب</b>\n"+x.install.map((v,i)=>(i+1)+" — "+esc(v)).join("\n");
}
function modKb(x:Mod,page=0){return {inline_keyboard:[[{text:"🔗 المصدر الأصلي",url:x.url}],[{text:"⬅️ رجوع للمودات",callback_data:"mods:"+x.g+":"+page},{text:"🏠 الرئيسية",callback_data:"home"}]]}}
function saveText(x:SaveFile){
return "💾 <b>"+esc(x.n)+"</b>\n\n"+esc(x.desc)+"\n\n🎮 <b>التوافق</b>\n"+esc(x.compat)+"\n\n📖 <b>طريقة التركيب</b>\n"+x.install.map((v,i)=>(i+1)+" — "+esc(v)).join("\n");
}
function saveKb(x:SaveFile){return {inline_keyboard:[[{text:"🔗 المصدر",url:x.url}],[{text:"⬅️ رجوع للتخزينات",callback_data:"saves:"+x.g},{text:"🏠 الرئيسية",callback_data:"home"}]]}}
function sourcesKb(){
return {inline_keyboard:[
[{text:"Nexus Mods",url:"https://www.nexusmods.com/"},{text:"ModDB",url:"https://www.moddb.com/"}],
[{text:"GTA5-Mods",url:"https://www.gta5-mods.com/"},{text:"RDR2Mods",url:"https://www.rdr2mods.com/"}],
[{text:"Steam Workshop",url:"https://steamcommunity.com/workshop/"},{text:"CurseForge",url:"https://www.curseforge.com/"}],
[{text:"🏠 الرئيسية",callback_data:"home"}]
]};
}
function gameSourcesKb(g:Game){
const rows:any[]=[[{text:"Nexus Mods",url:"https://www.nexusmods.com/"}]];
if(g.id==="gtav")rows.push([{text:"GTA5-Mods",url:"https://www.gta5-mods.com/"},{text:"LCPDFR",url:"https://www.lcpdfr.com/"}]);
if(g.id==="rdr2")rows.push([{text:"RDR2Mods",url:"https://www.rdr2mods.com/"}]);
if(["warband","bannerlord"].includes(g.id))rows.push([{text:"ModDB",url:"https://www.moddb.com/"},{text:"Steam Workshop",url:"https://steamcommunity.com/workshop/"}]); else rows.push([{text:"ModDB",url:"https://www.moddb.com/"}]);
rows.push([{text:"⬅️ رجوع للعبة",callback_data:"g:"+g.id}]); return {inline_keyboard:rows};
}
function search(q:string){const x=q.trim().toLowerCase();return G.filter(g=>g.n.toLowerCase().includes(x)||SM[g.s]?.n.toLowerCase().includes(x)).slice(0,12)}
function resultsKb(a:Game[]){return {inline_keyboard:[...a.map(g=>[{text:g.n,callback_data:"g:"+g.id}]),[{text:"🔎 بحث جديد",callback_data:"search"},{text:"🏠 الرئيسية",callback_data:"home"}]]}}
async function gate(c:number,u:number){
return send(c,"🔒 <b>التحقق من عضوية N7R</b>\n\nاستخدام البوت متاح لأعضاء مجتمع N7R على Discord.\nانضم إلى السيرفر ثم اضغط <b>التحقق من العضوية</b>.",{inline_keyboard:[[{text:"💬 الانضمام إلى Discord",url:DISCORD}],[{text:"✅ التحقق من العضوية",url:verifyLink(u,c)}]]});
}
async function onMessage(m:any){
const c=Number(m.chat?.id||0),u=Number(m.from?.id||c),t=String(m.text||"").trim();if(!c||!t)return;
const cmd=t.split(/\s+/)[0].replace(/@[^ ]+$/,"").toLowerCase();
if(cmd!=="/about"&&VERIFY_ON&&!(await verified(u)))return gate(c,u);
if(cmd==="/start"||cmd==="/games"){searching.delete(u);return send(c,"🧩 <b>𝖭𝟩𝖱 • 𝖬𝗈𝖽𝗌</b>\n\nمكتبة مودات وتخزينات للألعاب، مرتبة حسب الاستوديو ثم اللعبة.\n\nاختر الاستوديو المطلوب 👇",homeKb())}
if(cmd==="/search"){searching.add(u);return send(c,"🔎 <b>البحث عن لعبة</b>\n\nأرسل اسم اللعبة الآن.\nمثال: <code>Elden Ring</code>")}
if(cmd==="/sources")return send(c,"🔗 <b>المصادر</b>\n\nأشهر المصادر المستخدمة للمودات. داخل بطاقة كل مود ستجد رابط صفحته الأصلية مباشرة.",sourcesKb());
if(cmd==="/about")return send(c,"ℹ️ <b>𝖭𝟩𝖱 • 𝖬𝗈𝖽𝗌</b>\n\nمودات وتخزينات للألعاب مع شرح عربي واضح.\n\nافتح لعبتك للوصول إلى المودات والتخزينات المتوفرة. وتظهر مع كل مود معلومات التوافق، المتطلبات، طريقة التركيب خطوة بخطوة، ورابط المصدر الأصلي.\n\n"+RIGHTS,{inline_keyboard:[[{text:"🏠 الرئيسية",callback_data:"home"}]]});
if(cmd.startsWith("/"))return;
searching.delete(u);const a=search(t);
if(!a.length){searching.add(u);return send(c,"🔎 ما لقيت لعبة مطابقة لـ <b>"+esc(t)+"</b>.\n\nجرّب جزءًا من الاسم بالإنجليزي.",{inline_keyboard:[[{text:"🏠 الرئيسية",callback_data:"home"}]]})}
return send(c,"🔎 <b>نتائج البحث</b>\n\nاختر اللعبة:",resultsKb(a));
}
async function onCallback(q:any){
const d=String(q.data||""),c=Number(q.message?.chat?.id||0),m=Number(q.message?.message_id||0),u=Number(q.from?.id||c);if(!c||!m)return;
if(VERIFY_ON&&!(await verified(u))){await tg("answerCallbackQuery",{callback_query_id:q.id,text:"🔒 يلزم التحقق من عضوية N7R أولًا.",show_alert:true}).catch(()=>{});return gate(c,u)}
await tg("answerCallbackQuery",{callback_query_id:q.id}).catch(()=>{});
if(d==="noop")return;
if(d==="home"){searching.delete(u);return edit(c,m,"🧩 <b>𝖭𝟩𝖱 • 𝖬𝗈𝖽𝗌</b>\n\nمكتبة مودات وتخزينات للألعاب، مرتبة حسب الاستوديو ثم اللعبة.\n\nاختر الاستوديو المطلوب 👇",homeKb())}
if(d==="search"){searching.add(u);return edit(c,m,"🔎 <b>البحث عن لعبة</b>\n\nأرسل اسم اللعبة الآن.\nمثال: <code>Cyberpunk 2077</code>",{inline_keyboard:[[{text:"🏠 الرئيسية",callback_data:"home"}]]})}
if(d==="sources")return edit(c,m,"🔗 <b>المصادر</b>\n\nأشهر المصادر المستخدمة للمودات. داخل بطاقة كل مود ستجد رابط صفحته الأصلية مباشرة.",sourcesKb());
if(d==="about")return edit(c,m,"ℹ️ <b>𝖭𝟩𝖱 • 𝖬𝗈𝖽𝗌</b>\n\nمودات وتخزينات للألعاب مع شرح عربي واضح.\n\nافتح لعبتك للوصول إلى المودات والتخزينات المتوفرة. وتظهر مع كل مود معلومات التوافق، المتطلبات، طريقة التركيب خطوة بخطوة، ورابط المصدر الأصلي.\n\n"+RIGHTS,{inline_keyboard:[[{text:"🏠 الرئيسية",callback_data:"home"}]]});
if(d.startsWith("s:")){const id=d.slice(2),st=SM[id];if(st)return edit(c,m,st.n+"\n\n"+esc(st.d)+"\n\nاختر اللعبة:",studioKb(id))}
if(d.startsWith("g:")){const g=GM[d.slice(2)];if(g)return edit(c,m,gameText(g),gameKb(g))}
if(d.startsWith("mods:")){const z=d.split(":"),gid=z[1],page=Number(z[2]||0),g=GM[gid];if(g){const a=MODS.filter(x=>x.g===gid);if(a.length)return edit(c,m,"🧩 <b>مودات "+esc(g.n)+"</b>\n\nاختر المود المطلوب. كل مود يحتوي على التوافق والمتطلبات وشرح تركيب بالعربي ورابط المصدر الأصلي.\n\n⚠️ المكتبة مخصصة لمودات اللعب الفردي وStory Mode، ولا ندعم مودات Online أو Multiplayer.",modListKb(gid,page));return edit(c,m,"🧩 <b>مودات "+esc(g.n)+"</b>\n\nلا توجد مودات منشورة حاليًا لهذه اللعبة.",{inline_keyboard:[[{text:"⬅️ رجوع للعبة",callback_data:"g:"+gid}]]})}}
if(d.startsWith("m:")){const z=d.split(":"),x=MM[z[1]],page=Number(z[2]||0);if(x)return edit(c,m,modText(x),modKb(x,page))}
if(d.startsWith("saves:")){const gid=d.slice(6),g=GM[gid];if(g){const a=SAVES.filter(x=>x.g===gid);if(a.length)return edit(c,m,"💾 <b>التخزينات — "+esc(g.n)+"</b>\n\nاختر التخزينة المطلوبة. خذ نسخة احتياطية من ملفات حفظك قبل الاستبدال.",saveListKb(gid));return edit(c,m,"💾 <b>التخزينات — "+esc(g.n)+"</b>\n\nلا توجد تخزينات منشورة حاليًا لهذه اللعبة.",{inline_keyboard:[[{text:"⬅️ رجوع للعبة",callback_data:"g:"+gid}]]})}}
if(d.startsWith("sv:")){const x=SFM[d.slice(3)];if(x)return edit(c,m,saveText(x),saveKb(x))}
if(d.startsWith("guide:")){const g=GM[d.slice(6)];if(g)return edit(c,m,"📖 <b>دليل التركيب — "+esc(g.n)+"</b>\n\nطريقة التركيب تختلف من مود إلى آخر. افتح المود المطلوب وستجد خطواته بالعربي بالترتيب.\n\nإذا كان المود يحتاج Mod Loader أو ملفات إضافية، ستظهر المتطلبات قبل خطوات التركيب.",{inline_keyboard:[[{text:"⬅️ رجوع للعبة",callback_data:"g:"+g.id}]]})}
if(d.startsWith("gsources:")){const g=GM[d.slice(9)];if(g)return edit(c,m,"🔗 <b>مصادر "+esc(g.n)+"</b>\n\nروابط مواقع المودات المناسبة للعبة. استخدم رابط المصدر الموجود داخل بطاقة المود للوصول إلى صفحته الأصلية مباشرة.",gameSourcesKb(g))}
}
async function setup(){
if(!TOKEN){console.log("N7RModsBot waiting for BOT_TOKEN");return}
try{const me=await tg("getMe");console.log("N7RModsBot token valid",Boolean(me?.ok),me?.result?.username||"")}catch(err){console.error("N7RModsBot token invalid",String(err));return}
if(DOMAIN){
const x=await tg("setWebhook",{url:"https://"+DOMAIN+"/telegram",secret_token:SECRET,allowed_updates:["message","callback_query"],drop_pending_updates:false}).catch(err=>({error:String(err)}));
console.log("N7RModsBot webhook configured",Boolean((x as any)?.result));
}
}
Bun.serve({port:PORT,async fetch(req){
const u=new URL(req.url);
if(req.method==="GET"&&u.pathname==="/health")return Response.json({ok:true,bot:"N7RModsBot",mods:MODS.length,saves:SAVES.length,games:G.length});
if(req.method==="POST"&&u.pathname==="/telegram"){
if(SECRET&&(req.headers.get("x-telegram-bot-api-secret-token")||"")!==SECRET)return new Response("forbidden",{status:403});
try{const x:any=await req.json();if(x.message)await onMessage(x.message);else if(x.callback_query)await onCallback(x.callback_query);return new Response("ok")}
catch(err){console.error("update error",String(err));return new Response("ok")}
}
return new Response("N7R Mods");
}});
await setup();