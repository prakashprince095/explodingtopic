import { NextPage } from 'next'

interface Props { }

const Features: NextPage<Props> = ({ }) => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-[30px] font-medium'>Features Tailored for You</h1>
            <section className='flex flex-col'>
                <div className='flex gap-5 my-6 '>
                    <div className='h-[350px] w-[350px]'>askdj</div>
                    <div className='bg-[#76B6FF] rounded-xl h-[350px] w-[350px]'></div>
                    <div className='bg-[#E0E0E0] rounded-xl h-[350px] w-[350px]'></div>
                </div>
                <div className='border-[#313131] border-b-2'></div>
                <div className='flex gap-5 my-6 '>
                    <div className='h-[350px] w-[350px]'>askdj</div>
                    <div className='bg-[#E0E0E0] rounded-xl h-[350px] w-[350px]'></div>
                    <div className='bg-[#76B6FF] rounded-xl h-[350px] w-[350px]'></div>
                </div>
                <div className='border-[#313131] border-b-2'></div>
                <div className='flex gap-5 my-6  '>
                    <div className='h-[350px] w-[350px]'>askdj</div>
                    <div className='bg-[#3C79FF] rounded-xl h-[350px] w-[350px]'></div>
                    <div className='bg-[#E0E0E0] rounded-xl h-[350px] w-[350px]'></div>
                </div>
            </section>
        </div>
    )
}

export default Features