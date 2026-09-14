const letters = [
  {l:"ا",name:"الألف",q:"أي كلمة تبدأ بحرف الألف؟",a:["أسد","باب","تفاح","كتاب"],c:"أسد"},
  {l:"ب",name:"الباء",q:"أي كلمة تبدأ بحرف الباء؟",a:["بيت","قلم","أسد","ورد"],c:"بيت"},
  {l:"ت",name:"التاء",q:"أي كلمة تبدأ بحرف التاء؟",a:["تفاحة","باب","جمل","نمر"],c:"تفاحة"},
  {l:"ث",name:"الثاء",q:"أي كلمة تبدأ بحرف الثاء؟",a:["ثعلب","بطة","قمر","ورد"],c:"ثعلب"},
  {l:"ج",name:"الجيم",q:"أي كلمة تبدأ بحرف الجيم؟",a:["جمل","أسد","باب","قلم"],c:"جمل"},
  {l:"ح",name:"الحاء",q:"أي كلمة تبدأ بحرف الحاء؟",a:["حصان","تفاح","بيت","نجم"],c:"حصان"},
  {l:"خ",name:"الخاء",q:"أي كلمة تبدأ بحرف الخاء؟",a:["خبز","قمر","ورد","باب"],c:"خبز"},
  {l:"د",name:"الدال",q:"أي كلمة تبدأ بحرف الدال؟",a:["دب","نمر","كتاب","شجرة"],c:"دب"},
  {l:"ذ",name:"الذال",q:"أي كلمة تبدأ بحرف الذال؟",a:["ذئب","جمل","قلم","بيت"],c:"ذئب"},
  {l:"ر",name:"الراء",q:"أي كلمة تبدأ بحرف الراء؟",a:["رمان","أسد","حصان","باب"],c:"رمان"},
  {l:"ز",name:"الزاي",q:"أي كلمة تبدأ بحرف الزاي؟",a:["زهرة","جمل","كتاب","قمر"],c:"زهرة"},
  {l:"س",name:"السين",q:"أي كلمة تبدأ بحرف السين؟",a:["سمكة","بيت","ثعلب","قلم"],c:"سمكة"},
  {l:"ش",name:"الشين",q:"أي كلمة تبدأ بحرف الشين؟",a:["شجرة","أسد","دب","خبز"],c:"شجرة"},
  {l:"ص",name:"الصاد",q:"أي كلمة تبدأ بحرف الصاد؟",a:["صقر","ورد","جمل","تفاحة"],c:"صقر"},
  {l:"ض",name:"الضاد",q:"أي كلمة تبدأ بحرف الضاد؟",a:["ضفدع","قمر","بيت","نمر"],c:"ضفدع"},
  {l:"ط",name:"الطاء",q:"أي كلمة تبدأ بحرف الطاء؟",a:["طائرة","أسد","قلم","شجرة"],c:"طائرة"},
  {l:"ظ",name:"الظاء",q:"أي كلمة تبدأ بحرف الظاء؟",a:["ظرف","جمل","سمكة","بيت"],c:"ظرف"},
  {l:"ع",name:"العين",q:"أي كلمة تبدأ بحرف العين؟",a:["عصفور","قمر","ورد","خبز"],c:"عصفور"},
  {l:"غ",name:"الغين",q:"أي كلمة تبدأ بحرف الغين؟",a:["غزال","دب","كتاب","تفاحة"],c:"غزال"},
  {l:"ف",name:"الفاء",q:"أي كلمة تبدأ بحرف الفاء؟",a:["فراشة","جمل","بيت","قلم"],c:"فراشة"},
  {l:"ق",name:"القاف",q:"أي كلمة تبدأ بحرف القاف؟",a:["قمر","أسد","زهرة","خبز"],c:"قمر"},
  {l:"ك",name:"الكاف",q:"أي كلمة تبدأ بحرف الكاف؟",a:["كتاب","دب","سمكة","ورد"],c:"كتاب"},
  {l:"ل",name:"اللام",q:"أي كلمة تبدأ بحرف اللام؟",a:["ليمون","قلم","حصان","شجرة"],c:"ليمون"},
  {l:"م",name:"الميم",q:"أي كلمة تبدأ بحرف الميم؟",a:["موز","ثعلب","بيت","قمر"],c:"موز"},
  {l:"ن",name:"النون",q:"أي كلمة تبدأ بحرف النون؟",a:["نمر","جمل","زهرة","كتاب"],c:"نمر"},
  {l:"هـ",name:"الهاء",q:"أي كلمة تبدأ بحرف الهاء؟",a:["هلال","أسد","خبز","قلم"],c:"هلال"},
  {l:"و",name:"الواو",q:"أي كلمة تبدأ بحرف الواو؟",a:["وردة","دب","تفاحة","قمر"],c:"وردة"},
  {l:"ي",name:"الياء",q:"أي كلمة تبدأ بحرف الياء؟",a:["يد","نمر","كتاب","شجرة"],c:"يد"}
];

const params = new URLSearchParams(location.search);
const key = params.get("letter");
const normalize = s => s === "ه" ? "هـ" : s;
const current = letters.find(x => normalize(x.l) === normalize(key)) || null;
const done = JSON.parse(localStorage.getItem("rahlet_done") || "[]");

function saveDone(l){
  if(!done.includes(l)){done.push(l);localStorage.setItem("rahlet_done",JSON.stringify(done))}
}

function showLetter(item){
  document.getElementById("letter").textContent=item.l;
  document.getElementById("station").textContent=`محطة حرف ${item.l}`;
  document.getElementById("letterName").textContent=item.name;
  document.getElementById("description").textContent=`أحسنت! وصلت إلى محطة ${item.name}. حلّ التحدي ثم انتقل للحرف التالي.`;
  document.getElementById("question").textContent=item.q;
  const box=document.getElementById("answers"); box.innerHTML="";
  document.getElementById("feedback").textContent="";
  [...item.a].sort(()=>Math.random()-.5).forEach(ans=>{
    const b=document.createElement("button"); b.className="answer"; b.textContent=ans;
    b.onclick=()=>{
      if(ans===item.c){
        b.classList.add("correct"); document.getElementById("feedback").textContent="🎉 إجابة صحيحة! أحسنت.";
        [...box.children].forEach(x=>x.disabled=true); saveDone(item.l); renderGrid();
      }else{
        b.classList.add("wrong"); document.getElementById("feedback").textContent="حاول مرة أخرى 😊";
      }
    }; box.appendChild(b);
  });
}

function renderGrid(){
  const grid=document.getElementById("lettersGrid"); grid.innerHTML="";
  letters.forEach(item=>{
    const b=document.createElement("button");
    b.className="letter-btn"+(done.includes(item.l)?" done":"")+(current&&current.l===item.l?" active":"");
    b.textContent=item.l; b.title=item.name;
    b.onclick=()=>{location.href=`?letter=${encodeURIComponent(item.l)}`};
    grid.appendChild(b);
  });
  document.getElementById("progress").textContent=`${done.length} / ${letters.length}`;
}

if(current) showLetter(current);
renderGrid();
