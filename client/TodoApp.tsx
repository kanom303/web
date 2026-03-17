'use client'

import { ChangeEvent, FormEvent, useState } from "react"

export default function TodoApp() {

  // 1. เปลี่ยน State เริ่มต้นให้ตรงกับโจทย์
  const [form, setForm] = useState({
    task: "",
    time: 0,
    isDone: false
  })

  // 2. ข้อมูล JSON เริ่มต้นตามที่ครูให้มา
  const [todos, setTodos] = useState([
    { id: 1, task: "Play pingpong", time: 30, isDone: false },
    { id: 2, task: "Swiming at pool", time: 60, isDone: true },
    { id: 3, task: "Write this easy homework", time: 130, isDone: false },
  ])

  const [editId, setEditId] = useState(-1)

  // 3. ฟังก์ชัน Save (ดัดแปลงจาก saveUser ของคุณ)
  const saveTodo = (e: FormEvent) => {
    e.preventDefault()

    if (editId === -1) {
      setTodos([...todos, {
        id: (todos.length === 0) ? 1 : todos[todos.length - 1].id + 1,
        task: form.task,
        time: Number(form.time), // แปลงเป็นตัวเลข
        isDone: form.isDone
      }])
    } else {
      const id = todos[editId].id
      const tmpForm = { id, task: form.task, time: Number(form.time), isDone: form.isDone }
      const tmpTodos = todos.map((item, index) => (index === editId) ? tmpForm : item)
      setTodos([...tmpTodos])
      setEditId(-1)
    }
    // เซฟเสร็จแล้วล้างฟอร์ม
    setForm({ task: "", time: 0, isDone: false })
  }

  // 4. ฟังก์ชัน Delete (เหมือนเดิมเป๊ะ)
  const deleteTodo = (id: number) => {
    const tmpTodos = todos.filter((item) => (item.id !== id))
    setTodos([...tmpTodos])
  }

  // 5. ฟังก์ชัน Edit
  const editTodo = (index: number) => {
    setForm({
      task: todos[index].task,
      time: todos[index].time,
      isDone: todos[index].isDone
    })
    setEditId(index)
  }

  // 6. handleChange (ปรับตาม Hint ของครู)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  // 7. ฟังก์ชันเสริมสำหรับติ๊ก Checkbox ตรงๆ จากในลิสต์
  const toggleDone = (index: number) => {
    const tmpTodos = [...todos]
    tmpTodos[index].isDone = !tmpTodos[index].isDone
    setTodos(tmpTodos)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Todo List (CRUD)</h2>

      {/* ฟอร์มกรอกข้อมูล */}
      <form className="bg-gray-50 border border-gray-200 p-6 rounded-xl mb-8">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Task Name</label>
          <input
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text" name="task" placeholder="What needs to be done?" value={form.task}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600 mb-1">Time (minutes)</label>
          <input
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number" name="time" placeholder="0" value={form.time || ""}
            onChange={handleChange}
          />
        </div>

        {/* HTML Checkbox ลอกโค้ดจาก Hint ครูมาเป๊ะๆ */}
        <label className="flex items-center gap-2 text-sm text-gray-700 mt-4 mb-4 cursor-pointer">
          <input
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-400 w-5 h-5 cursor-pointer"
            type="checkbox" name="isDone"
            checked={form.isDone}
            onChange={handleChange} 
          />
          Mark as Completed (isDone)
        </label>

        <button
          onClick={saveTodo}
          type="submit"
          className={`w-full p-3 rounded-lg font-bold text-white transition-colors ${editId === -1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-orange-500 hover:bg-orange-600'}`}
        >
          {(editId === -1) ? "Add Task" : "Update Task"}
        </button>
      </form>

      {/* กล่องแสดงข้อมูลแบบสวยงาม */}
      <div className="flex flex-col gap-3">
        {todos.map((item, index) => (
          <div
            className={`border p-4 rounded-xl flex justify-between items-center transition-all ${item.isDone ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:shadow-md'}`}
            key={index}
          >
            <div className="flex items-center gap-4">
              <input 
                type="checkbox" 
                checked={item.isDone} 
                onChange={() => toggleDone(index)}
                className="w-5 h-5 accent-green-600 cursor-pointer"
              />
              <div>
                <div className={`font-bold text-lg ${item.isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {item.task}
                </div>
                <div className="text-sm text-gray-500 font-mono">
                  Time: {item.time} mins
                </div>
              </div>
            </div>

            {/* ปุ่มแก้ไขและลบ */}
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors font-medium"
                onClick={() => editTodo(index)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors font-medium"
                onClick={() => deleteTodo(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}