"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { Trash2, Plus, Edit3, User, Clock, RefreshCw, Play, Pause, CheckCircle } from "lucide-react";

interface Customer {
  id: number;
  customerName: string;
  task: string;
  time: number; // เวลาตั้งต้น (นาที)
  timeLeft: number; // เวลาที่เหลือ (วินาที)
  isDone: boolean;
  isRunning: boolean; // สถานะการนับเวลา
}

export default function TodoApp() {
  const presets = [
    { task: "Play pingpong", time: 30 },
    { task: "Swimming at pool", time: 60 },
    { task: "Write this easy homework", time: 130 },
  ];

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ id: 0, customerName: "", task: "", time: 0, isDone: false });
  const [isEditing, setIsEditing] = useState(false);

  // --- Logic นับถอยหลัง ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) => {
          if (c.isRunning && !c.isDone && c.timeLeft > 0) {
            const newTime = c.timeLeft - 1;
            // ถ้าเวลาหมด ให้ Auto Mask as Completed
            if (newTime <= 0) {
              return { ...c, timeLeft: 0, isRunning: false, isDone: true };
            }
            return { ...c, timeLeft: newTime };
          }
          return c;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (id: number) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, isRunning: !c.isRunning } : c
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  // -------------------------

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleTaskChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTask = e.target.value;
    const preset = presets.find((p) => p.task === selectedTask);
    setForm((prev) => ({
      ...prev,
      task: selectedTask,
      time: preset ? preset.time : prev.time,
    }));
  };

  const handleSubmit = () => {
    if (!form.customerName || !form.task) return alert("Please fill in Name and Task!");
    
    if (isEditing) {
      setCustomers(customers.map((c) => 
        c.id === form.id ? { ...form, timeLeft: form.time * 60, isRunning: false } : c
      ));
      setIsEditing(false);
    } else {
      setCustomers([...customers, { 
        ...form, 
        id: Date.now(), 
        timeLeft: form.time * 60, 
        isRunning: false 
      }]);
    }
    setForm({ id: 0, customerName: "", task: "", time: 0, isDone: false });
  };

  const startEdit = (customer: Customer) => {
    setForm(customer);
    setIsEditing(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-600 pl-4">Customer Management</h2>

      {/* Input Form */}
      <div className={`p-8 rounded-[2rem] shadow-xl border transition-all ${isEditing ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-100'}`}>
        <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
          {isEditing ? <RefreshCw className="animate-spin text-orange-500" /> : <Plus className="text-blue-500" />}
          {isEditing ? "Update Data" : "Add New Entry"}
        </h3>
        
        <div className="grid gap-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 ml-1">CUSTOMER NAME</label>
            <input className="w-full px-5 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400" name="customerName" value={form.customerName} onChange={handleChange} placeholder="Enter name..." />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 ml-1">SELECT TASK</label>
            <select name="task" value={form.task} onChange={handleTaskChange} className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-white">
              <option value="">-- Choose a task --</option>
              {presets.map((p, idx) => (
                <option key={idx} value={p.task}>{p.task}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 ml-1">TIME (MINUTES)</label>
            <div className="relative">
              <input className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50" type="number" name="time" value={form.time || ""} onChange={handleChange} />
              <Clock className="absolute right-4 top-3.5 text-slate-400" size={20} />
            </div>
          </div>

          <button onClick={handleSubmit} className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${isEditing ? 'bg-orange-500' : 'bg-blue-600'}`}>
            {isEditing ? "Update Record" : "Add Task to List"}
          </button>
        </div>
      </div>

      {/* List Display */}
      <div className="space-y-3">
        {customers.map((c) => (
          <div key={c.id} className={`flex items-center justify-between p-5 bg-white border rounded-3xl group shadow-sm transition-all ${c.isDone ? 'opacity-70 border-green-200 bg-green-50' : 'border-slate-100'}`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${c.isDone ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
                {c.isDone ? <CheckCircle size={20} /> : <User size={20} />}
              </div>
              <div>
                <h4 className={`font-bold ${c.isDone ? "line-through text-slate-400" : "text-slate-700"}`}>
                  {c.customerName} <span className="text-sm font-normal text-slate-400 ml-1">({c.task})</span>
                </h4>
                <div className="flex items-center gap-3 mt-1">
                   <p className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${c.isRunning ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                    {formatTime(c.timeLeft)}
                  </p>
                  {c.isDone && <span className="text-[10px] font-bold text-green-600 uppercase">Completed</span>}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {!c.isDone && (
                <button 
                  onClick={() => toggleTimer(c.id)}
                  className={`p-2 rounded-xl transition-colors ${c.isRunning ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}
                >
                  {c.isRunning ? <Pause size={18}/> : <Play size={18}/>}
                </button>
              )}
              <button onClick={() => startEdit(c)} className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-orange-500 hover:text-white transition-colors"><Edit3 size={18}/></button>
              <button onClick={() => setCustomers(customers.filter(item => item.id !== c.id))} className="p-2 bg-slate-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}