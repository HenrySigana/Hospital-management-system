import { useState, useRef } from "react";

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const initialPatients = [
  { id:"P001", name:"Amina Osei",    age:34, gender:"Female", blood:"O+",  phone:"0712-345-678", diagnosis:"Hypertension",   status:"Admitted",   ward:"General",   admitDate:"2026-03-01" },
  { id:"P002", name:"James Mwangi", age:52, gender:"Male",   blood:"A+",  phone:"0723-456-789", diagnosis:"Diabetes Type II",status:"Outpatient", ward:"—",         admitDate:"2026-03-03" },
  { id:"P003", name:"Fatuma Hassan",age:28, gender:"Female", blood:"B-",  phone:"0734-567-890", diagnosis:"Malaria",         status:"Admitted",   ward:"Isolation", admitDate:"2026-03-04" },
  { id:"P004", name:"Peter Kamau",  age:67, gender:"Male",   blood:"AB+", phone:"0745-678-901", diagnosis:"Pneumonia",       status:"ICU",        ward:"ICU",       admitDate:"2026-03-02" },
];
const initialStaff = [
  { id:"S001", name:"Dr. Sarah Njoroge",   role:"Physician",    dept:"Internal Medicine", shift:"Morning",   status:"On Duty",  phone:"0711-111-222" },
  { id:"S002", name:"Dr. Ali Bashir",      role:"Surgeon",      dept:"Surgery",           shift:"Afternoon", status:"On Duty",  phone:"0722-222-333" },
  { id:"S003", name:"Nurse Grace Wanjiku", role:"Nurse",        dept:"General Ward",      shift:"Night",     status:"Off Duty", phone:"0733-333-444" },
  { id:"S004", name:"Dr. Paul Otieno",     role:"Pediatrician", dept:"Pediatrics",        shift:"Morning",   status:"On Leave", phone:"0744-444-555" },
  { id:"S005", name:"Nurse David Kipchoge",role:"Nurse",        dept:"ICU",               shift:"Morning",   status:"On Duty",  phone:"0755-555-666" },
];
const initialAppointments = [
  { id:"A001", patientId:"P002", patientName:"James Mwangi",  doctorId:"S001", doctorName:"Dr. Sarah Njoroge", date:"2026-03-06", time:"09:00", type:"Follow-up",   status:"Scheduled" },
  { id:"A002", patientId:"P003", patientName:"Fatuma Hassan", doctorId:"S002", doctorName:"Dr. Ali Bashir",    date:"2026-03-05", time:"11:30", type:"Consultation", status:"Completed" },
  { id:"A003", patientId:"P001", patientName:"Amina Osei",    doctorId:"S001", doctorName:"Dr. Sarah Njoroge", date:"2026-03-07", time:"14:00", type:"Check-up",     status:"Scheduled" },
  { id:"A004", patientId:"P004", patientName:"Peter Kamau",   doctorId:"S002", doctorName:"Dr. Ali Bashir",    date:"2026-03-05", time:"08:00", type:"Emergency",    status:"Completed" },
];
const initialBills = [
  { id:"B001", patientId:"P001", patientName:"Amina Osei",    services:[{name:"Consultation",cost:1500},{name:"Ward (3 days)",cost:9000},{name:"Medication",cost:2400}],    paid:5000,  date:"2026-03-01", status:"Partial" },
  { id:"B002", patientId:"P002", patientName:"James Mwangi",  services:[{name:"Consultation",cost:1500},{name:"Lab Tests",cost:3200}],                                       paid:4700,  date:"2026-03-03", status:"Paid" },
  { id:"B003", patientId:"P003", patientName:"Fatuma Hassan", services:[{name:"Consultation",cost:1500},{name:"Ward (2 days)",cost:6000},{name:"IV Medication",cost:3800}],  paid:0,     date:"2026-03-04", status:"Unpaid" },
  { id:"B004", patientId:"P004", patientName:"Peter Kamau",   services:[{name:"ICU (3 days)",cost:45000},{name:"Surgery",cost:80000},{name:"Medication",cost:12000}],        paid:50000, date:"2026-03-02", status:"Partial" },
];
const initialLabs = [
  { id:"L001", patientId:"P001", patientName:"Amina Osei",    orderedBy:"Dr. Sarah Njoroge", date:"2026-03-01", tests:[{name:"CBC",result:"WBC 6.2, RBC 4.8, Hgb 13.2, Plt 210",flag:"Normal"},{name:"Lipid Panel",result:"LDL 142, HDL 38, TG 180",flag:"High"}],    status:"Completed", notes:"Elevated LDL noted. Lifestyle counselling advised." },
  { id:"L002", patientId:"P002", patientName:"James Mwangi",  orderedBy:"Dr. Sarah Njoroge", date:"2026-03-03", tests:[{name:"HbA1c",result:"8.4%",flag:"High"},{name:"FBS",result:"148 mg/dL",flag:"High"},{name:"Creatinine",result:"1.1 mg/dL",flag:"Normal"}],   status:"Completed", notes:"Poor glycaemic control. Medication adjustment required." },
  { id:"L003", patientId:"P003", patientName:"Fatuma Hassan", orderedBy:"Dr. Ali Bashir",    date:"2026-03-04", tests:[{name:"Malaria RDT",result:"Positive (P. falciparum)",flag:"High"},{name:"CBC",result:"WBC 11.4, Hgb 10.1, Plt 88",flag:"Low"}],              status:"Completed", notes:"Confirmed falciparum malaria. IV artesunate initiated." },
  { id:"L004", patientId:"P004", patientName:"Peter Kamau",   orderedBy:"Dr. Ali Bashir",    date:"2026-03-02", tests:[{name:"CXR",result:"Bilateral infiltrates",flag:"High"},{name:"Sputum Culture",result:"S. pneumoniae",flag:"High"},{name:"ABG",result:"PaO2 58 mmHg",flag:"Low"}], status:"Completed", notes:"Severe CAP. ICU admission and IV ceftriaxone initiated." },
];
const initialPrescriptions = [
  { id:"RX001", patientId:"P001", patientName:"Amina Osei",    prescribedBy:"Dr. Sarah Njoroge", date:"2026-03-01", drugs:[{name:"Amlodipine",dose:"5mg",freq:"Once daily",duration:"30 days"},{name:"Atorvastatin",dose:"20mg",freq:"At night",duration:"30 days"}], status:"Dispensed", notes:"Take with or without food. Monitor BP weekly." },
  { id:"RX002", patientId:"P002", patientName:"James Mwangi",  prescribedBy:"Dr. Sarah Njoroge", date:"2026-03-03", drugs:[{name:"Metformin",dose:"1000mg",freq:"Twice daily",duration:"90 days"},{name:"Glibenclamide",dose:"5mg",freq:"Before breakfast",duration:"90 days"}], status:"Dispensed", notes:"Avoid alcohol. Monitor blood glucose." },
  { id:"RX003", patientId:"P003", patientName:"Fatuma Hassan", prescribedBy:"Dr. Ali Bashir",    date:"2026-03-04", drugs:[{name:"Artesunate IV",dose:"2.4mg/kg",freq:"Every 12h (1st day), then daily",duration:"3 days"},{name:"Paracetamol",dose:"1g",freq:"Every 8h PRN",duration:"5 days"}], status:"Active", notes:"Switch to oral ACT on day 4 if tolerating orally." },
  { id:"RX004", patientId:"P004", patientName:"Peter Kamau",   prescribedBy:"Dr. Ali Bashir",    date:"2026-03-02", drugs:[{name:"Ceftriaxone IV",dose:"2g",freq:"Once daily",duration:"7 days"},{name:"Azithromycin",dose:"500mg",freq:"Once daily",duration:"5 days"},{name:"Enoxaparin",dose:"40mg",freq:"Once daily SC",duration:"7 days"}], status:"Active", notes:"DVT prophylaxis. Monitor renal function." },
];
const initialDischarges = [
  { id:"DC001", patientId:"P002", patientName:"James Mwangi", dischargeDate:"2026-03-05", admitDate:"2026-03-03", attendingDoctor:"Dr. Sarah Njoroge", condition:"Stable", finalDiagnosis:"Type 2 Diabetes Mellitus — poorly controlled", treatmentSummary:"Adjusted oral hypoglycaemics. Dietary counselling provided. HbA1c 8.4% on admission.", followUp:"1 week — Diabetic Clinic", instructions:"Low GI diet. Daily blood glucose monitoring. Report if BG >15 or <4.", status:"Completed" },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const uid = p => p + Math.random().toString(36).slice(2,7).toUpperCase();
const statusColors = {
  Admitted:"#3b82f6",Outpatient:"#10b981",ICU:"#ef4444",Discharged:"#6b7280",
  "On Duty":"#10b981","Off Duty":"#6b7280","On Leave":"#f59e0b",
  Scheduled:"#3b82f6",Completed:"#10b981",Cancelled:"#ef4444",
  Paid:"#10b981",Partial:"#f59e0b",Unpaid:"#ef4444",
  Active:"#3b82f6",Dispensed:"#10b981",Pending:"#f59e0b",
  Normal:"#10b981",High:"#ef4444",Low:"#f59e0b",
};
const Badge = ({text,size=12})=>(
  <span style={{background:(statusColors[text]||"#6b7280")+"22",color:statusColors[text]||"#6b7280",border:`1px solid ${(statusColors[text]||"#6b7280")}44`,padding:`2px ${size===11?8:10}px`,borderRadius:99,fontSize:size,fontWeight:600,whiteSpace:"nowrap"}}>{text}</span>
);

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = { bg:"#070e18", surface:"#0f1923", border:"#1e3048", deep:"#0a1220", text:"#e2eaf6", muted:"#7a99bb", dim:"#4a6a8a", blue:"#3b82f6", green:"#10b981", red:"#ef4444", amber:"#f59e0b", purple:"#a78bfa" };
const inputStyle = { width:"100%",background:C.deep,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,padding:"9px 12px",fontSize:14,boxSizing:"border-box",outline:"none",fontFamily:"inherit" };
const btnPrimary = (color="#1d4ed8") => ({ display:"flex",alignItems:"center",gap:6,background:color,color:"#fff",border:"none",borderRadius:8,padding:"9px 16px",cursor:"pointer",fontWeight:700,fontSize:14,fontFamily:"inherit" });

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = ({d,s=18})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const I = {
  dash:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  patients:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  staff:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  cal:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z",
  bill:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2",
  lab:"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11l-2 4h10l-2-4V3",
  rx:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  discharge:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  pdf:"M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4 M14 2v6h6 M3 15h6 M6 12v6",
  plus:"M12 5v14M5 12h14",
  search:"M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  edit:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:"M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6",
  close:"M18 6L6 18M6 6l12 12",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  print:"M6 9V2h12v7 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v8H6z",
  check:"M20 6L9 17l-5-5",
};

// ─── BASE COMPONENTS ──────────────────────────────────────────────────────────
function Modal({title,onClose,children,wide=false}){
  return(
    <div style={{position:"fixed",inset:0,background:"#000b",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,overflowY:"auto"}}>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,width:"100%",maxWidth:wide?780:540,maxHeight:"92vh",overflow:"auto",padding:28,margin:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h3 style={{margin:0,color:C.text,fontSize:18,fontFamily:"'Playfair Display',serif"}}>{title}</h3>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,cursor:"pointer"}}><Ic d={I.close}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Field({label,children}){
  return <div style={{marginBottom:14}}><label style={{display:"block",color:C.muted,fontSize:11,marginBottom:5,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</label>{children}</div>;
}
const Inp = p=><input style={inputStyle} {...p}/>;
const Sel = ({children,...p})=><select style={inputStyle} {...p}>{children}</select>;
const Txt = p=><textarea style={{...inputStyle,resize:"vertical",minHeight:80}} {...p}/>;

function SearchBar({value,onChange,placeholder}){
  return(
    <div style={{position:"relative",flex:1,maxWidth:360}}>
      <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.dim}}><Ic d={I.search} s={16}/></div>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||"Search…"} style={{...inputStyle,paddingLeft:34,width:"100%"}}/>
    </div>
  );
}
function StatCard({label,value,icon,color,sub}){
  return(
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 20px",flex:1,minWidth:155}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{color:C.dim,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>{label}</div>
          <div style={{color:C.text,fontSize:28,fontWeight:800,fontFamily:"'Playfair Display',serif",lineHeight:1}}>{value}</div>
          {sub&&<div style={{color:C.dim,fontSize:11,marginTop:4}}>{sub}</div>}
        </div>
        <div style={{background:color+"22",color,borderRadius:10,padding:9}}><Ic d={icon} s={20}/></div>
      </div>
    </div>
  );
}
function Table({cols,rows,onEdit,onDelete,onView}){
  return(
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead>
          <tr>{cols.map(c=><th key={c.key} style={{textAlign:"left",padding:"9px 14px",color:C.dim,fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:`1px solid ${C.border}`}}>{c.label}</th>)}
          {(onEdit||onDelete||onView)&&<th style={{borderBottom:`1px solid ${C.border}`}}/>}</tr>
        </thead>
        <tbody>
          {rows.map((row,i)=>(
            <tr key={i} style={{borderBottom:`1px solid #0d1e30`}}>
              {cols.map(c=><td key={c.key} style={{padding:"10px 14px",color:"#c8daf0",verticalAlign:"middle"}}>{c.badge?<Badge text={row[c.key]}/>:c.render?c.render(row):row[c.key]}</td>)}
              {(onEdit||onDelete||onView)&&(
                <td style={{padding:"10px 14px",textAlign:"right",whiteSpace:"nowrap"}}>
                  {onView&&<button onClick={()=>onView(row)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",marginRight:6}}><Ic d={I.eye} s={15}/></button>}
                  {onEdit&&<button onClick={()=>onEdit(row)} style={{background:"none",border:"none",color:C.blue,cursor:"pointer",marginRight:6}}><Ic d={I.edit} s={15}/></button>}
                  {onDelete&&<button onClick={()=>onDelete(row)} style={{background:"none",border:"none",color:C.red,cursor:"pointer"}}><Ic d={I.trash} s={15}/></button>}
                </td>
              )}
            </tr>
          ))}
          {rows.length===0&&<tr><td colSpan={cols.length+1} style={{textAlign:"center",padding:32,color:C.dim}}>No records found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({patients,staff,appointments,bills,labs,prescriptions,discharges}){
  const admitted=patients.filter(p=>["Admitted","ICU"].includes(p.status)).length;
  const onDuty=staff.filter(s=>s.status==="On Duty").length;
  const revenue=bills.reduce((s,b)=>s+b.paid,0);
  const outstanding=bills.reduce((s,b)=>s+b.services.reduce((x,sv)=>x+sv.cost,0)-b.paid,0);
  const pendingLabs=labs.filter(l=>l.status==="Pending").length;
  const activePrescriptions=prescriptions.filter(r=>r.status==="Active").length;

  return(
    <div>
      <h2 style={{fontFamily:"'Playfair Display',serif",color:C.text,margin:"0 0 4px",fontSize:26}}>Dashboard Overview</h2>
      <p style={{color:C.dim,margin:"0 0 22px",fontSize:13}}>Thursday, 5 March 2026 — Nairobi General Clinic</p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <StatCard label="Patients" value={patients.length} icon={I.patients} color={C.blue} sub={`${admitted} admitted`}/>
        <StatCard label="Staff On Duty" value={onDuty} icon={I.staff} color={C.green} sub={`of ${staff.length} staff`}/>
        <StatCard label="Revenue (KES)" value={`${(revenue/1000).toFixed(0)}K`} icon={I.bill} color={C.purple} sub={`KES ${outstanding.toLocaleString()} due`}/>
        <StatCard label="Active Rx" value={activePrescriptions} icon={I.rx} color={C.amber} sub={`${pendingLabs} pending labs`}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {/* Recent labs */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 20px"}}>
          <h3 style={{margin:"0 0 14px",color:C.text,fontSize:14,fontWeight:700}}>Recent Lab Results</h3>
          {labs.slice(-3).reverse().map(l=>(
            <div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div>
                <div style={{color:"#c8daf0",fontWeight:600,fontSize:13}}>{l.patientName}</div>
                <div style={{color:C.dim,fontSize:11}}>{l.tests.map(t=>t.name).join(", ")} · {l.date}</div>
              </div>
              <Badge text={l.status}/>
            </div>
          ))}
        </div>
        {/* Active prescriptions */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 20px"}}>
          <h3 style={{margin:"0 0 14px",color:C.text,fontSize:14,fontWeight:700}}>Active Prescriptions</h3>
          {prescriptions.filter(r=>r.status==="Active").map(r=>(
            <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div>
                <div style={{color:"#c8daf0",fontWeight:600,fontSize:13}}>{r.patientName}</div>
                <div style={{color:C.dim,fontSize:11}}>{r.drugs.map(d=>d.name).join(", ")}</div>
              </div>
              <Badge text={r.status}/>
            </div>
          ))}
        </div>
        {/* Ward occupancy */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 20px",gridColumn:"1 / -1"}}>
          <h3 style={{margin:"0 0 14px",color:C.text,fontSize:14,fontWeight:700}}>Ward Occupancy</h3>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[["General",C.blue,20],["ICU",C.red,4],["Isolation",C.amber,6],["Maternity",C.green,12]].map(([ward,color,cap])=>{
              const count=patients.filter(p=>p.ward===ward).length;
              const pct=Math.round((count/cap)*100);
              return(
                <div key={ward} style={{flex:1,minWidth:130,background:C.deep,borderRadius:10,padding:"13px 15px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                    <span style={{color:"#c8daf0",fontWeight:600,fontSize:12}}>{ward}</span>
                    <span style={{color,fontSize:12,fontWeight:700}}>{count}/{cap}</span>
                  </div>
                  <div style={{background:C.border,borderRadius:99,height:5}}>
                    <div style={{background:color,width:`${pct}%`,height:"100%",borderRadius:99}}/>
                  </div>
                  <div style={{color:C.dim,fontSize:11,marginTop:4}}>{pct}% occupied</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
function Patients({patients,setPatients}){
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const filtered=patients.filter(p=>[p.name,p.id,p.diagnosis,p.status].some(v=>v.toLowerCase().includes(search.toLowerCase())));
  const openNew=()=>{setForm({id:uid("P"),status:"Outpatient",gender:"Male",blood:"O+",ward:"—"});setModal("edit");};
  const save=()=>{if(!form.name)return;if(modal==="new"||!patients.find(p=>p.id===form.id))setPatients(p=>[...p,form]);else setPatients(p=>p.map(x=>x.id===form.id?form:x));setModal(null);};
  const del=(p)=>{if(confirm(`Delete ${p.name}?`))setPatients(prev=>prev.filter(x=>x.id!==p.id));};
  const cols=[{key:"id",label:"ID"},{key:"name",label:"Patient"},{key:"age",label:"Age"},{key:"blood",label:"Blood"},{key:"diagnosis",label:"Diagnosis"},{key:"status",label:"Status",badge:true},{key:"ward",label:"Ward"},{key:"admitDate",label:"Admit"}];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div><h2 style={{fontFamily:"'Playfair Display',serif",color:C.text,margin:0,fontSize:22}}>Patient Management</h2><p style={{color:C.dim,margin:"3px 0 0",fontSize:12}}>{patients.length} total</p></div>
        <button onClick={openNew} style={btnPrimary(C.blue)}><Ic d={I.plus} s={15}/> Add Patient</button>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}><SearchBar value={search} onChange={setSearch} placeholder="Search patients…"/></div>
        <Table cols={cols} rows={filtered} onEdit={r=>{setForm({...r});setModal("edit");}} onDelete={del}/>
      </div>
      {modal&&<Modal title="Patient" onClose={()=>setModal(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <div style={{gridColumn:"1/-1"}}><Field label="Full Name"><Inp value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></Field></div>
          <Field label="Age"><Inp type="number" value={form.age||""} onChange={e=>setForm(f=>({...f,age:e.target.value}))}/></Field>
          <Field label="Gender"><Sel value={form.gender||"Male"} onChange={e=>setForm(f=>({...f,gender:e.target.value}))}><option>Male</option><option>Female</option><option>Other</option></Sel></Field>
          <Field label="Blood"><Sel value={form.blood||"O+"} onChange={e=>setForm(f=>({...f,blood:e.target.value}))}>{["O+","O-","A+","A-","B+","B-","AB+","AB-"].map(b=><option key={b}>{b}</option>)}</Sel></Field>
          <Field label="Phone"><Inp value={form.phone||""} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></Field>
          <Field label="Status"><Sel value={form.status||"Outpatient"} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Outpatient","Admitted","ICU","Discharged"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
          <div style={{gridColumn:"1/-1"}}><Field label="Diagnosis"><Inp value={form.diagnosis||""} onChange={e=>setForm(f=>({...f,diagnosis:e.target.value}))}/></Field></div>
          <Field label="Ward"><Inp value={form.ward||""} onChange={e=>setForm(f=>({...f,ward:e.target.value}))}/></Field>
          <Field label="Admit Date"><Inp type="date" value={form.admitDate||""} onChange={e=>setForm(f=>({...f,admitDate:e.target.value}))}/></Field>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:16}}>
          <button onClick={()=>setModal(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"9px 18px",cursor:"pointer"}}>Cancel</button>
          <button onClick={save} style={btnPrimary(C.blue)}>Save</button>
        </div>
      </Modal>}
    </div>
  );
}

// ─── STAFF ────────────────────────────────────────────────────────────────────
function Staff({staff,setStaff}){
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const filtered=staff.filter(s=>[s.name,s.id,s.role,s.dept,s.status].some(v=>v.toLowerCase().includes(search.toLowerCase())));
  const save=()=>{if(!form.name)return;if(!staff.find(s=>s.id===form.id))setStaff(p=>[...p,form]);else setStaff(p=>p.map(x=>x.id===form.id?form:x));setModal(null);};
  const cols=[{key:"id",label:"ID"},{key:"name",label:"Name"},{key:"role",label:"Role"},{key:"dept",label:"Dept"},{key:"shift",label:"Shift"},{key:"phone",label:"Phone"},{key:"status",label:"Status",badge:true}];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div><h2 style={{fontFamily:"'Playfair Display',serif",color:C.text,margin:0,fontSize:22}}>Staff & Doctors</h2><p style={{color:C.dim,margin:"3px 0 0",fontSize:12}}>{staff.filter(s=>s.status==="On Duty").length} on duty of {staff.length}</p></div>
        <button onClick={()=>{setForm({id:uid("S"),status:"On Duty",shift:"Morning",role:"Nurse"});setModal("edit");}} style={btnPrimary(C.green)}><Ic d={I.plus} s={15}/> Add Staff</button>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}><SearchBar value={search} onChange={setSearch} placeholder="Search staff…"/></div>
        <Table cols={cols} rows={filtered} onEdit={r=>{setForm({...r});setModal("edit");}} onDelete={r=>{if(confirm(`Remove ${r.name}?`))setStaff(p=>p.filter(x=>x.id!==r.id));}}/>
      </div>
      {modal&&<Modal title="Staff Member" onClose={()=>setModal(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <div style={{gridColumn:"1/-1"}}><Field label="Full Name"><Inp value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></Field></div>
          <Field label="Role"><Sel value={form.role||"Nurse"} onChange={e=>setForm(f=>({...f,role:e.target.value}))}>{["Physician","Surgeon","Pediatrician","Nurse","Lab Tech","Pharmacist","Admin"].map(r=><option key={r}>{r}</option>)}</Sel></Field>
          <Field label="Department"><Inp value={form.dept||""} onChange={e=>setForm(f=>({...f,dept:e.target.value}))}/></Field>
          <Field label="Phone"><Inp value={form.phone||""} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></Field>
          <Field label="Shift"><Sel value={form.shift||"Morning"} onChange={e=>setForm(f=>({...f,shift:e.target.value}))}>{["Morning","Afternoon","Night"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
          <div style={{gridColumn:"1/-1"}}><Field label="Status"><Sel value={form.status||"On Duty"} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["On Duty","Off Duty","On Leave"].map(s=><option key={s}>{s}</option>)}</Sel></Field></div>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:16}}>
          <button onClick={()=>setModal(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"9px 18px",cursor:"pointer"}}>Cancel</button>
          <button onClick={save} style={btnPrimary(C.green)}>Save</button>
        </div>
      </Modal>}
    </div>
  );
}

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
function Appointments({appointments,setAppointments,patients,staff}){
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const doctors=staff.filter(s=>["Physician","Surgeon","Pediatrician"].includes(s.role));
  const filtered=appointments.filter(a=>[a.patientName,a.doctorName,a.type,a.status,a.date].some(v=>v.toLowerCase().includes(search.toLowerCase())));
  const save=()=>{if(!form.date||!form.time)return;if(!appointments.find(a=>a.id===form.id))setAppointments(p=>[...p,form]);else setAppointments(p=>p.map(x=>x.id===form.id?form:x));setModal(null);};
  const cols=[{key:"id",label:"ID"},{key:"patientName",label:"Patient"},{key:"doctorName",label:"Doctor"},{key:"date",label:"Date"},{key:"time",label:"Time"},{key:"type",label:"Type"},{key:"status",label:"Status",badge:true}];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div><h2 style={{fontFamily:"'Playfair Display',serif",color:C.text,margin:0,fontSize:22}}>Appointments</h2><p style={{color:C.dim,margin:"3px 0 0",fontSize:12}}>{appointments.filter(a=>a.status==="Scheduled").length} scheduled</p></div>
        <button onClick={()=>{setForm({id:uid("A"),status:"Scheduled",type:"Consultation",patientId:patients[0]?.id,patientName:patients[0]?.name,doctorId:doctors[0]?.id,doctorName:doctors[0]?.name});setModal("edit");}} style={btnPrimary("#d97706")}><Ic d={I.plus} s={15}/> New</button>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}><SearchBar value={search} onChange={setSearch}/></div>
        <Table cols={cols} rows={filtered} onEdit={r=>{setForm({...r});setModal("edit");}} onDelete={r=>{if(confirm("Delete?"))setAppointments(p=>p.filter(x=>x.id!==r.id));}}/>
      </div>
      {modal&&<Modal title="Appointment" onClose={()=>setModal(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <div style={{gridColumn:"1/-1"}}><Field label="Patient"><Sel value={form.patientId||""} onChange={e=>{const p=patients.find(x=>x.id===e.target.value);setForm(f=>({...f,patientId:p?.id,patientName:p?.name}));}}>{patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Sel></Field></div>
          <div style={{gridColumn:"1/-1"}}><Field label="Doctor"><Sel value={form.doctorId||""} onChange={e=>{const d=doctors.find(x=>x.id===e.target.value);setForm(f=>({...f,doctorId:d?.id,doctorName:d?.name}));}}>{doctors.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</Sel></Field></div>
          <Field label="Date"><Inp type="date" value={form.date||""} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Field>
          <Field label="Time"><Inp type="time" value={form.time||""} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/></Field>
          <Field label="Type"><Sel value={form.type||"Consultation"} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>{["Consultation","Follow-up","Check-up","Emergency","Procedure"].map(t=><option key={t}>{t}</option>)}</Sel></Field>
          <Field label="Status"><Sel value={form.status||"Scheduled"} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Scheduled","Completed","Cancelled"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:16}}>
          <button onClick={()=>setModal(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"9px 18px",cursor:"pointer"}}>Cancel</button>
          <button onClick={save} style={btnPrimary("#d97706")}>Save</button>
        </div>
      </Modal>}
    </div>
  );
}

// ─── BILLING + PDF INVOICE ────────────────────────────────────────────────────
function Billing({bills,setBills,patients}){
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(null);
  const [payAmt,setPayAmt]=useState("");
  const total=b=>b.services.reduce((s,sv)=>s+sv.cost,0);
  const balance=b=>total(b)-b.paid;
  const filtered=bills.filter(b=>[b.patientName,b.id,b.status].some(v=>v.toLowerCase().includes(search.toLowerCase())));

  const printInvoice=(b)=>{
    const win=window.open("","_blank");
    const tot=total(b); const bal=balance(b);
    win.document.write(`<!DOCTYPE html><html><head><title>Invoice ${b.id}</title>
    <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Helvetica Neue',sans-serif;color:#1a2535;background:#fff;padding:40px}
    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;padding-bottom:20px;border-bottom:2px solid #1d4ed8}
    .clinic{font-size:22px;font-weight:800;color:#1d4ed8}.sub{font-size:12px;color:#6b7280;margin-top:3px}
    .badge{display:inline-block;padding:3px 12px;border-radius:99px;font-size:12px;font-weight:700}
    .paid{background:#d1fae5;color:#065f46}.partial{background:#fef3c7;color:#92400e}.unpaid{background:#fee2e2;color:#991b1b}
    h2{font-size:16px;font-weight:700;margin-bottom:10px;color:#1a2535}
    .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:24px}
    .info-item label{font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:#6b7280;font-weight:700;display:block;margin-bottom:2px}
    .info-item span{font-size:13px;color:#1a2535;font-weight:600}
    table{width:100%;border-collapse:collapse;margin-bottom:20px}
    thead th{background:#1d4ed8;color:white;padding:10px 14px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.06em}
    tbody tr{border-bottom:1px solid #e5e7eb}
    tbody td{padding:10px 14px;font-size:13px}
    .totals{background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:20px;max-width:280px;margin-left:auto}
    .totals .row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px}
    .totals .row.total{font-weight:800;font-size:15px;border-top:1px solid #e5e7eb;margin-top:6px;padding-top:10px}
    .totals .balance{color:${bal>0?"#dc2626":"#059669"}}
    .footer{text-align:center;color:#9ca3af;font-size:11px;margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb}
    @media print{body{padding:20px}.no-print{display:none}}</style></head><body>
    <div class="header">
      <div><div class="clinic">🏥 Nairobi General Clinic</div><div class="sub">P.O. Box 12345, Nairobi · Tel: +254-20-000-0000 · clinic@example.com</div></div>
      <div style="text-align:right"><div style="font-size:22px;font-weight:800;color:#374151">INVOICE</div>
        <div style="font-size:13px;color:#6b7280">#${b.id}</div>
        <div style="margin-top:6px"><span class="badge ${b.status==="Paid"?"paid":b.status==="Partial"?"partial":"unpaid"}">${b.status}</span></div>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-item"><label>Patient Name</label><span>${b.patientName}</span></div>
      <div class="info-item"><label>Patient ID</label><span>${b.patientId}</span></div>
      <div class="info-item"><label>Invoice Date</label><span>${b.date}</span></div>
      <div class="info-item"><label>Print Date</label><span>${new Date().toLocaleDateString()}</span></div>
    </div>
    <h2>Services Rendered</h2>
    <table><thead><tr><th>#</th><th>Description</th><th style="text-align:right">Amount (KES)</th></tr></thead>
    <tbody>${b.services.map((s,i)=>`<tr><td style="color:#6b7280">${i+1}</td><td>${s.name}</td><td style="text-align:right;font-weight:600">${s.cost.toLocaleString()}</td></tr>`).join("")}</tbody></table>
    <div class="totals">
      <div class="row"><span>Subtotal</span><span>KES ${tot.toLocaleString()}</span></div>
      <div class="row" style="color:#059669"><span>Amount Paid</span><span>KES ${b.paid.toLocaleString()}</span></div>
      <div class="row total balance"><span>Balance Due</span><span>KES ${bal.toLocaleString()}</span></div>
    </div>
    <div class="footer">Thank you for choosing Nairobi General Clinic. For billing queries call: +254-20-000-0000<br>This is a computer-generated invoice.</div>
    <div class="no-print" style="margin-top:24px;text-align:center"><button onclick="window.print()" style="background:#1d4ed8;color:white;border:none;padding:10px 28px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:700">🖨 Print / Save as PDF</button></div>
    </body></html>`);
    win.document.close();
  };

  const makePayment=()=>{
    const amt=parseFloat(payAmt); if(!amt||amt<=0)return;
    setBills(prev=>prev.map(b=>{
      if(b.id!==selected.id)return b;
      const np=Math.min(b.paid+amt,total(b));
      return{...b,paid:np,status:np>=total(b)?"Paid":"Partial"};
    }));
    setPayAmt(""); setSelected(null);
  };

  const cols=[
    {key:"id",label:"Bill ID"},{key:"patientName",label:"Patient"},{key:"date",label:"Date"},
    {key:"total",label:"Total (KES)",render:b=>total(b).toLocaleString()},
    {key:"paid",label:"Paid",render:b=>b.paid.toLocaleString()},
    {key:"balance",label:"Balance",render:b=><span style={{color:balance(b)>0?C.red:C.green,fontWeight:700}}>KES {balance(b).toLocaleString()}</span>},
    {key:"status",label:"Status",badge:true},
  ];

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div><h2 style={{fontFamily:"'Playfair Display',serif",color:C.text,margin:0,fontSize:22}}>Billing & Invoicing</h2><p style={{color:C.dim,margin:"3px 0 0",fontSize:12}}>{bills.filter(b=>b.status==="Unpaid").length} unpaid</p></div>
      </div>
      <div style={{display:"flex",gap:12,marginBottom:18,flexWrap:"wrap"}}>
        <StatCard label="Collected" value={`KES ${(bills.reduce((s,b)=>s+b.paid,0)/1000).toFixed(0)}K`} icon={I.check} color={C.green}/>
        <StatCard label="Outstanding" value={`KES ${(bills.reduce((s,b)=>s+balance(b),0)/1000).toFixed(0)}K`} icon={I.bill} color={C.red}/>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}><SearchBar value={search} onChange={setSearch}/></div>
        <Table cols={cols} rows={filtered} onView={r=>setSelected(r)} onEdit={r=>setSelected(r)}/>
      </div>
      {selected&&<Modal title={`Bill ${selected.id} — ${selected.patientName}`} onClose={()=>setSelected(null)}>
        <div style={{background:C.deep,borderRadius:10,padding:"14px 16px",marginBottom:14}}>
          {selected.services.map((sv,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:7,color:"#c8daf0",fontSize:13}}><span>{sv.name}</span><span>KES {sv.cost.toLocaleString()}</span></div>)}
          <div style={{borderTop:`1px solid ${C.border}`,marginTop:8,paddingTop:8,display:"flex",justifyContent:"space-between",fontWeight:700,color:C.text}}><span>Total</span><span>KES {total(selected).toLocaleString()}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",color:C.green,fontSize:13,marginTop:4}}><span>Paid</span><span>KES {selected.paid.toLocaleString()}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",color:balance(selected)>0?C.red:C.green,fontWeight:700,marginTop:3}}><span>Balance</span><span>KES {balance(selected).toLocaleString()}</span></div>
        </div>
        {balance(selected)>0&&<Field label="Record Payment (KES)"><Inp type="number" value={payAmt} onChange={e=>setPayAmt(e.target.value)} placeholder={`Max ${balance(selected).toLocaleString()}`}/></Field>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14}}>
          <button onClick={()=>printInvoice(selected)} style={{...btnPrimary(C.dim),fontSize:13}}><Ic d={I.print} s={15}/> Print Invoice</button>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"9px 16px",cursor:"pointer"}}>Close</button>
            {balance(selected)>0&&<button onClick={makePayment} style={btnPrimary(C.purple)}>Record Payment</button>}
          </div>
        </div>
      </Modal>}
    </div>
  );
}

// ─── LAB RESULTS ─────────────────────────────────────────────────────────────
function LabResults({labs,setLabs,patients,staff}){
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [view,setView]=useState(null);
  const doctors=staff.filter(s=>["Physician","Surgeon","Pediatrician"].includes(s.role));
  const filtered=labs.filter(l=>[l.patientName,l.id,l.status].some(v=>v.toLowerCase().includes(search.toLowerCase())));

  const openNew=()=>setForm({id:uid("L"),status:"Pending",date:new Date().toISOString().slice(0,10),tests:[{name:"",result:"",flag:"Normal"}],patientId:patients[0]?.id,patientName:patients[0]?.name,orderedBy:doctors[0]?.name});
  const addTest=()=>setForm(f=>({...f,tests:[...f.tests,{name:"",result:"",flag:"Normal"}]}));
  const updTest=(i,k,v)=>setForm(f=>({...f,tests:f.tests.map((t,j)=>j===i?{...t,[k]:v}:t)}));
  const save=()=>{if(!form.patientId)return;if(!labs.find(l=>l.id===form.id))setLabs(p=>[...p,form]);else setLabs(p=>p.map(x=>x.id===form.id?form:x));setModal(null);};

  const flagColor={Normal:C.green,High:C.red,Low:C.amber,Critical:"#f43f5e"};
  const cols=[{key:"id",label:"ID"},{key:"patientName",label:"Patient"},{key:"orderedBy",label:"Ordered By"},{key:"date",label:"Date"},
    {key:"tests",label:"Tests",render:l=><span style={{color:C.muted,fontSize:12}}>{l.tests.map(t=>t.name).join(", ")}</span>},
    {key:"status",label:"Status",badge:true}];

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div><h2 style={{fontFamily:"'Playfair Display',serif",color:C.text,margin:0,fontSize:22}}>Lab Results</h2><p style={{color:C.dim,margin:"3px 0 0",fontSize:12}}>{labs.length} records · {labs.filter(l=>l.status==="Pending").length} pending</p></div>
        <button onClick={()=>{openNew();setModal("edit");}} style={btnPrimary("#0891b2")}><Ic d={I.plus} s={15}/> New Order</button>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}><SearchBar value={search} onChange={setSearch} placeholder="Search labs…"/></div>
        <Table cols={cols} rows={filtered} onView={r=>setView(r)} onEdit={r=>{setForm({...r});setModal("edit");}} onDelete={r=>{if(confirm("Delete?"))setLabs(p=>p.filter(x=>x.id!==r.id));}}/>
      </div>

      {/* View result detail */}
      {view&&<Modal title={`Lab Results — ${view.id}`} wide onClose={()=>setView(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px",background:C.deep,borderRadius:10,padding:"14px 16px",marginBottom:16}}>
          {[["Patient",view.patientName],["Ordered By",view.orderedBy],["Date",view.date],["Status",null]].map(([l,v])=>(
            <div key={l} style={{marginBottom:8}}><div style={{color:C.dim,fontSize:10,textTransform:"uppercase",fontWeight:700,letterSpacing:"0.07em",marginBottom:2}}>{l}</div>
              {l==="Status"?<Badge text={view.status}/>:<div style={{color:C.text,fontSize:13,fontWeight:600}}>{v}</div>}
            </div>
          ))}
        </div>
        <div style={{marginBottom:14}}>
          <div style={{color:C.dim,fontSize:11,fontWeight:700,textTransform:"uppercase",marginBottom:10}}>Test Results</div>
          {view.tests.map((t,i)=>(
            <div key={i} style={{background:C.deep,borderRadius:8,padding:"10px 14px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{color:C.text,fontWeight:600,fontSize:13}}>{t.name}</div><div style={{color:C.muted,fontSize:12,marginTop:2}}>{t.result}</div></div>
              <span style={{background:(flagColor[t.flag]||C.dim)+"22",color:flagColor[t.flag]||C.dim,border:`1px solid ${(flagColor[t.flag]||C.dim)}44`,padding:"2px 10px",borderRadius:99,fontSize:11,fontWeight:700}}>{t.flag}</span>
            </div>
          ))}
        </div>
        {view.notes&&<div style={{background:C.deep,borderRadius:8,padding:"10px 14px"}}><div style={{color:C.dim,fontSize:11,fontWeight:700,marginBottom:4}}>CLINICAL NOTES</div><div style={{color:"#c8daf0",fontSize:13}}>{view.notes}</div></div>}
      </Modal>}

      {/* Edit/New */}
      {modal&&<Modal title={form.id?.startsWith("L")&&labs.find(l=>l.id===form.id)?"Edit Lab Order":"New Lab Order"} wide onClose={()=>setModal(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <div style={{gridColumn:"1/-1"}}><Field label="Patient"><Sel value={form.patientId||""} onChange={e=>{const p=patients.find(x=>x.id===e.target.value);setForm(f=>({...f,patientId:p?.id,patientName:p?.name}));}}>{patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Sel></Field></div>
          <Field label="Ordered By"><Sel value={form.orderedBy||""} onChange={e=>setForm(f=>({...f,orderedBy:e.target.value}))}>{doctors.map(d=><option key={d.id}>{d.name}</option>)}</Sel></Field>
          <Field label="Date"><Inp type="date" value={form.date||""} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Field>
          <Field label="Status"><Sel value={form.status||"Pending"} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Pending","Completed","Cancelled"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
        </div>
        <div style={{marginTop:4,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <label style={{color:C.muted,fontSize:11,fontWeight:700,textTransform:"uppercase"}}>Tests</label>
            <button onClick={addTest} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:12}}>+ Add Test</button>
          </div>
          {(form.tests||[]).map((t,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 2fr 100px",gap:8,marginBottom:8}}>
              <Inp placeholder="Test name" value={t.name} onChange={e=>updTest(i,"name",e.target.value)}/>
              <Inp placeholder="Result" value={t.result} onChange={e=>updTest(i,"result",e.target.value)}/>
              <Sel value={t.flag} onChange={e=>updTest(i,"flag",e.target.value)}><option>Normal</option><option>High</option><option>Low</option><option>Critical</option></Sel>
            </div>
          ))}
        </div>
        <Field label="Clinical Notes"><Txt value={form.notes||""} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></Field>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:14}}>
          <button onClick={()=>setModal(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"9px 18px",cursor:"pointer"}}>Cancel</button>
          <button onClick={save} style={btnPrimary("#0891b2")}>Save</button>
        </div>
      </Modal>}
    </div>
  );
}

// ─── PRESCRIPTIONS ────────────────────────────────────────────────────────────
function Prescriptions({prescriptions,setPrescriptions,patients,staff}){
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [view,setView]=useState(null);
  const doctors=staff.filter(s=>["Physician","Surgeon","Pediatrician"].includes(s.role));
  const filtered=prescriptions.filter(r=>[r.patientName,r.id,r.status].some(v=>v.toLowerCase().includes(search.toLowerCase())));

  const openNew=()=>setForm({id:uid("RX"),status:"Active",date:new Date().toISOString().slice(0,10),drugs:[{name:"",dose:"",freq:"",duration:""}],patientId:patients[0]?.id,patientName:patients[0]?.name,prescribedBy:doctors[0]?.name});
  const addDrug=()=>setForm(f=>({...f,drugs:[...f.drugs,{name:"",dose:"",freq:"",duration:""}]}));
  const updDrug=(i,k,v)=>setForm(f=>({...f,drugs:f.drugs.map((d,j)=>j===i?{...d,[k]:v}:d)}));
  const save=()=>{if(!form.patientId)return;if(!prescriptions.find(r=>r.id===form.id))setPrescriptions(p=>[...p,form]);else setPrescriptions(p=>p.map(x=>x.id===form.id?form:x));setModal(null);};

  const cols=[{key:"id",label:"ID"},{key:"patientName",label:"Patient"},{key:"prescribedBy",label:"Prescribed By"},{key:"date",label:"Date"},
    {key:"drugs",label:"Medications",render:r=><span style={{color:C.muted,fontSize:12}}>{r.drugs.map(d=>d.name).join(", ")}</span>},
    {key:"status",label:"Status",badge:true}];

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div><h2 style={{fontFamily:"'Playfair Display',serif",color:C.text,margin:0,fontSize:22}}>Prescriptions</h2><p style={{color:C.dim,margin:"3px 0 0",fontSize:12}}>{prescriptions.filter(r=>r.status==="Active").length} active</p></div>
        <button onClick={()=>{openNew();setModal("edit");}} style={btnPrimary(C.amber)}><Ic d={I.plus} s={15}/> New Rx</button>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}><SearchBar value={search} onChange={setSearch} placeholder="Search prescriptions…"/></div>
        <Table cols={cols} rows={filtered} onView={r=>setView(r)} onEdit={r=>{setForm({...r});setModal("edit");}} onDelete={r=>{if(confirm("Delete?"))setPrescriptions(p=>p.filter(x=>x.id!==r.id));}}/>
      </div>

      {view&&<Modal title={`Prescription ${view.id}`} wide onClose={()=>setView(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px",background:C.deep,borderRadius:10,padding:"14px 16px",marginBottom:16}}>
          {[["Patient",view.patientName],["Prescribed By",view.prescribedBy],["Date",view.date],["Status",null]].map(([l,v])=>(
            <div key={l} style={{marginBottom:8}}><div style={{color:C.dim,fontSize:10,textTransform:"uppercase",fontWeight:700,marginBottom:2}}>{l}</div>
              {l==="Status"?<Badge text={view.status}/>:<div style={{color:C.text,fontSize:13,fontWeight:600}}>{v}</div>}
            </div>
          ))}
        </div>
        <div style={{marginBottom:14}}>
          <div style={{color:C.dim,fontSize:11,fontWeight:700,textTransform:"uppercase",marginBottom:8}}>Medications</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr>{["Drug","Dose","Frequency","Duration"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 12px",color:C.dim,fontSize:11,textTransform:"uppercase",background:C.deep,borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
            <tbody>{view.drugs.map((d,i)=><tr key={i} style={{borderBottom:`1px solid #0d1e30`}}>{[d.name,d.dose,d.freq,d.duration].map((v,j)=><td key={j} style={{padding:"9px 12px",color:"#c8daf0"}}>{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
        {view.notes&&<div style={{background:C.deep,borderRadius:8,padding:"10px 14px"}}><div style={{color:C.dim,fontSize:11,fontWeight:700,marginBottom:4}}>NOTES</div><div style={{color:"#c8daf0",fontSize:13}}>{view.notes}</div></div>}
      </Modal>}

      {modal&&<Modal title="Prescription" wide onClose={()=>setModal(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <div style={{gridColumn:"1/-1"}}><Field label="Patient"><Sel value={form.patientId||""} onChange={e=>{const p=patients.find(x=>x.id===e.target.value);setForm(f=>({...f,patientId:p?.id,patientName:p?.name}));}}>{patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Sel></Field></div>
          <Field label="Prescribed By"><Sel value={form.prescribedBy||""} onChange={e=>setForm(f=>({...f,prescribedBy:e.target.value}))}>{doctors.map(d=><option key={d.id}>{d.name}</option>)}</Sel></Field>
          <Field label="Date"><Inp type="date" value={form.date||""} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></Field>
          <Field label="Status"><Sel value={form.status||"Active"} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Active","Dispensed","Expired","Cancelled"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
        </div>
        <div style={{marginTop:4,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <label style={{color:C.muted,fontSize:11,fontWeight:700,textTransform:"uppercase"}}>Medications</label>
            <button onClick={addDrug} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:12}}>+ Add Drug</button>
          </div>
          {(form.drugs||[]).map((d,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 2fr 1fr",gap:8,marginBottom:8}}>
              <Inp placeholder="Drug name" value={d.name} onChange={e=>updDrug(i,"name",e.target.value)}/>
              <Inp placeholder="Dose" value={d.dose} onChange={e=>updDrug(i,"dose",e.target.value)}/>
              <Inp placeholder="Frequency" value={d.freq} onChange={e=>updDrug(i,"freq",e.target.value)}/>
              <Inp placeholder="Duration" value={d.duration} onChange={e=>updDrug(i,"duration",e.target.value)}/>
            </div>
          ))}
        </div>
        <Field label="Notes / Instructions"><Txt value={form.notes||""} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></Field>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:14}}>
          <button onClick={()=>setModal(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"9px 18px",cursor:"pointer"}}>Cancel</button>
          <button onClick={save} style={btnPrimary(C.amber)}>Save</button>
        </div>
      </Modal>}
    </div>
  );
}

// ─── DISCHARGE SUMMARIES ──────────────────────────────────────────────────────
function Discharges({discharges,setDischarges,patients,staff,labs,prescriptions}){
  const [search,setSearch]=useState("");
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [view,setView]=useState(null);
  const doctors=staff.filter(s=>["Physician","Surgeon","Pediatrician"].includes(s.role));
  const filtered=discharges.filter(d=>[d.patientName,d.id,d.status].some(v=>v.toLowerCase().includes(search.toLowerCase())));

  const openNew=()=>setForm({id:uid("DC"),status:"Draft",dischargeDate:new Date().toISOString().slice(0,10),patientId:patients[0]?.id,patientName:patients[0]?.name,admitDate:patients[0]?.admitDate||"",attendingDoctor:doctors[0]?.name,condition:"Stable"});

  const save=()=>{if(!form.patientId)return;if(!discharges.find(d=>d.id===form.id))setDischarges(p=>[...p,form]);else setDischarges(p=>p.map(x=>x.id===form.id?form:x));setModal(null);};

  const printSummary=(d)=>{
    const ptLabs=labs.filter(l=>l.patientId===d.patientId);
    const ptRx=prescriptions.filter(r=>r.patientId===d.patientId);
    const win=window.open("","_blank");
    win.document.write(`<!DOCTYPE html><html><head><title>Discharge Summary ${d.id}</title>
    <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Helvetica Neue',sans-serif;color:#1a2535;padding:40px;font-size:13px}
    .header{border-bottom:3px solid #059669;padding-bottom:16px;margin-bottom:24px}
    .clinic{font-size:20px;font-weight:800;color:#059669}.doc-title{font-size:14px;font-weight:700;color:#374151;margin-top:4px;text-transform:uppercase;letter-spacing:0.05em}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 20px;background:#f0fdf4;border-radius:8px;padding:14px;margin-bottom:20px}
    .item label{font-size:10px;text-transform:uppercase;letter-spacing:0.06em;color:#6b7280;font-weight:700;display:block;margin-bottom:2px}
    .item span{font-size:13px;color:#1a2535;font-weight:600}
    .section{margin-bottom:18px}.section h3{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.07em;color:#059669;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #d1fae5}
    .section p{font-size:13px;color:#374151;line-height:1.6;background:#f8fafc;border-radius:6px;padding:10px 12px}
    table{width:100%;border-collapse:collapse;margin-top:6px;font-size:12px}
    thead th{background:#059669;color:white;padding:7px 10px;text-align:left;font-size:11px}
    tbody tr{border-bottom:1px solid #e5e7eb}tbody td{padding:7px 10px}
    .footer{text-align:center;color:#9ca3af;font-size:10px;margin-top:30px;padding-top:12px;border-top:1px solid #e5e7eb}
    .sig{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:30px}
    .sig-line{border-top:1px solid #374151;padding-top:6px;font-size:11px;color:#6b7280}
    @media print{.no-print{display:none}}</style></head><body>
    <div class="header"><div class="clinic">🏥 Nairobi General Clinic</div><div class="doc-title">Discharge Summary</div><div style="font-size:11px;color:#6b7280;margin-top:4px">Document ID: ${d.id} · Printed: ${new Date().toLocaleDateString()}</div></div>
    <div class="grid">
      <div class="item"><label>Patient Name</label><span>${d.patientName}</span></div>
      <div class="item"><label>Attending Doctor</label><span>${d.attendingDoctor}</span></div>
      <div class="item"><label>Admission Date</label><span>${d.admitDate}</span></div>
      <div class="item"><label>Discharge Date</label><span>${d.dischargeDate}</span></div>
      <div class="item"><label>Discharge Condition</label><span>${d.condition}</span></div>
      <div class="item"><label>Final Diagnosis</label><span>${d.finalDiagnosis||"—"}</span></div>
    </div>
    <div class="section"><h3>Treatment Summary</h3><p>${d.treatmentSummary||"—"}</p></div>
    ${ptLabs.length?`<div class="section"><h3>Investigations</h3><table><thead><tr><th>Date</th><th>Tests</th><th>Notes</th></tr></thead><tbody>${ptLabs.map(l=>`<tr><td>${l.date}</td><td>${l.tests.map(t=>t.name+" ("+t.flag+")").join(", ")}</td><td>${l.notes||""}</td></tr>`).join("")}</tbody></table></div>`:""}
    ${ptRx.length?`<div class="section"><h3>Medications on Discharge</h3><table><thead><tr><th>Drug</th><th>Dose</th><th>Frequency</th><th>Duration</th></tr></thead><tbody>${ptRx.flatMap(r=>r.drugs).map(drug=>`<tr><td>${drug.name}</td><td>${drug.dose}</td><td>${drug.freq}</td><td>${drug.duration}</td></tr>`).join("")}</tbody></table></div>`:""}
    <div class="section"><h3>Follow-up Plan</h3><p>${d.followUp||"—"}</p></div>
    <div class="section"><h3>Discharge Instructions</h3><p>${d.instructions||"—"}</p></div>
    <div class="sig">
      <div><div class="sig-line">Attending Doctor: ${d.attendingDoctor}</div></div>
      <div><div class="sig-line">Date: ${d.dischargeDate}</div></div>
    </div>
    <div class="footer">Nairobi General Clinic · Confidential Medical Document · For authorized use only</div>
    <div class="no-print" style="margin-top:20px;text-align:center"><button onclick="window.print()" style="background:#059669;color:white;border:none;padding:10px 28px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:700">🖨 Print / Save as PDF</button></div>
    </body></html>`);
    win.document.close();
  };

  const cols=[{key:"id",label:"ID"},{key:"patientName",label:"Patient"},{key:"attendingDoctor",label:"Doctor"},{key:"admitDate",label:"Admitted"},{key:"dischargeDate",label:"Discharged"},{key:"condition",label:"Condition"},{key:"status",label:"Status",badge:true}];

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div><h2 style={{fontFamily:"'Playfair Display',serif",color:C.text,margin:0,fontSize:22}}>Discharge Summaries</h2><p style={{color:C.dim,margin:"3px 0 0",fontSize:12}}>{discharges.length} records</p></div>
        <button onClick={()=>{openNew();setModal("edit");}} style={btnPrimary(C.green)}><Ic d={I.plus} s={15}/> New Summary</button>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`}}><SearchBar value={search} onChange={setSearch} placeholder="Search discharges…"/></div>
        <Table cols={cols} rows={filtered} onView={r=>setView(r)} onEdit={r=>{setForm({...r});setModal("edit");}} onDelete={r=>{if(confirm("Delete?"))setDischarges(p=>p.filter(x=>x.id!==r.id));}}/>
      </div>

      {view&&<Modal title={`Discharge Summary — ${view.patientName}`} wide onClose={()=>setView(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 20px",background:C.deep,borderRadius:10,padding:"14px 16px",marginBottom:16}}>
          {[["Patient",view.patientName],["Doctor",view.attendingDoctor],["Admitted",view.admitDate],["Discharged",view.dischargeDate],["Condition",view.condition],["Status",null]].map(([l,v])=>(
            <div key={l}><div style={{color:C.dim,fontSize:10,textTransform:"uppercase",fontWeight:700,marginBottom:2}}>{l}</div>
              {l==="Status"?<Badge text={view.status}/>:<div style={{color:C.text,fontSize:13,fontWeight:600}}>{v}</div>}
            </div>
          ))}
        </div>
        {[["Final Diagnosis",view.finalDiagnosis],["Treatment Summary",view.treatmentSummary],["Follow-up",view.followUp],["Discharge Instructions",view.instructions]].map(([l,v])=>v&&(
          <div key={l} style={{marginBottom:12}}>
            <div style={{color:C.dim,fontSize:10,textTransform:"uppercase",fontWeight:700,marginBottom:5}}>{l}</div>
            <div style={{background:C.deep,borderRadius:8,padding:"10px 14px",color:"#c8daf0",fontSize:13,lineHeight:1.6}}>{v}</div>
          </div>
        ))}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14}}>
          <button onClick={()=>printSummary(view)} style={{...btnPrimary(C.dim),fontSize:13}}><Ic d={I.print} s={15}/> Print Summary</button>
          <button onClick={()=>setView(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"9px 16px",cursor:"pointer"}}>Close</button>
        </div>
      </Modal>}

      {modal&&<Modal title="Discharge Summary" wide onClose={()=>setModal(null)}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <div style={{gridColumn:"1/-1"}}><Field label="Patient"><Sel value={form.patientId||""} onChange={e=>{const p=patients.find(x=>x.id===e.target.value);setForm(f=>({...f,patientId:p?.id,patientName:p?.name,admitDate:p?.admitDate||""}));}}>{patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Sel></Field></div>
          <Field label="Attending Doctor"><Sel value={form.attendingDoctor||""} onChange={e=>setForm(f=>({...f,attendingDoctor:e.target.value}))}>{doctors.map(d=><option key={d.id}>{d.name}</option>)}</Sel></Field>
          <Field label="Discharge Condition"><Sel value={form.condition||"Stable"} onChange={e=>setForm(f=>({...f,condition:e.target.value}))}>{["Stable","Improved","Critical","Deceased","Self-Discharge"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
          <Field label="Admission Date"><Inp type="date" value={form.admitDate||""} onChange={e=>setForm(f=>({...f,admitDate:e.target.value}))}/></Field>
          <Field label="Discharge Date"><Inp type="date" value={form.dischargeDate||""} onChange={e=>setForm(f=>({...f,dischargeDate:e.target.value}))}/></Field>
          <Field label="Status"><Sel value={form.status||"Draft"} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{["Draft","Completed"].map(s=><option key={s}>{s}</option>)}</Sel></Field>
        </div>
        <Field label="Final Diagnosis"><Inp value={form.finalDiagnosis||""} onChange={e=>setForm(f=>({...f,finalDiagnosis:e.target.value}))}/></Field>
        <Field label="Treatment Summary"><Txt value={form.treatmentSummary||""} onChange={e=>setForm(f=>({...f,treatmentSummary:e.target.value}))}/></Field>
        <Field label="Follow-up Plan"><Inp value={form.followUp||""} onChange={e=>setForm(f=>({...f,followUp:e.target.value}))}/></Field>
        <Field label="Discharge Instructions"><Txt value={form.instructions||""} onChange={e=>setForm(f=>({...f,instructions:e.target.value}))}/></Field>
        <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:14}}>
          <button onClick={()=>setModal(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"9px 18px",cursor:"pointer"}}>Cancel</button>
          <button onClick={save} style={btnPrimary(C.green)}>Save</button>
        </div>
      </Modal>}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState("dashboard");
  const [patients,setPatients]=useState(initialPatients);
  const [staff,setStaff]=useState(initialStaff);
  const [appointments,setAppointments]=useState(initialAppointments);
  const [bills,setBills]=useState(initialBills);
  const [labs,setLabs]=useState(initialLabs);
  const [prescriptions,setPrescriptions]=useState(initialPrescriptions);
  const [discharges,setDischarges]=useState(initialDischarges);

  const nav=[
    {key:"dashboard",label:"Dashboard",icon:I.dash,color:C.blue},
    {key:"patients",label:"Patients",icon:I.patients,color:"#60a5fa"},
    {key:"staff",label:"Staff",icon:I.staff,color:C.green},
    {key:"appointments",label:"Appointments",icon:I.cal,color:C.amber},
    {key:"billing",label:"Billing",icon:I.bill,color:C.purple},
    {key:"labs",label:"Lab Results",icon:I.lab,color:"#22d3ee"},
    {key:"prescriptions",label:"Prescriptions",icon:I.rx,color:C.amber},
    {key:"discharges",label:"Discharge",icon:I.discharge,color:C.green},
  ];

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{display:"flex",minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:"#c8daf0"}}>
        {/* Sidebar */}
        <div style={{width:210,background:C.deep,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",padding:"20px 10px",flexShrink:0,position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>
          <div style={{padding:"0 8px 20px",borderBottom:`1px solid ${C.border}`,marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,background:"linear-gradient(135deg,#3b82f6,#1d4ed8)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🏥</div>
              <div><div style={{color:C.text,fontWeight:800,fontSize:13,lineHeight:1.2}}>MediCore</div><div style={{color:C.dim,fontSize:10}}>v2.0 — Extended</div></div>
            </div>
          </div>
          {nav.map(n=>(
            <button key={n.key} onClick={()=>setPage(n.key)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"9px 10px",background:page===n.key?C.border+"88":"none",color:page===n.key?n.color:C.muted,border:"none",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:page===n.key?700:500,marginBottom:1,fontFamily:"'DM Sans',sans-serif",textAlign:"left",transition:"all 0.15s"}}>
              <Ic d={n.icon} s={16}/>{n.label}
            </button>
          ))}
          <div style={{marginTop:"auto",padding:"14px 8px 0",borderTop:`1px solid ${C.border}`}}>
            <div style={{color:C.dim,fontSize:10}}>Nairobi General Clinic</div>
            <div style={{color:"#1e3048",fontSize:10}}>MediCore © 2026</div>
          </div>
        </div>
        {/* Main */}
        <div style={{flex:1,padding:"26px 28px",overflowY:"auto"}}>
          {page==="dashboard"&&<Dashboard patients={patients} staff={staff} appointments={appointments} bills={bills} labs={labs} prescriptions={prescriptions} discharges={discharges}/>}
          {page==="patients"&&<Patients patients={patients} setPatients={setPatients}/>}
          {page==="staff"&&<Staff staff={staff} setStaff={setStaff}/>}
          {page==="appointments"&&<Appointments appointments={appointments} setAppointments={setAppointments} patients={patients} staff={staff}/>}
          {page==="billing"&&<Billing bills={bills} setBills={setBills} patients={patients}/>}
          {page==="labs"&&<LabResults labs={labs} setLabs={setLabs} patients={patients} staff={staff}/>}
          {page==="prescriptions"&&<Prescriptions prescriptions={prescriptions} setPrescriptions={setPrescriptions} patients={patients} staff={staff}/>}
          {page==="discharges"&&<Discharges discharges={discharges} setDischarges={setDischarges} patients={patients} staff={staff} labs={labs} prescriptions={prescriptions}/>}
        </div>
      </div>
    </>
  );
}
