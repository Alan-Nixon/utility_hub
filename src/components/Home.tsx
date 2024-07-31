import { memo } from 'react'

function Home() {
    return (<>
        <img src="/bg.jpg" className="w-full h-[150px]" alt="" />
        <p className='text-xl'>Welcome to Utility Hub</p>
    </>)  
}
 
export default memo(Home)
