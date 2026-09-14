const letters=[
["ا","الألف","أسد","ب","أسد","باب","جمل","قلم"],
["ب","الباء","بيت","ا","بيت","أسد","ورد","قمر"],
["ت","التاء","تفاحة","ث","تفاحة","باب","جمل","نمر"],
["ث","الثاء","ثعلب","ت","ثعلب","بيت","قمر","ورد"],
["ج","الجيم","جمل","ح","جمل","أسد","بيت","قلم"],
["ح","الحاء","حصان","خ","حصان","تفاحة","بيت","نجم"],
["خ","الخاء","خبز","ج","خبز","قمر","ورد","باب"],
["د","الدال","دب","ذ","دب","نمر","كتاب","شجرة"],
["ذ","الذال","ذئب","ر","ذئب","جمل","قلم","بيت"],
["ر","الراء","رمان","ز","رمان","أسد","حصان","باب"],
["ز","الزاي","زهرة","س","زهرة","جمل","كتاب","قمر"],
["س","السين","سمكة","ش","سمكة","بيت","ثعلب","قلم"],
["ش","الشين","شجرة","ص","شجرة","أسد","دب","خبز"],
["ص","الصاد","صقر","ض","صقر","ورد","جمل","تفاحة"],
["ض","الضاد","ضفدع","ط","ضفدع","قمر","بيت","نمر"],
["ط","الطاء","طائرة","ظ","طائرة","أسد","قلم","شجرة"],
["ظ","الظاء","ظرف","ع","ظرف","جمل","سمكة","بيت"],
["ع","العين","عصفور","غ","عصفور","قمر","ورد","خبز"],
["غ","الغين","غزال","ف","غزال","دب","كتاب","تفاحة"],
["ف","الفاء","فراشة","ق","فراشة","جمل","بيت","قلم"],
["ق","القاف","قمر","ك","قمر","أسد","زهرة","خبز"],
["ك","الكاف","كتاب","ل","كتاب","دب","سمكة","ورد"],
["ل","اللام","ليمون","م","ليمون","قلم","حصان","شجرة"],
["م","الميم","موز","ن","موز","ثعلب","بيت","قمر"],
["ن","النون","نمر","هـ","نمر","جمل","زهرة","كتاب"],
["هـ","الهاء","هلال","و","هلال","أسد","خبز","قلم"],
["و","الواو","وردة","ي","وردة","دب","تفاحة","قمر"],
["ي","الياء","يد","ا","يد","نمر","كتاب","شجرة"]
].map(x=>({l:x[0],name:x[1],word:x[2],sound:x[3],correct:x[4],answers:x.slice(4)}));

const params=new URLSearchParams(location.search);
const wanted=params.get("letter");
let current=letters.find(x=>x.l===wanted)||letters[0];
let done=JSON.parse(localStorage.getItem("rahlet_done")||"[]");
let score=Number(localStorage.getItem("rahlet_score")||0);

const $=id=>document.getElementById(id);
function save(){localStorage.setItem("rahlet_done",JSON.stringify(done));localStorage.setItem("rahlet_score",score)}
function speak(text){if("speechSynthesis"in window){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(text))}}
function imageCandidates(item){
 const n=letters.indexOf(item)+1;
 const names=[`${String(n).padStart(2,"0")}_${item.l}.png`,`${String(n).padStart(2,"0")}_${item.l}.jpg`,`${String(n).padStart(2,"0")}_${item.l}.webp`];
 return names;
}
function show(item){
 current=item;
 $("letter").textContent=item.l;$("stationLabel").textContent=`محطة حرف ${item.l}`;$("letterName").textContent=item.name;
 $("description").textContent=`ابحث عن كلمة تبدأ بحرف ${item.l}. استمع للنطق ثم اختر الإجابة الصحيحة.`;
 $("score").textContent=`⭐ ${score}`;
 $("question").textContent=`أي كلمة تبدأ بحرف ${item.l}؟`;
 $("feedback").textContent="";$("nextBtn").hidden=true;
 const img=$("letterImage");img.hidden=true;
 let i=0;const candidates=imageCandidates(item);
 function tryImg(){if(i>=candidates.length)return;img.src=candidates[i++];img.onload=()=>img.hidden=false;img.onerror=tryImg} tryImg();
 const box=$("answers");box.innerHTML="";
 [...item.answers].sort(()=>Math.random()-.5).forEach(ans=>{
  const b=document.createElement("button");b.className="answer";b.textContent=ans;
  b.onclick=()=>answer(b,ans,item);box.appendChild(b)
 });
 renderGrid(); updateProgress();
}
function answer(btn,ans,item){
 const buttons=[...$("answers").children];
 if(ans===item.correct){
  btn.classList.add("correct");$("feedback").textContent="🎉 ممتاز! إجابة صحيحة.";
  if(!done.includes(item.l)){done.push(item.l);score+=10;save()}
  buttons.forEach(b=>b.disabled=true);
  const idx=letters.indexOf(item),next=letters[idx+1];
  if(next){$("nextBtn").hidden=false;$("nextBtn").onclick=()=>{location.href="?letter="+encodeURIComponent(next.l)}}
  else {$("nextBtn").hidden=true;$("finish").hidden=false}
  $("score").textContent=`⭐ ${score}`;renderGrid();updateProgress();
 }else{btn.classList.add("wrong");$("feedback").textContent="❌ ليست الإجابة الصحيحة، حاول مرة أخرى."}
}
function renderGrid(){
 const grid=$("lettersGrid");grid.innerHTML="";
 letters.forEach(x=>{const b=document.createElement("button");b.className="letter-btn"+(done.includes(x.l)?" done":"")+(x.l===current.l?" active":"");b.textContent=x.l;b.onclick=()=>location.href="?letter="+encodeURIComponent(x.l);grid.appendChild(b)})
}
function updateProgress(){
 const p=Math.round(done.length/letters.length*100);$("progressText").textContent=`${done.length} / ${letters.length}`;$("progressBar").style.width=p+"%";
 if(done.length===letters.length)$("finish").hidden=false
}
$("speakBtn").onclick=()=>speak(current.l);
show(current);
