let t;
const all=[...document.querySelectorAll(".screen")];
function show(id){all.forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");reset()}
function reset(){clearTimeout(t);if(document.getElementById("welcome").classList.contains("active"))return;t=setTimeout(()=>show("welcome"),90000)}
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g){show(g.dataset.go);return}reset()});
document.addEventListener("touchstart",reset,{passive:true});

const date=document.getElementById("date"), time=document.getElementById("time");
const today=new Date(); const yyyy=today.getFullYear(), mm=String(today.getMonth()+1).padStart(2,"0"), dd=String(today.getDate()).padStart(2,"0");
date.min=`${yyyy}-${mm}-${dd}`;

function fillTimes(){
  time.innerHTML='<option value="">Select...</option>';
  if(!date.value)return;
  const d=new Date(date.value+"T12:00:00"), day=d.getDay();
  let start=9*60,end=18*60;
  if(day===0||day===1){time.innerHTML='<option value="">Salon closed</option>';return}
  if(day===4)end=19*60;
  if(day===6){start=8*60+30;end=17*60+30}
  for(let m=start;m<=end-30;m+=30){
    let h=Math.floor(m/60), min=m%60, ap=h>=12?"pm":"am", h12=h%12||12;
    let label=`${h12}:${String(min).padStart(2,"0")}${ap}`;
    let o=document.createElement("option");o.value=label;o.textContent=label;time.appendChild(o);
  }
}
date.addEventListener("change",fillTimes);

const form=document.getElementById("bookingForm"), ready=document.getElementById("requestReady");
form.addEventListener("submit",e=>{
 e.preventDefault();
 const vals={
  stylist:document.getElementById("stylist").value, service:document.getElementById("service").value,
  date:date.value,time:time.value,name:document.getElementById("customerName").value.trim(),
  mobile:document.getElementById("mobile").value.trim(),notes:document.getElementById("notes").value.trim()
 };
 if(!vals.stylist||!vals.service||!vals.date||!vals.time||!vals.name||!vals.mobile)return;
 const pretty=new Date(vals.date+"T12:00:00").toLocaleDateString("en-IE",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
 document.getElementById("requestSummary").innerHTML=`<b>${vals.name}</b><br>${vals.service} with ${vals.stylist}<br>${pretty} at ${vals.time}<br>Mobile: ${vals.mobile}`;
 const subject=`LAVISH booking request - ${vals.name}`;
 const body=`LAVISH HAIR - APPOINTMENT REQUEST\n\nCustomer: ${vals.name}\nMobile: ${vals.mobile}\nPreferred stylist: ${vals.stylist}\nService: ${vals.service}\nPreferred date: ${pretty}\nPreferred time: ${vals.time}\nNotes: ${vals.notes||"None"}\n\nIMPORTANT: This is a booking request only and has not been confirmed. Please contact the customer to confirm availability.`;
 document.getElementById("emailRequest").href=`mailto:tattzoohealingsolution@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 form.classList.add("hide");ready.classList.remove("hide");ready.scrollIntoView({behavior:"smooth",block:"start"});reset();
});
document.getElementById("newRequest").addEventListener("click",()=>{form.reset();fillTimes();ready.classList.add("hide");form.classList.remove("hide");form.scrollIntoView({behavior:"smooth"});reset()});
reset();