const STATIONS=[{"letter": "ا", "name": "الألف", "word": "أسد", "emoji": "🦁", "wrong": ["باب", "تفاحة", "ثعلب"]}, {"letter": "ب", "name": "الباء", "word": "باب", "emoji": "🚪", "wrong": ["أسد", "تفاحة", "ثعلب"]}, {"letter": "ت", "name": "التاء", "word": "تفاحة", "emoji": "🍎", "wrong": ["أسد", "باب", "ثعلب"]}, {"letter": "ث", "name": "الثاء", "word": "ثعلب", "emoji": "🦊", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ج", "name": "الجيم", "word": "جمل", "emoji": "🐪", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ح", "name": "الحاء", "word": "حصان", "emoji": "🐴", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "خ", "name": "الخاء", "word": "خبز", "emoji": "🍞", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "د", "name": "الدال", "word": "دب", "emoji": "🐻", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ذ", "name": "الذال", "word": "ذرة", "emoji": "🌽", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ر", "name": "الراء", "word": "رمان", "emoji": "🍎", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ز", "name": "الزاي", "word": "زهرة", "emoji": "🌸", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "س", "name": "السين", "word": "سمكة", "emoji": "🐟", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ش", "name": "الشين", "word": "شجرة", "emoji": "🌳", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ص", "name": "الصاد", "word": "صقر", "emoji": "🦅", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ض", "name": "الضاد", "word": "ضفدع", "emoji": "🐸", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ط", "name": "الطاء", "word": "طائرة", "emoji": "✈️", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ظ", "name": "الظاء", "word": "ظرف", "emoji": "✉️", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ع", "name": "العين", "word": "عصفور", "emoji": "🐦", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "غ", "name": "الغين", "word": "غزال", "emoji": "🦌", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ف", "name": "الفاء", "word": "فراشة", "emoji": "🦋", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ق", "name": "القاف", "word": "قمر", "emoji": "🌙", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ك", "name": "الكاف", "word": "كتاب", "emoji": "📖", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ل", "name": "اللام", "word": "ليمون", "emoji": "🍋", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "م", "name": "الميم", "word": "موز", "emoji": "🍌", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ن", "name": "النون", "word": "نمر", "emoji": "🐯", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "هـ", "name": "الهاء", "word": "هلال", "emoji": "🌙", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "و", "name": "الواو", "word": "وردة", "emoji": "🌹", "wrong": ["أسد", "باب", "تفاحة"]}, {"letter": "ي", "name": "الياء", "word": "يد", "emoji": "✋", "wrong": ["أسد", "باب", "تفاحة"]}];
const params=new URLSearchParams(location.search);let currentIndex=STATIONS.findIndex(s=>s.letter===params.get("letter"));if(currentIndex<0)currentIndex=0;
const DK="rahlet_done_final",SK="rahlet_score_final";let done=JSON.parse(localStorage.getItem(DK)||"[]"),score=Number(localStorage.getItem(SK)||0);
const $=id=>document.getElementById(id);function save(){localStorage.setItem(DK,JSON.stringify(done));localStorage.setItem(SK,score)}
function speak(t){if(!("speechSynthesis"in window))return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(t);u.lang="ar-SA";u.rate=.75;speechSynthesis.speak(u)}
function progress(){$("progressText").textContent=`${done.length} / 28`;$("progressBar").style.width=(done.length/28*100)+"%";$("score").textContent=score;$("finish").hidden=done.length!==28}
function map(){let g=$("lettersGrid");g.innerHTML="";STATIONS.forEach((s,i)=>{let b=document.createElement("button");b.className="letter-btn "+(i===currentIndex?"active ":"")+(done.includes(s.letter)?"done":"");b.textContent=s.letter;b.onclick=()=>location.href="?letter="+encodeURIComponent(s.letter);g.appendChild(b)})}
function render(){let s=STATIONS[currentIndex];$("stationLabel").textContent="محطة حرف "+s.letter;$("letterName").textContent=s.name;$("letter").textContent=s.letter;$("word").textContent=s.word;$("wordEmoji").textContent=s.emoji;$("question").textContent=`أي كلمة تبدأ بحرف ${s.letter}؟`;$("feedback").textContent="";$("nextBtn").hidden=true;
let box=$("answers");box.innerHTML="";[s.word,...s.wrong].sort(()=>Math.random()-.5).forEach(w=>{let b=document.createElement("button");b.className="answer";b.textContent=w;b.onclick=()=>check(b,w,s);box.appendChild(b)});$("speakBtn").onclick=()=>speak(s.letter);map();progress()}
function check(btn,w,s){if(w!==s.word){btn.classList.add("wrong");$("feedback").textContent="💡 حاول مرة أخرى.";setTimeout(()=>btn.classList.remove("wrong"),600);return}btn.classList.add("correct");$("feedback").textContent="🎉 ممتاز! إجابة صحيحة."; celebrate();if(!done.includes(s.letter)){done.push(s.letter);score+=10;save()}[...$("answers").children].forEach(b=>b.disabled=true);let next=STATIONS[currentIndex+1];if(next){$("nextBtn").hidden=false;$("nextBtn").onclick=()=>location.href="?letter="+encodeURIComponent(next.letter)}else if(done.length===28)$("feedback").textContent="🏆 رائع! أكملت جميع الحروف.";map();progress()}
$("speakBtn").onclick=()=>speak(STATIONS[currentIndex].letter);$("resetBtn").onclick=()=>{if(confirm("هل تريد بدء الرحلة من جديد؟")){done=[];score=0;save();render();scrollTo({top:0,behavior:"smooth"})}};$("printBtn").onclick=()=>print();render();
// ✨ تحسينات النسخة الاحترافية
const NAME_KEY="rahlet_child_name";
const welcome=document.getElementById("welcome"), startBtn=document.getElementById("startBtn"), childName=document.getElementById("childName");
const certificateName=document.getElementById("certificateName"), certificateText=document.getElementById("certificateText");
const savedName=localStorage.getItem(NAME_KEY)||"";
if(childName) childName.value=savedName;
function updateCertificate(){
  const name=localStorage.getItem(NAME_KEY)||"";
  if(certificateName) certificateName.textContent=name ? "🌟 "+name+" 🌟" : "🌟 بطل رحلة الحروف 🌟";
  if(certificateText) certificateText.textContent=name ? `تهانينا ${name}! لقد أنجزت جميع المحطات الـ28 وحصلت على ${score} نقطة.` : `أنجزت جميع المحطات الـ28 وحصلت على ${score} نقطة.`;
}
function celebrate(){
  const box=document.getElementById("confetti"); if(!box)return;
  box.innerHTML="";
  for(let i=0;i<45;i++){
    const p=document.createElement("i");p.className="piece";
    p.style.left=(Math.random()*100)+"%";
    p.style.animationDelay=(Math.random()*.45)+"s";
    p.style.transform=`rotate(${Math.random()*180}deg)`;
    box.appendChild(p);
  }
  setTimeout(()=>box.innerHTML="",2400);
}
if(startBtn){
  startBtn.onclick=()=>{
    const n=childName.value.trim();
    if(n)localStorage.setItem(NAME_KEY,n);
    welcome.style.display="none";
    updateCertificate();
  };
}
if(savedName || done.length>0) welcome.style.display="none";
updateCertificate();

// إعادة تعريف التقدم لتحديث الشهادة والاحتفال عند إكمال الرحلة
const originalProgress=progress;
progress=function(){
  originalProgress();
  updateCertificate();
};
