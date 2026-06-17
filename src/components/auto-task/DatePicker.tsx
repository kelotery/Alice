import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DatePickerProps { value: string; onChange: (date: string) => void; }
const WD = ["一","二","三","四","五","六","日"];

function daysInMonth(y: number, m: number) { return new Date(y, m+1, 0).getDate(); }
function firstDayOfMonth(y: number, m: number) { const d = new Date(y, m, 1).getDay(); return d===0?6:d-1; }

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [vy, setVY] = useState(()=>value?parseInt(value.split("-")[0]):new Date().getFullYear());
  const [vm, setVM] = useState(()=>value?parseInt(value.split("-")[1])-1:new Date().getMonth());
  const trig = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);

  useEffect(()=>{function h(e:MouseEvent){const t=e.target as Node;if(pop.current&&!pop.current.contains(t)&&trig.current&&!trig.current.contains(t))setOpen(false);}document.addEventListener("mousedown",h);return ()=>document.removeEventListener("mousedown",h);},[]);

  const disp = value||"请选择日期";
  const ph = !value;
  const sel = (d:number)=>{onChange(`${vy}-${String(vm+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`);setOpen(false);};
  const prev = ()=>{if(vm===0){setVY(vy-1);setVM(11);}else setVM(vm-1);};
  const next = ()=>{if(vm===11){setVY(vy+1);setVM(0);}else setVM(vm+1);};
  const td = daysInMonth(vy,vm); const sd = firstDayOfMonth(vy,vm);
  const cells:(number|null)[]=[]; for(let i=0;i<sd;i++)cells.push(null); for(let d=1;d<=td;d++)cells.push(d);

  const getPS = (): React.CSSProperties => {
    if (!open || !trig.current) return { display: "none" };
    const r = trig.current.getBoundingClientRect();
    const popH = 340; const top = r.top - popH - 6;
    return { position: "fixed", top: top > 0 ? top : r.bottom + 6, left: r.left, zIndex: 10000 };
  };

  return (<div className="date-picker">
    <button ref={trig} className={`at-field-btn${ph?" at-field-btn--placeholder":""}`} onClick={()=>setOpen(!open)}>{disp}</button>
    {open&&createPortal(<div ref={pop} className="date-picker__dropdown" style={getPS()}>
      <div className="date-picker__nav"><button onClick={prev}>&lt;</button><span className="date-picker__month-label">{vy}年{vm+1}月</span><button onClick={next}>&gt;</button></div>
      <div className="date-picker__weekdays">{WD.map(w=><span key={w} className="date-picker__wd">{w}</span>)}</div>
      <div className="date-picker__grid">{cells.map((day,i)=>(<div key={i} className={`date-picker__cell${day?"":" date-picker__cell--empty"}`} onClick={()=>day&&sel(day)}>{day?<span className={`date-picker__day${value.endsWith(`-${String(day).padStart(2,"0")}`)?" date-picker__day--selected":""}`}>{day}</span>:null}</div>))}</div>
    </div>,document.body)}
  </div>);
};

export default DatePicker;
