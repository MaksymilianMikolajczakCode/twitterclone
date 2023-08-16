'use client'

import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"

const Main = () => {
  return (
    <main className="flex h-full w-[50%] main-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
    <h1 className="text-xl font-bold my-4 p-6 backdrop-blur bg-black/10 sticky top-0">Home</h1>
    <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex py-4 items-stretch space-x-2 border-gray-600 relative">
      <div className="w-10 h-10 bg-slate-400 rounded-full"></div>
      <div className="flex flex-col w-full h-full">
        <input type="text"
          className="w-full h-full placeholder:text-2xl placeholder:text-gray-600 bg-transparent border-b-[0.5] border-gray-600 p-4 outline-none border-none"
          placeholder="What's happening?" 
        />
        <div className="w-full justify-between items-center flex">
          <div></div>
          <div className="w-full max-w-[100px]">
            <button className="rounded-full bg-primary py-2 px-4 text-lg text-center hover:bg-opacity-70 transition duration-200 font-bold">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
    {Array.from({length: 5}).map((_,i) => (
      <div key={i} className="border-b-[0.5px] border-gray-600 p-4 flex space-x-4">
        <div>
          <div className="w-10 h-10 bg-slate-200 rounded-full"/>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-1 w-full">
              <div className="font-bold">username</div>
            <div className="text-gray-500">@username</div>
            <div>
              <BsDot/>
            </div>
            <div className="text-gray-500">1 hour ago</div>
            </div>
            <div>
              <BsThreeDots/>
            </div>
            </div>
          <div className="text-base my-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iste, sint totam quidem excepturi iure rerum ad consequatur corrupti tenetur recusandae aliquam dicta dignissimos exercitationem perferendis quaerat velit veniam in.
          </div>
          <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2"></div>
          <div className="flex items-center justify-start space-x-20 mt-2  w-full">
            <div className="rounded-full hover:bg-black/10 cursor-pointer transition duration-200"><BsChat/></div>
            <div className="rounded-full hover:bg-black/10 cursor-pointer transition duration-200"><AiOutlineRetweet/></div>
            <div className="rounded-full hover:bg-black/10 cursor-pointer transition duration-200"><AiOutlineHeart/></div>
            <div className="rounded-full hover:bg-black/10 cursor-pointer transition duration-200"><IoStatsChart/></div>
            <div className="rounded-full hover:bg-black/10 cursor-pointer transition duration-200"><IoShareOutline/></div>
          </div>
        </div>
      </div>
    ))}
    </div>
  </main>
  )
}

export default Main