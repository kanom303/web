import Image from 'next/image'
import React from 'react';

export default function GaptrixLanding() {
  return (
    <div className="bg-[#FDFBF0] min-h-screen text-[#333] font-sans">

      <hr className="border-t border-[#ddd] my-1" />

      {/* --- Hero Section --- */}
      <section className="relative w-full min-h-[500px] rounded-b-[2rem] overflow-hidden bg-[#FDFBF0]">
        {/* ใช้ fill เพื่อให้รูปขยายเต็ม Container ที่เป็น relative */}
        <Image 
          src="https://images.squarespace-cdn.com/content/v1/59532d4ae3df28164a992472/1511677346888-EXO1I0MIIKQM57LW8GID/jaroslaw-ceborski-250955.jpg?format=2500w" 
          alt="Living Room" 
          fill
          priority // เพิ่ม priority สำหรับรูปแรกของหน้า (LCP) เพื่อให้โหลดเร็วขึ้น
          className="object-cover"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
          }}
        />
        
        <div className="relative z-10 p-8 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-[5%] w-full md:max-w-[600px] text-center md:text-left mt-10 md:mt-0">
          <h3 className="text-[#444] font-bold mb-2 drop-shadow-md">Lorem ipsum dolor</h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#444] mb-4 drop-shadow-lg">WE ARE THE BEST</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 drop-shadow">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere eum, totam voluptas quas, tenetur blanditiis.
          </p>
          <button className="bg-[#554D44] text-white px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all">
            Join us now
          </button>
        </div>
      </section>

      {/* --- Services Bar --- */}
      <section className="flex flex-col md:flex-row justify-around items-center py-4 bg-[#FDFBF0] font-bold text-[#555] uppercase gap-4 mt-2">
        <div className="py-2">SERVICE 1</div>
        <div className="py-2">SERVICE 2</div>
        <div className="hidden md:block py-2">SERVICE 3</div> 
      </section>

      <hr className="border-t border-[#ddd] my-2" />

      {/* --- Gallery Section --- */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 max-w-[1440px] w-[90%] mx-auto">
        
        <div className="relative w-full h-[250px] overflow-hidden rounded-2xl">
          <Image 
            src="https://img.freepik.com/premium-photo/mockup-living-room-interior-with-sofa-empty-cream-color-wall-background3d-rendering_41470-4435.jpg" 
            alt="Interior 1" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="relative w-full h-[250px] overflow-hidden rounded-2xl">
          <Image 
            src="https://www.hugsinsurance.com/storage/images/article/LxbLlZ6JMOlLnqGlCglyJXKNQ1iF51aR.jpeg" 
            alt="Interior 2" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="relative w-full h-[250px] overflow-hidden rounded-2xl">
          <Image 
            src="https://www.jorakay.co.th/imgadmins/blog/data/big/a4b18-.webp" 
            alt="Interior 3" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="relative w-full h-[250px] overflow-hidden rounded-2xl">
          <Image 
            src="https://vanguard.com.sg/wp-content/uploads/2024/01/flat-1024x683.jpg" 
            alt="Interior 4" 
            fill 
            className="object-cover"
          />
        </div>

      </section>

      {/* --- Footer --- */}
      <footer className="text-center py-10 px-5 bg-[#FDFBF0] border-t border-[#ddd] mt-10">
        <h3 className="text-2xl font-bold text-[#666] mb-2">Lorem ipsum dolor sit amet</h3>
        <p className="text-lg text-[#666] mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius officiis rerum.
        </p>
        <p className="font-bold text-[#666]">Copyright © All Right Reserved</p>
      </footer>

    </div>
  );
}