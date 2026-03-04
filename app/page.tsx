import Image from 'next/image'

export default function Home() {
  return (
    <div>

      <div className="m-2 text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, error.
      </div>

      <img
        className="w-[23em] rounded-4xl m-2"
        src="https://hips.hearstapps.com/hmg-prod/images/ginger-maine-coon-kitten-running-on-lawn-in-royalty-free-image-1719608142.jpg" alt="cat" />

      <Image className="w-[23em] rounded-4xl m-2"
        src="https://hips.hearstapps.com/hmg-prod/images/ginger-maine-coon-kitten-running-on-lawn-in-royalty-free-image-1719608142.jpg" 
        loading="eager"
        width={300} 
        height={300}
        alt="cat"
      />
    </div>

  )
}