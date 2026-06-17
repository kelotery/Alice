import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TimePickerProps { value: string; onChange: (time: string) => void; }
const H = Array.from({length:24},(_,i)=>i);
const M = Array.from({length:60},(_,i)=>i);

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [h, setH] = useState(()=>value?parseInt(value.split(":")[0]):9);
  const [m, setM] = useState(()=>value?parseInt(value.split(":")[1]):0);
  const trig = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);

  useEffect(()=>{function handle(e:MouseEvent){const t=e.target as Node;if(pop.current&&!pop.current.contains(t)&&trig.current&&!trig.current.contains(t))setOpen(false);}document.addEventListener("mousedown",handle);return ()=>document.removeEventListener("mousedown",handle);},[]);

  const sel = (hh:number,mm:number)=>{setH(hh);setM(mm);onChange(`${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}`);setOpen(false);};
  const disp = value||"请选择时间";
  const ph = !value;

  const getPS = (): React.CSSProperties => {
    if (!open || !trig.current) return { display: "none" };
    const r = trig.current.getBoundingClientRect();
    const popH = 280; const top = r.top - popH - 6;
    return { position: "fixed", top: top > 0 ? top : r.bottom + 6, left: r.left, zIndex: 10000 };
  };

  return (<div className="time-picker">
    <button ref={trig} className={`at-field-btn${ph?" at-field-btn--placeholder":""}`} onClick={()=>setOpen(!open)}>{disp}</button>
    {open&&createPortal(<div ref={pop} className="time-picker__dropdown" style={getPS()}>
      <div className="time-picker__labels"><span>时</span><span>分</span></div>
      <div className="time-picker__cols">
        <div className="time-picker__col">{H.map((hh)=>(<div key={hh} className={`time-picker__item${hh===h?" time-picker__item--selected":""}`} onClick={()=>sel(hh,m)}>{String(hh).padStart(2,"0")}</div>))}</div>
        <div className="time-picker__col">{M.map((mm)=>(<div key={mm} className={`time-picker__item${mm===m?" time-picker__item--selected":""}`} onClick={()=>sel(h,mm)}>{String(mm).padStart(2,"0")}</div>))}</div>
      </div>
    </div>,document.body)}
  </div>);
};

export default TimePicker;
