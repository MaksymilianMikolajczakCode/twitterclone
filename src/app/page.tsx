import Main from "@/components/Main"
import LeftSidebar from "../components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"


const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center text-white bg-black relative'>
      <div className='max-w-[70vw] w-full h-full flex relative'>
        <LeftSidebar/>
        <Main/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Home