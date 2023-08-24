import Main from "@/components/Main"
import LeftSidebar from "../components/LeftSidebar"
import RightSidebar from "@/components/RightSidebar"
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Login from '@/app/login'

export const dynamic = 'force-dynamic'


// export default async function Page() {
//   const supabase = createServerComponentClient({ cookies })
//   const { data } = await supabase.from('todos').select()
//   return <pre>{JSON.stringify(data, null, 2)}</pre>
// }



const Home = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.auth.getUser()

  console.log(data)

  return (
    <div>
      {/* <Login/> */}
    <div>
      <div className='w-full h-full flex relative'>
        <LeftSidebar/>
        <Main/>
        <RightSidebar/>
      </div>
    </div>
    </div>
  )
}

export default Home