import {BiHomeCircle, BiUser} from 'react-icons/bi'
import {HiOutlineHashtag} from 'react-icons/hi'
import {BsBell, BsBookmark, BsTwitter, BsEnvelope, BsThreeDots} from 'react-icons/bs'
import Link from 'next/link'

const NAVIGATION_ITEMS = [
  {
    title:'Twitter',
    icon:BsTwitter
  },
  {
    title:'Home',
    icon: BiHomeCircle
  },
  {
    title:'Exploration',
    icon: HiOutlineHashtag
  },
  {
    title:'Notification',
    icon: BsBell
  },
  {
    title:'Messages',
    icon: BsEnvelope
  },
  {
    title:'Bookmarks',
    icon: BsBookmark
  },
  {
    title:'Profile',
    icon: BiUser
  }
]


const LeftSidebar = () => {
  return (
    <section className='sticky top-0 w-[25%] items-stretch flex flex-col h-screen'>
    <div className='flex flex-col items-stretch h-screen space-y-4 my-4'>
    {NAVIGATION_ITEMS.map((item)=>(
      <Link className='hover:bg-white/10 rounded-3xl text-2xl transition duration-200 flex items-center justify-start w-fit space-x-4 p-2' 
        href={`/${item.title.toLowerCase()}`} 
        key={item.title}>
        <div>
          <item.icon/>
        </div>
          {item.title !== 'Twitter' && <div>{item.title}</div>}
      </Link>
    ))}
    <button className='rounded-full m-4 bg-primary p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200'>
      Tweet
    </button>
    </div>
    <button className='rounded-full flex items-center space-x-2 bg-transparent p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200 w-full justify-between'>
      <div className='flex items-center space-x-2'>
      <div className='rounded-full bg-slate-400 w-10 h-10'></div>
        <div className='text-left text-sm'>
          <div className='font-semibold'>username</div>
          <div>@username</div>
        </div>
        <div>
          <BsThreeDots/>
        </div>
      </div>
    </button>
  </section>
  )
}

export default LeftSidebar