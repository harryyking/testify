import Link from "next/link"
import Image from "next/image"
import Profile from "@/public/profile.png"

const NavBar = () => {
  return (
    <nav className="navbar bg-base-100 mb-7 shadow-md rounded-md" >
  <div className="navbar-start">
    <Link href="/new">
    <button className='btn btn-primary'>Share </button>
    </Link>
    
  </div>
  <div className="navbar-center">
    <Link href="/" className="btn btn-ghost text-xl"> Testify <sup>🤩</sup> <sub>🥺</sub> </Link>
  </div>
  <div className="navbar-end">
    <Link href="https://t.me/har_ryyyy" className="cursor-pointer">
    <div className=" flex flex-row items-center gap-x-1">
      <Image src={Profile} alt="" width={50} height={50} />
      <h3 className="text-sm">By <br /> <span className=" text-primary underline underline-offset-1">harryking</span></h3>

    </div>
    </Link>
    
      
  </div>
</nav>
  )
}


export default NavBar