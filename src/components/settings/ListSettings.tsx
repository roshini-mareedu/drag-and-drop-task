import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export default function ListSettings({ field, update } : any) {

  const props = field.properties;
  const items = props.items || [];

  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  return (
    <div className="bg-pink-50 rounded-lg p-4 space-y-3">

      <Label className="text-sm font-medium">List Items Data</Label>
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Enter Name"
          value={newName}
          onChange={(e)=>setNewName(e.target.value)}
        />
        <Input
          placeholder="Enter Val"
          value={newValue}
          onChange={(e)=>setNewValue(e.target.value)}
        />

        <button
          onClick={()=>{
            if(!newName.trim()) return;
            update("items", [...items, { name:newName, value:newValue }]);
            setNewName("");
            setNewValue("");
          }}
          className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded flex gap-1 items-center"
        >
          <Plus size={14}/> Add
        </button>
      </div>

      <div className="grid grid-cols-2 bg-blue-800 text-white font-medium px-3 py-1 rounded text-sm">
        <span>Name</span>
        <span>Value</span>
      </div>

      {items.map((item : any, index : any)=>(
        <div key={index} className="space-y-2">

          <div className="grid grid-cols-2 gap-2 items-center relative">

            <Input
              value={item.name}
              onChange={(e)=>{
                let n=[...items];
                n[index].name=e.target.value;
                update("items", n);
              }}
            />

            <Input
              value={item.value}
              onChange={(e)=>{
                let n=[...items];
                n[index].value=e.target.value;
                update("items", n);
              }}
            />

            <button
              onClick={()=>{
                update("items", items.filter((_ : any,i : any)=>i!==index));
              }}
              className="absolute right-[-14px] text-red-500"
            >
              <Trash2 size={14}/>
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}
