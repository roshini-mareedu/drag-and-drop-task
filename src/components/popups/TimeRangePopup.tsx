import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface TimeRangePopupProps {
  value: string;
  is24hr: boolean;
  onChange: (value: string) => void;
}

export default function TimeRangePopup({ value, is24hr, onChange }: TimeRangePopupProps) {

  const [open, setOpen] = useState(false);

  const [start, end] = value ? value.split("|") : ["12:00:00 AM", "11:59:59 PM"];

  const [selectedStart, setSelectedStart] = useState(start);
  const [selectedEnd, setSelectedEnd] = useState(end);

  const [mode, setMode] = useState<"start" | "end">("start");

  const HOURS = is24hr ? [...Array(24).keys()] : [...Array(12).keys()].map(v => (v+1)%13 || 1);
  const MINS  = [...Array(60).keys()];
  const SECS  = [...Array(60).keys()];
  const AMPM  = ["AM","PM"];

  const parse = (str:string)=>{
    if(!str) return {};
    const p = str.split(/[: ]/);
    return {
      h:p[0], m:p[1], s:p[2], ap:p[3]
    }
  }

  const current = mode==="start" ? parse(selectedStart) : parse(selectedEnd);

  const update = (k:string, v:string)=>{
    const c = {...current, [k]:v};

    let result =
      is24hr
        ? `${c.h}:${c.m}:${c.s}`
        : `${c.h}:${c.m}:${c.s} ${c.ap}`;

    if(mode==="start") setSelectedStart(result);
    else setSelectedEnd(result);
  }

  const apply = ()=>{
    onChange(`${selectedStart}|${selectedEnd}`);
    setOpen(false);
  }

  return(
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Clock className="w-4 h-4 mr-2"/>
          {value || "Select Time Range"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[520px] p-0">

        <div className="flex border-b">
          <button
            className={`flex-1 p-2 font-semibold ${mode==="start"?"bg-black text-white":""}`}
            onClick={()=>setMode("start")}
          >
            Start: {selectedStart}
          </button>

          <button
            className={`flex-1 p-2 font-semibold ${mode==="end"?"bg-black text-white":""}`}
            onClick={()=>setMode("end")}
          >
            End: {selectedEnd}
          </button>
        </div>

        <div className="flex h-56 divide-x">

          <div className="flex-1 overflow-auto">
            {HOURS.map(h=>(
              <div
                key={h}
                className={`px-4 py-2 cursor-pointer ${String(h).padStart(2,"0")==current.h?"bg-blue-200":""}`}
                onClick={()=>update("h",String(h).padStart(2,"0"))}
              >
                {String(h).padStart(2,"0")}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-auto">
            {MINS.map(m=>(
              <div
                key={m}
                className={`px-4 py-2 cursor-pointer ${String(m).padStart(2,"0")==current.m?"bg-blue-200":""}`}
                onClick={()=>update("m",String(m).padStart(2,"0"))}
              >
                {String(m).padStart(2,"0")}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-auto">
            {SECS.map(s=>(
              <div
                key={s}
                className={`px-4 py-2 cursor-pointer ${String(s).padStart(2,"0")==current.s?"bg-blue-200":""}`}
                onClick={()=>update("s",String(s).padStart(2,"0"))}
              >
                {String(s).padStart(2,"0")}
              </div>
            ))}
          </div>

          {!is24hr && (
            <div className="flex-1 overflow-auto">
              {AMPM.map(ap=>(
                <div
                  key={ap}
                  className={`px-4 py-2 cursor-pointer ${ap==current.ap?"bg-blue-200":""}`}
                  onClick={()=>update("ap",ap)}
                >
                  {ap}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-3 flex justify-between border-t">      
          <Button variant="ghost" onClick={()=>{ setSelectedStart(""); setSelectedEnd(""); }}>
            Clear
          </Button>
          <Button onClick={apply}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
