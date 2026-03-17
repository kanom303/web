import TodoApp from "./TodoApp";

async function getExternalData() {
  const [ipRes, postsRes] = await Promise.all([
    fetch("https://dummyjson.com/ip"),
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5"), // ดึง 5 อันตามภาพที่คุณส่งมา
  ]);

  return {
    ipData: await ipRes.json(),
    posts: await postsRes.json(),
  };
}

export default async function HW2Page() {
  const { ipData, posts } = await getExternalData();

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-black text-slate-800">Assignment HW2</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ฝั่งซ้าย: ระบบจัดการลูกค้า CRUD */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-500 pl-4">
              Customer Management
            </h2>
            <TodoApp />
          </section>

          {/* ฝั่งขวา: แสดงข้อมูลจาก API (IP & 5 Posts) */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-purple-500 pl-4">
              Server-Side Data Fetching
            </h2>

            {/* ส่วนแสดง IP */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Network IP</p>
              <h3 className="text-3xl font-mono font-bold text-blue-400">{ipData.ip}</h3>
            </div>

            {/* ส่วนแสดง 5 Posts ที่คุณส่งมา */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-500 uppercase">Latest Posts (5 Items)</p>
              {posts.map((post: any) => (
                <div key={post.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Post ID: {post.id}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors capitalize">{post.title}</h4>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{post.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}