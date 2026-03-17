import TodoApp from "./TodoApp";

// ฟังก์ชันสำหรับดึงข้อมูล (Fetch) ทั้ง 2 ลิงก์ที่ครูให้มา
async function getData() {
  const [ipRes, postsRes] = await Promise.all([
    fetch("https://dummyjson.com/ip", { cache: "no-store" }),
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5"), // ลิงก์ที่ 2 ดึงมาแค่ 5 อัน
  ]);

  return {
    ipData: await ipRes.json(),
    posts: await postsRes.json(),
  };
}

export default async function HomeworkPage() {
  const { ipData, posts } = await getData();

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* หัวข้อ */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-800">Homework: 3 Feb 2026</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ซ้าย: งานข้อที่ 1 (Todo List CRUD) */}
          <div>
            <TodoApp />
          </div>

          {/* ขวา: งานข้อที่ 2 (ดึง API มาโชว์) */}
          <div className="space-y-6">
            
            {/* โชว์ IP */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-white">
              <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                🌐 IP Address
              </h2>
              <p className="text-gray-400 text-sm mb-4">https://dummyjson.com/ip</p>
              <div className="font-mono text-2xl text-green-400">
                {ipData.ip}
              </div>
            </div>

            {/* โชว์ Posts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h2 className="text-xl font-bold text-gray-800 mb-1">📄 Latest 5 Posts</h2>
               <p className="text-gray-500 text-sm mb-6">https://jsonplaceholder.typicode.com/posts</p>
               
               <div className="space-y-4">
                 {posts.map((post: any) => (
                   <div key={post.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                     <h3 className="font-bold text-gray-800 capitalize mb-1">
                       {post.id}. {post.title}
                     </h3>
                     <p className="text-sm text-gray-600 line-clamp-2">{post.body}</p>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}